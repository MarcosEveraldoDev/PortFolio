// Inicializar EmailJS com seu User ID
(function() {
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS não está carregado. Verifique se o script do EmailJS foi incluído no HTML.');
        return;
    }
        emailjs.init("g2sj5A0TRSRAVUp11"); // Substitua por seu User ID do EmailJS
})();

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

// Form Submission with EmailJS
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obter valores dos campos
       const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validar se todos os campos estão preenchidos
        if (!name || !email || !subject || !message) {
            alert('Por favor, preencha todos os campos antes de enviar.');
            return;
        }

        // Enviar e-mail usando EmailJS
        emailjs.send('service_gzv5iw5', 'template_bi1i758', {
            subject: subject,
            from_name: name,
            message: message,
            from_email: email,
            to_email: 'marcosdev5411@gmail.com'
        })
        .then(() => {
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
            contactForm.reset();
        })
        .catch((error) => {
            console.error('Erro ao enviar o e-mail:', error);
            alert('Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.');
        });
    });
}

// Typing Effect
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
        setTimeout(type, 100); // Velocidade digitando
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50); // Velocidade apagando
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            textIndex = (textIndex + 1) % texts.length;
        }
        setTimeout(type, 1000); // Pausa entre troca de textos
    }
}

document.addEventListener('DOMContentLoaded', type);