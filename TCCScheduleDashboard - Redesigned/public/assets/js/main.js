// assets/js/main.js
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // 页面加载状态，用于渐显
    document.body.classList.add("tcc-loaded");

    // 移动端导航开关
    var navToggle = document.querySelector(".tcc-nav-toggle");
    var navLinks = document.querySelector(".tcc-nav-links");
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () {
        navToggle.classList.toggle("tcc-open");
        navLinks.classList.toggle("tcc-nav-open");
      });
    }

    // 高亮当前导航
    var current = window.location.pathname.split("/").pop();
    if (!current || current === "") current = "index.html";

    document.querySelectorAll(".tcc-nav-links a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;
      var file = href.split("/").pop();
      if (!file || file === "") file = "index.html";
      if (file === current) {
        a.classList.add("is-active");
      }
    });

    // reveal on scroll
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      document.querySelectorAll(".reveal-on-scroll").forEach(function (el) {
        observer.observe(el);
      });
    } else {
      document
        .querySelectorAll(".reveal-on-scroll")
        .forEach(function (el) {
          el.classList.add("is-visible");
        });
    }

    // 按钮平滑滚动到锚点
    document
      .querySelectorAll("[data-scroll-target]")
      .forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          var targetId = btn.getAttribute("data-scroll-target");
          if (!targetId) return;
          var target = document.getElementById(targetId);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
  });
})();
