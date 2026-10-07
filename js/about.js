// About page specific animations and interactions

// Enhanced scroll animations for about page
document.addEventListener('DOMContentLoaded', () => {
    initializeAboutAnimations();
    initializeTeamAnimations();
    initializeChartAnimations();
    initializeValueAnimations();
});

function initializeAboutAnimations() {
    // Story section animations
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate story stats
                if (entry.target.classList.contains('story-stats')) {
                    animateStoryStats();
                }
            }
        });
    }, { threshold: 0.2 });

    // Observe story elements
    const storyElements = document.querySelectorAll('.story-text, .story-visual, .story-stats');
    storyElements.forEach(el => storyObserver.observe(el));

    // Mission & Vision cards animation
    const mvObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.3 });

    const mvCards = document.querySelectorAll('.mv-card');
    mvCards.forEach(card => mvObserver.observe(card));
}

function initializeTeamAnimations() {
    // Team cards stagger animation
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        teamObserver.observe(card);
    });

    // Team card hover effects
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeChartAnimations() {
    // Growth chart animation
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.chart-bar');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        const height = bar.style.height;
                        bar.style.setProperty('--target-height', height);
                        bar.style.animation = 'growUp 1s ease forwards';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });

    const growthChart = document.querySelector('.growth-chart');
    if (growthChart) {
        chartObserver.observe(growthChart);
    }
}

function initializeValueAnimations() {
    // Values cards animation
    const valuesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });

    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => valuesObserver.observe(card));

    // Value card hover effects
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(180deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

function animateStoryStats() {
    const stats = document.querySelectorAll('.story-stats .stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Parallax effect for about page
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.background .ball');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Enhanced team interactions
function initializeTeamInteractions() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        // Add click interaction for mobile
        card.addEventListener('click', () => {
            const overlay = card.querySelector('.team-overlay');
            if (overlay) {
                overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
            }
        });

        // Add ripple effect
        card.addEventListener('mouseenter', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(150, 106, 173, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .team-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Dynamic content loading for team section
function loadTeamData() {
    const teamData = [
        {
            name: "Alex Developer",
            role: "Lead Developer",
            bio: "Full-stack expert with 8+ years of experience in financial technology and user experience design.",
            image: "https://via.placeholder.com/150x150/966AAD/FFFFFF?text=AD",
            social: {
                linkedin: "#",
                twitter: "#",
                github: "#"
            }
        },
        {
            name: "Sarah Johnson",
            role: "UX Designer",
            bio: "Creative designer focused on creating intuitive and beautiful user experiences that make finance enjoyable.",
            image: "https://via.placeholder.com/150x150/c79acd/FFFFFF?text=SJ",
            social: {
                linkedin: "#",
                twitter: "#",
                github: "#"
            }
        },
        {
            name: "Mike Rodriguez",
            role: "Data Scientist",
            bio: "Machine learning expert specializing in predictive analytics and intelligent financial insights.",
            image: "https://via.placeholder.com/150x150/52446D/FFFFFF?text=MR",
            social: {
                linkedin: "#",
                twitter: "#",
                github: "#"
            }
        },
        {
            name: "Lisa Martinez",
            role: "Product Manager",
            bio: "Strategic leader with expertise in product development and customer-centric innovation in fintech.",
            image: "https://via.placeholder.com/150x150/966AAD/FFFFFF?text=LM",
            social: {
                linkedin: "#",
                twitter: "#",
                github: "#"
            }
        }
    ];

    // This function can be used to dynamically update team data
    window.updateTeamData = (newData) => {
        const teamGrid = document.querySelector('.team-grid');
        if (teamGrid && newData) {
            // Implementation for dynamic team updates
            console.log('Team data updated:', newData);
        }
    };
}

// Initialize team data
initializeTeamInteractions();
loadTeamData();

// Performance optimization: Throttled scroll handler
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const throttledScrollHandler = throttle(() => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.background .ball');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Error handling and graceful degradation
window.addEventListener('error', (e) => {
    console.warn('Animation error:', e.message);
    // Fallback to static display
    document.body.classList.add('no-animations');
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Ensure focus is visible on animated elements
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add accessibility CSS
const accessibilityStyle = document.createElement('style');
accessibilityStyle.textContent = `
    .keyboard-navigation .team-card:focus,
    .keyboard-navigation .value-card:focus,
    .keyboard-navigation .mv-card:focus {
        outline: 2px solid #966AAD;
        outline-offset: 2px;
    }
    
    .no-animations * {
        animation: none !important;
        transition: none !important;
    }
`;
document.head.appendChild(accessibilityStyle);

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAboutAnimations,
        initializeTeamAnimations,
        animateCounter,
        throttle
    };
}