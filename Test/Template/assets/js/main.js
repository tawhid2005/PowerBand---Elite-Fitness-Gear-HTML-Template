(() => {
  const menuToggle = document.querySelector('[data-toggle="navbar-sticky"]');
  const menu = document.getElementById('navbar-sticky');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      const isHidden = menu.classList.toggle('hidden');
      menuToggle.setAttribute('aria-expanded', String(!isHidden));
    });

    menu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          menu.classList.add('hidden');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const animatedItems = document.querySelectorAll('.fade-in-up');
  if (animatedItems.length) {
    const reveal = (entry) => {
      entry.target.classList.add('is-visible');
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(entry);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      animatedItems.forEach((item) => observer.observe(item));
    } else {
      animatedItems.forEach((item) => item.classList.add('is-visible'));
    }
  }

  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterInput = document.getElementById('newsletter-email');
  const newsletterMessage = document.getElementById('newsletter-message');

  if (newsletterForm && newsletterInput && newsletterMessage) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = newsletterInput.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      newsletterMessage.classList.remove('is-error', 'is-success');

      if (!value) {
        newsletterMessage.textContent = 'Please enter your email address.';
        newsletterMessage.classList.add('is-error');
        newsletterInput.focus();
        return;
      }

      if (!isValid) {
        newsletterMessage.textContent = 'Please enter a valid email address.';
        newsletterMessage.classList.add('is-error');
        newsletterInput.focus();
        return;
      }

      newsletterMessage.textContent = 'Thanks for joining. Check your inbox for updates.';
      newsletterMessage.classList.add('is-success');
      newsletterForm.reset();
    });
  }
})();
