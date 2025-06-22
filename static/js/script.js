// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initThemeToggle()
  initSmoothScrolling()
  initNavbarScroll()
  initContactForm()
  initAnimations()
  initTypingEffect()
})

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  const themeIcon = document.getElementById("theme-icon")
  const html = document.documentElement

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem("theme") || "dark"
  html.setAttribute("data-bs-theme", currentTheme)
  updateThemeIcon(currentTheme)

  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-bs-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    html.setAttribute("data-bs-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)

    // Add transition effect
    document.body.style.transition = "background-color 0.3s ease, color 0.3s ease"
    setTimeout(() => {
      document.body.style.transition = ""
    }, 300)
  })

  function updateThemeIcon(theme) {
    themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
  }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled")
    } else {
      navbar.classList.remove("navbar-scrolled")
    }
  })
}

// Contact Form Enhancement
function initContactForm() {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      // Add loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...'
      submitBtn.disabled = true

      // Form validation
      const name = this.querySelector("#name").value.trim()
      const email = this.querySelector("#email").value.trim()
      const message = this.querySelector("#message").value.trim()

      if (!name || !email || !message) {
        e.preventDefault()
        showAlert("Please fill in all fields.", "danger")
        resetSubmitButton()
        return
      }

      if (!isValidEmail(email)) {
        e.preventDefault()
        showAlert("Please enter a valid email address.", "danger")
        resetSubmitButton()
        return
      }

      function resetSubmitButton() {
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }

      // If form is valid, it will submit normally
      // The loading state will be cleared by page reload/redirect
    })
  }
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Show alert messages
function showAlert(message, type) {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  const container = document.querySelector(".container")
  container.insertBefore(alertDiv, container.firstChild)

  // Auto dismiss after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove()
    }
  }, 5000)
}

// Intersection Observer for Animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements that should animate on scroll
  const animateElements = document.querySelectorAll(".card, .skill-category, .stat-item")
  animateElements.forEach((el) => {
    observer.observe(el)
  })
}

// Typing Effect for Hero Section
function initTypingEffect() {
  const typingElement = document.querySelector(".typing-effect")

  if (typingElement) {
    const texts = ["Software Engineer", "AI/ML Enthusiast", "Full-Stack Developer", "Problem Solver"]

    let textIndex = 0
    let charIndex = 0
    let isDeleting = false

    function typeText() {
      const currentText = texts[textIndex]

      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1)
        charIndex--
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1)
        charIndex++
      }

      let typeSpeed = isDeleting ? 50 : 100

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000 // Pause at end
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
        typeSpeed = 500 // Pause before next text
      }

      setTimeout(typeText, typeSpeed)
    }

    typeText()
  }
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add scroll-to-top functionality
function initScrollToTop() {
  const scrollBtn = document.createElement("button")
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollBtn.className = "btn btn-primary position-fixed"
  scrollBtn.style.cssText = `
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
    `

  document.body.appendChild(scrollBtn)

  window.addEventListener(
    "scroll",
    debounce(() => {
      if (window.scrollY > 300) {
        scrollBtn.style.display = "block"
      } else {
        scrollBtn.style.display = "none"
      }
    }, 100),
  )

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Initialize scroll to top
initScrollToTop()

// Add loading states for external links
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="http"]')) {
    const link = e.target
    const originalText = link.innerHTML

    link.innerHTML = '<i class="fas fa-external-link-alt me-2"></i>Opening...'

    setTimeout(() => {
      link.innerHTML = originalText
    }, 1000)
  }
})

// Performance optimization
if ("IntersectionObserver" in window) {
  // Lazy load images
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Add CSS for navbar scroll effect
const style = document.createElement("style")
style.textContent = `
    .navbar-scrolled {
        background-color: rgba(33, 37, 41, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .lazy {
        filter: blur(5px);
        transition: filter 0.3s;
    }
`
document.head.appendChild(style)
