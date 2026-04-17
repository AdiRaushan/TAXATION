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

// DIRECT MAIL REDIRECTION
function handleHireSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const service = formData.get("service");

  const emailTo = "lalmakan2a@gmail.com";
  const subject = `Callback Request: ${service} for ${name}`;
  const body = `Hello MY TAXATION,\n\nYou have a new callback request:\n\nName: ${name}\nPhone: ${phone}\nService Requested: ${service}\n\nPlease contact the customer directly at the number provided above.`;

  // Opens user's mail client with prefilled info
  window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Show success message in UI
  const form = document.getElementById("hire-form");
  const success = document.getElementById("hire-success");
  if (form && success) {
    form.classList.add("hidden");
    success.classList.remove("hidden");
    setTimeout(() => {
      closeHireModal();
    }, 4000);
  }

  e.target.reset();
}

// CONTACT PAGE FORM SUBMISSION
function handleContactSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const service = formData.get("service");
  const message = formData.get("message");

  const emailTo = "lalmakan2a@gmail.com";
  const subject = `New Inquiry: ${service} from ${name}`;
  const body = `Hello MY TAXATION team,\n\nYou have a new inquiry from your contact page:\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}\n\nPlease respond to this inquiry as soon as possible.`;

  window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  alert(
    "Thank you! Your email client will now open with your message details. Please press 'Send' in your email app.",
  );
}
