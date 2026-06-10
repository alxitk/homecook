(function () {

  // ---- menu ----
  const root = document.getElementById("menuRoot");
  const nav  = document.getElementById("menuNav");
  if (root && nav && typeof MENU !== "undefined") {
    MENU.forEach(function (group) {
      const chip = document.createElement("a");
      chip.href = "#" + group.id;
      chip.className = "menu-chip";
      chip.textContent = group.title;
      nav.appendChild(chip);

      const section = document.createElement("div");
      section.className = "menu-group";
      section.id = group.id;

      const h = document.createElement("h3");
      h.className = "menu-group-title";
      h.textContent = group.title;
      section.appendChild(h);

      const grid = document.createElement("div");
      grid.className = "menu-grid";

      group.items.forEach(function (item, i) {
        const card = document.createElement("article");
        card.className = "menu-card reveal-card";
        // cascade delay
        card.style.transitionDelay = Math.min(i * 60, 400) + "ms";
        card.innerHTML =
          '<div class="menu-card-img"><img src="' + item.img + '" alt="' + item.name + '" loading="lazy"></div>' +
          '<div class="menu-card-body">' +
            '<h4 class="menu-card-name">' + item.name + '</h4>' +
            '<span class="menu-card-price">' + item.price + ' грн/кг</span>' +
          '</div>';
        grid.appendChild(card);
      });

      section.appendChild(grid);
      root.appendChild(section);
    });
  }

  // ---- reviews ----
  const rRoot = document.getElementById("reviewsRoot");
  if (rRoot && typeof REVIEWS !== "undefined") {
    REVIEWS.forEach(function (r) {
      const card = document.createElement("div");
      card.className = "review-card";
      if (r.img) {
        card.innerHTML = '<img src="' + r.img + '" alt="Відгук клієнта" loading="lazy">';
      } else {
        card.innerHTML =
          '<p class="review-text">' + r.text + '</p>' +
          (r.name ? '<p class="review-name">— ' + r.name + '</p>' : '');
      }
      rRoot.appendChild(card);
    });
  }

  // ---- gallery ----
  const gRoot = document.getElementById("galleryRoot");
  if (gRoot && typeof GALLERY !== "undefined") {
    GALLERY.forEach(function (g) {
      const cell = document.createElement(g.link ? "a" : "div");
      cell.className = "gallery-item";
      if (g.link) { cell.href = g.link; cell.target = "_blank"; cell.rel = "noopener"; }
      cell.innerHTML = '<img src="' + g.img + '" alt="Фото страви" loading="lazy">';
      gRoot.appendChild(cell);
    });
  }

  // ---- reveal elements ----
  const revealEls = document.querySelectorAll(".reveal, .reveal-card");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---- year in footer ----
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

})();