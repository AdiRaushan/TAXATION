// Initialize Lucide Icons
lucide.createIcons();

// Navbar Scroll Effect
const navbar = document.getElementById("navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("nav-scrolled");
    } else {
      navbar.classList.remove("nav-scrolled");
    }
  });
}

// Mobile Menu Toggle logic
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
  }
}

// Ensure mobile menu button works if it has an onclick or id
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", toggleMobileMenu);
}

// FAQ Accordion logic
const faqButtons = document.querySelectorAll(".faq-btn");
faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const icon = button.querySelector(".faq-icon");

    // Close all other open FAQs
    faqButtons.forEach((otherBtn) => {
      if (otherBtn !== button) {
        const otherAnswer = otherBtn.nextElementSibling;
        const otherIcon = otherBtn.querySelector(".faq-icon");
        if (otherAnswer) otherAnswer.classList.remove("open");
        if (otherIcon) {
          otherIcon.style.transform = "rotate(0deg)";
        }
      }
    });

    // Toggle current FAQ
    if (answer) {
      if (answer.classList.contains("open")) {
        answer.classList.remove("open");
        if (icon) icon.style.transform = "rotate(0deg)";
      } else {
        answer.classList.add("open");
        if (icon) icon.style.transform = "rotate(45deg)";
      }
    }
  });
});

// Modal Control for "Hire an Expert"
function openHireModal() {
  const overlay = document.getElementById("hire-modal-overlay");
  if (overlay) {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeHireModal() {
  const overlay = document.getElementById("hire-modal-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
    // Reset form success state after generic delay
    setTimeout(() => {
      const form = document.getElementById("hire-form");
      const success = document.getElementById("hire-success");
      if (form) form.classList.remove("hidden");
      if (success) success.classList.add("hidden");
    }, 500);
  }
}

// DIRECT BACKGROUND EMAIL SUBMISSION
async function handleHireSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const originalBtnText = btn?.innerText;

  // Show loading state
  if (btn) {
    btn.disabled = true;
    btn.innerText = "Sending...";
  }

  const formData = new FormData(form);
  
  // Add Web3Forms fields
  formData.append("access_key", "46702f43-4e67-470e-91ba-29572e711aa5");
  formData.append("subject", `Callback Request: ${formData.get('service')} from ${formData.get('name')}`);
  formData.append("from_name", "MY TAXATION (Callback Modal)");
  formData.append("replyto", "mytaxationonlychoice@gmail.com");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      // Show success message in UI
      const formElement = document.getElementById("hire-form");
      const success = document.getElementById("hire-success");
      if (formElement && success) {
        formElement.classList.add("hidden");
        success.classList.remove("hidden");
        setTimeout(() => {
          closeHireModal();
        }, 5000);
      }
      form.reset();
    } else {
      console.error("Submission error:", result);
      alert("Submission failed: " + (result.message || "Unknown error") + ". Please try WhatsApp.");
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Network error. Please try WhatsApp for immediate support.");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerText = originalBtnText;
    }
  }
}

// CONTACT PAGE FORM SUBMISSION
async function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const originalBtnText = btn?.innerText;

  if (btn) {
    btn.disabled = true;
    btn.innerText = "Sending...";
  }

  const formData = new FormData(form);
  
  formData.append("access_key", "46702f43-4e67-470e-91ba-29572e711aa5");
  formData.append("subject", `New Inquiry from ${formData.get('name')}`);
  formData.append("from_name", "MY TAXATION (Contact Page)");
  formData.append("replyto", "mytaxationonlychoice@gmail.com");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      alert("Thank you! Your message has been sent successfully. We will get back to you soon.");
      form.reset();
    } else {
      console.error("Submission error:", result);
      alert("Something went wrong: " + (result.message || "Unknown error") + ". Please try again.");
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Submission failed. Please check your internet connection.");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerText = originalBtnText;
    }
  }
}
