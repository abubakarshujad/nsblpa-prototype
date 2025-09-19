 document.addEventListener("DOMContentLoaded", function () {
      const menuBtn = document.getElementById("menuBtn");
      const navLinks = document.getElementById("navLinks");
      const menuClose = document.getElementById("menuClose");
      const menuOverlay = document.getElementById("menuOverlay");

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

      // Mobile menu functionality
      if (menuBtn && navLinks) {
        // Toggle menu when menu button is clicked
        menuBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleMenu();
        });

        // Close menu when close button is clicked
        if (menuClose) {
          menuClose.addEventListener("click", () => {
            closeMenu();
          });
        }

        // Close menu when clicking on overlay
        if (menuOverlay) {
          menuOverlay.addEventListener("click", () => {
            closeMenu();
          });
        }

        // Handle window resize
        window.addEventListener("resize", () => {
          if (window.innerWidth >= 900) {
            closeMenu();
          }
        });

        // Close menu when clicking outside (for touch devices)
        document.addEventListener("touchstart", (e) => {
          if (window.innerWidth < 900 &&
            navLinks.classList.contains("active") &&
            !navLinks.contains(e.target) &&
            !menuBtn.contains(e.target)) {
            closeMenu();
          }
        });

        // Close menu when clicking outside (for mouse)
        document.addEventListener("click", (e) => {
          if (window.innerWidth < 900 &&
            navLinks.classList.contains("active") &&
            !navLinks.contains(e.target) &&
            !menuBtn.contains(e.target)) {
            closeMenu();
          }
        });

        // Function to toggle menu
        function toggleMenu() {
          navLinks.classList.toggle("active");
          menuOverlay.classList.toggle("active");

          const isExpanded = navLinks.classList.contains("active");
          menuBtn.setAttribute("aria-expanded", isExpanded);

          const icon = menuBtn.querySelector("i");
          if (isExpanded) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
            document.body.style.overflow = "hidden";
          } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
            document.body.style.overflow = "";
          }
        }

        // Function to close menu
        function closeMenu() {
          navLinks.classList.remove("active");
          menuOverlay.classList.remove("active");
          menuBtn.setAttribute("aria-expanded", "false");
          const icon = menuBtn.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
          document.body.style.overflow = "";
        }
      }
    });