document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const menuClose = document.getElementById("menuClose");
    const menuOverlay = document.getElementById("menuOverlay");

    function toggleMenu() {
      const isExpanded = navLinks.classList.toggle("active");
      menuOverlay.classList.toggle("active", isExpanded);
      menuBtn.setAttribute("aria-expanded", isExpanded);
      document.body.classList.toggle("menu-open", isExpanded);

      const icon = menuBtn.querySelector("i");
      icon.classList.toggle("fa-bars", !isExpanded);
      icon.classList.toggle("fa-times", isExpanded);
    }

    function closeMenu() {
      navLinks.classList.remove("active");
      menuOverlay.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");

      const icon = menuBtn.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-times");
    }

    if (menuBtn && navLinks) {
      menuBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleMenu(); });
      if (menuClose) menuClose.addEventListener("click", closeMenu);
      if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);

      window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) closeMenu();
      });
    }

      // Function to handle smooth scrolling
      function handleSmoothScroll(e) {
        // Check if the link is an internal section link
        const href = this.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // Close mobile menu if open
            if (window.innerWidth < 900 && navLinks.classList.contains("active")) {
              closeMenu();
            }
            
            // Smooth scroll to the target element
            const headerHeight = document.querySelector("header").offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });
          }
        }
      }

      // Add smooth scroll to all navigation links
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", handleSmoothScroll);
      });
  });