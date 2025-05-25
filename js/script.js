// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
});

// Atualiza o menu ao redimensionar a tela
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex'; // Mostra o menu normalmente no desktop
        navLinks.style.flexDirection = 'row'; // Volta ao layout horizontal
    } else if (navLinks.style.display === 'flex' && window.innerWidth <= 768) {
        navLinks.style.display = 'none'; // Oculta o menu no mobile se estiver aberto
    }
});

// Garante que o menu comece no estado correto ao carregar
window.addEventListener('load', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
    } else {
        navLinks.style.display = 'none';
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animate Skill Bars on Scroll
const skillBars = document.querySelectorAll('.skill-progress');
        
function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Intersection Observer for Skill Bars
const skillsSection = document.querySelector('#skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (skillsSection) {
    observer.observe(skillsSection);
}

// Form Submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        contactForm.reset();
    });
}

const element = document.getElementById('typing-text');

const texts = [
    'Programador Full-Stack',
    'Desenvolvedor .NET',
    'SQL Server',
    'JavaScript | TypeScript',
    'React | Next.js',
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    const displayedText = currentText.substring(0, charIndex);
    element.textContent = displayedText;

    if (!isDeleting && charIndex < currentText.length) {
        charIndex++;
        setTimeout(type, 100); // velocidade digitando
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50); // velocidade apagando
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            textIndex = (textIndex + 1) % texts.length;
        }
        setTimeout(type, 1000); // pausa entre troca de textos
    }
}

document.addEventListener('DOMContentLoaded', type);