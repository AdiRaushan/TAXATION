// Initialize Lucide Icons
lucide.createIcons();

// Navbar Effects
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });
}

// FAQ Accordion logic
const faqButtons = document.querySelectorAll('.faq-btn');
faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('.faq-icon');

        // Close all other open FAQs
        faqButtons.forEach(otherBtn => {
            if (otherBtn !== button) {
                const otherAnswer = otherBtn.nextElementSibling;
                const otherIcon = otherBtn.querySelector('.faq-icon');
                if (otherAnswer) otherAnswer.classList.remove('open');
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            }
        });

        // Toggle current FAQ
        if (answer) {
            if (answer.classList.contains('open')) {
                answer.classList.remove('open');
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                answer.classList.add('open');
                if (icon) icon.style.transform = 'rotate(45deg)';
            }
        }
    });
});
