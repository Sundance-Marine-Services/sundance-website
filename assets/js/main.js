(function () {
  "use strict";

  // ---- Footer year ----
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function openNav() {
    if (!nav) return;
    nav.classList.add("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  // Close the mobile panel automatically once the layout switches
  // to the desktop nav, so it never gets stuck open.
  var desktopQuery = window.matchMedia("(min-width: 1150px)");
  function handleBreakpointChange() {
    if (desktopQuery.matches) closeNav();
  }
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", handleBreakpointChange);
  } else if (desktopQuery.addListener) {
    // Safari < 14 fallback
    desktopQuery.addListener(handleBreakpointChange);
  }

  // ---- Dropdown items: inject a caret toggle button for mobile,
  // so tapping the caret expands the submenu while tapping the
  // label text still navigates straight to the hub page. On the
  // desktop breakpoint this button is hidden by CSS and hover/
  // focus-within takes over instead. ----
  var dropdownParents = document.querySelectorAll(".has-drop");
  dropdownParents.forEach(function (li) {
    var link = li.querySelector(":scope > .nav-link");
    if (!link) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "drop-toggle";
    btn.setAttribute("aria-label", "Show " + link.textContent.replace("▾", "").trim() + " menu");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML =
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var isOpen = li.classList.contains("open");

      // Close any sibling dropdowns first (accordion behaviour)
      dropdownParents.forEach(function (other) {
        if (other !== li) {
          other.classList.remove("open");
          var otherBtn = other.querySelector(".drop-toggle");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      li.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });

    li.insertBefore(btn, li.querySelector(".dropdown"));
  });

  // Close the mobile nav after a real navigation link (not a
  // caret toggle) is tapped inside it.
  if (nav) {
    nav.addEventListener("click", function (e) {
      var target = e.target.closest("a");
      if (target) closeNav();
    });
  }

  // ---- Image graceful fallback ----
  // If a photo fails to load, keep the frame (aspect-ratio +
  // mist background from CSS) instead of showing a broken-image
  // glyph, and hide the empty alt text.
  document.querySelectorAll(".content-photo").forEach(function (img) {
    img.addEventListener("error", function () {
      img.classList.add("img-error");
    });
  });
})();
