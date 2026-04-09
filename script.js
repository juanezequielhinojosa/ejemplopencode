document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    const contactForm = document.getElementById('contactForm');
    const tabs = document.querySelectorAll('.tab');
    const menuCards = document.querySelectorAll('.menu-card');
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-icon">✓</div>
                <h3>¡Reserva enviada!</h3>
                <p>Te contactaremos pronto para confirmar tu reserva.</p>
                <button class="modal-close">Cerrar</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('show'), 10);
        
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        contactForm.reset();
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.tab;
            
            menuCards.forEach(card => {
                if (card.dataset.category === category) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease-out forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.menu-card');
            const name = card.querySelector('h3').textContent;
            
            this.innerHTML = '✓';
            this.style.background = '#22c55e';
            
            setTimeout(() => {
                this.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>`;
                this.style.background = '';
            }, 1500);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    if (cursor && cursorDot) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            dotX += (mouseX - dotX) * 0.3;
            dotY += (mouseY - dotY) * 0.3;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.menu-card, .feature-item, .info-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});
