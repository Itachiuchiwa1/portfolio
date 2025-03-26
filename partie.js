// ==================== ANIMATIONS GLOBALES ====================

// Navbar qui change de couleur au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#222';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '1rem 8%';
    } else {
        navbar.style.backgroundColor = '#111';
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '1.5rem 8%';
    }
});

// Animation d'apparition des sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animation spécifique pour les barres de compétences
            if (entry.target.classList.contains('competences')) {
                animateSkillBars();
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// ==================== ANIMATIONS SPECIFIQUES ====================

// Hero Section - Animation texte
const heroText = document.querySelector('.hero .content h1');
if (heroText) {
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(20px)';
    heroText.style.transition = 'all 0.8s ease 0.2s';
    
    setTimeout(() => {
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
    }, 300);
}

// Photo de profil - Effet de zoom
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.addEventListener('mouseenter', () => {
        profileImage.querySelector('img').style.transform = 'scale(1.1)';
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileImage.querySelector('img').style.transform = 'scale(1)';
    });
}

// Projets - Effet hover amélioré
const projects = document.querySelectorAll('.rectangle');
projects.forEach((project, index) => {
    project.style.transition = 'all 0.4s ease';
    project.style.transform = `translateY(${20 - index * 5}px)`;
    project.style.opacity = '0';
    
    setTimeout(() => {
        project.style.transform = 'translateY(0)';
        project.style.opacity = '1';
    }, 300 + index * 100);

    project.addEventListener('mouseenter', () => {
        project.style.transform = 'translateY(-10px) scale(1.02)';
        project.style.boxShadow = '0 15px 30px rgba(0, 212, 190, 0.2)';
    });
    
    project.addEventListener('mouseleave', () => {
        project.style.transform = 'translateY(0) scale(1)';
        project.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
});

// Barres de compétences - Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 1s ease ' + (index * 0.2) + 's';
        }, 100);
    });
}

// Formulaire - Animation des inputs
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = '#00d4be';
        input.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
        input.style.borderColor = '#00e6e6';
        input.style.transform = 'scale(1)';
    });
});

// ==================== FONCTIONNALITES ====================

// Navigation fluide
document.querySelectorAll('nav a').forEach(anchor => {
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
        }
    });
});

// Téléchargement CV
document.querySelector('.about .btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    // Simulation de téléchargement
    const link = document.createElement('a');
    link.href = '#'; // Remplacez par le vrai lien vers votre CV
    link.download = 'CV_Abdoul_Latif.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Validation formulaire
document.querySelector('form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const inputs = this.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '#00e6e6';
        }
    });
    
    if (isValid) {
        // Animation de succès
        const button = this.querySelector('button');
        button.textContent = '✓ Envoyé !';
        button.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            button.textContent = 'Envoyer';
            button.style.backgroundColor = '#00e6e6';
            this.reset();
        }, 2000);
    }
});

// ==================== EFFETS VISUELS ====================

// Chargement progressif des images
document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.8s ease';
    
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    }
});

// Compteur de visites
if (localStorage.getItem('visits')) {
    let visits = parseInt(localStorage.getItem('visits')) + 1;
    localStorage.setItem('visits', visits);
} else {
    localStorage.setItem('visits', 1);
}
// Compteur de visites
if (localStorage.getItem('visits')) {
    let visits = parseInt(localStorage.getItem('visits')) + 1;
    localStorage.setItem('visits', visits);
    document.querySelector('.visit-counter span').textContent = visits;
} else {
    localStorage.setItem('visits', 1);
    document.querySelector('.visit-counter span').textContent = 1;
}

// Ajoutez ce CSS dans partie.css :
// .visit-counter {
//     position: absolute;
//     left: 20px;
//     font-size: 0.9rem;
// }
// .visit-counter span {
//     color: #00d4be;
//     font-weight: bold;
// }