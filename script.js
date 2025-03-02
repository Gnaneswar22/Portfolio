// Initialize domains with developer section as default
const domains = [
    {
        role: "Creative Designer",
        description: "I'm creative designer based in Andhra Pradesh, and I'm very passionate and dedicated to my work."
    },
    {
        role: "Web Developer",
        description: "Specialized in full-stack development with 1 year of experience building scalable web applications."
    },
    {
        role: "UI/UX Designer",
        description: "Creating user-centered designs with a focus on exceptional user experience and interface design."
    }
];

// Set initial domain to Web Developer (index 1)
let currentDomain = 1;

// Get all domain-specific elements
const heroLayouts = document.querySelectorAll('.hero-layout');
const designContents = document.querySelectorAll('.design-content');
const projectContents = document.querySelectorAll('.project-content');
const domainIcons = {
    designer: document.getElementById('designerIcons'),
    developer: document.getElementById('developerIcons'),
    uiux: document.getElementById('uiuxIcons')
};

// Main function to update all sections
function updateAllSections() {
    // Hide all current sections
    heroLayouts.forEach(layout => layout.classList.remove('active'));
    designContents.forEach(content => content.classList.remove('active'));
    projectContents.forEach(content => content.classList.remove('active'));

    // Hide all icons
    Object.values(domainIcons).forEach(iconSet => {
        if (iconSet) {
            iconSet.style.opacity = '0';
            iconSet.style.visibility = 'hidden';
            iconSet.classList.remove('active');
        }
    });

    // Show new sections after a short delay for smooth transition
    setTimeout(() => {
        // Show new hero layout
        heroLayouts[currentDomain].classList.add('active');

        // Show new design content
        designContents[currentDomain].classList.add('active');

        // Show new project content
        projectContents[currentDomain].classList.add('active');

        // Show new domain icons
        const domainTypes = ['designer', 'developer', 'uiux'];
        const currentIcons = domainIcons[domainTypes[currentDomain]];
        if (currentIcons) {
            currentIcons.classList.add('active');
            currentIcons.style.opacity = '1';
            currentIcons.style.visibility = 'visible';
        }

        // Update role and description
        updateRoleAndDescription();
    }, 300);
}

// Function to update role and description text
function updateRoleAndDescription() {
    const roleElement = document.querySelector('.role');
    const descriptionElement = document.querySelector('.hero-description');
    
    if (roleElement && descriptionElement) {
        roleElement.textContent = domains[currentDomain].role;
        descriptionElement.textContent = domains[currentDomain].description;
    }
}

// Function to update design content section
function updateDesignContent(domain) {
    const designContents = document.querySelectorAll('.design-content');
    designContents.forEach(content => content.classList.remove('active'));

    const currentContent = document.querySelector(`.${domain}-content`);
    if (currentContent) {
        currentContent.classList.add('active');
    }

    const designSection = document.querySelector('.can-design-section');
    designSection.classList.remove('bg-designer', 'bg-developer', 'bg-uiux');
    designSection.classList.add(`bg-${domain}`);
}

// Function to update projects section
function updateProjects(domain) {
    const projectContents = document.querySelectorAll('.project-content');
    projectContents.forEach(content => content.classList.remove('active'));

    const currentProjects = document.querySelector(`.${domain}-projects`);
    if (currentProjects) {
        currentProjects.classList.add('active');
    }
}

// Domain switch button handler
const domainSwitchButton = document.getElementById('domainSwitch');
if (domainSwitchButton) {
    domainSwitchButton.addEventListener('click', () => {
        currentDomain = (currentDomain + 1) % domains.length;
        const domainTypes = ['designer', 'developer', 'uiux'];
        updateAllSections();
        updateDesignContent(domainTypes[currentDomain]);
        updateProjects(domainTypes[currentDomain]);
    });
}

// Project filtering
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const buttons = button.parentElement.querySelectorAll('.filter-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.textContent.toLowerCase();
        // Add your filtering logic here for projects
    });
});

// Auto rotation every 60 seconds
setInterval(() => {
    currentDomain = (currentDomain + 1) % domains.length;
    const domainTypes = ['designer', 'developer', 'uiux'];
    updateAllSections();
    updateDesignContent(domainTypes[currentDomain]);
    updateProjects(domainTypes[currentDomain]);
}, 60000);

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Ensure developer section (index 1) is active on initial load
    currentDomain = 1;
    const domainTypes = ['designer', 'developer', 'uiux'];
    updateAllSections();
    updateDesignContent(domainTypes[currentDomain]);
    updateProjects(domainTypes[currentDomain]);
});


// Performance-optimized animation controller
class AnimationController {
    constructor() {
        this.currentDomain = 1;
        this.isAnimating = false;
        this.animationDuration = 800; // Reduced from 1200ms to 800ms
        this.init();
    }

    injectStyles() {
        const styles = `
            .hero-layout {
                opacity: 0;
                visibility: hidden;
                position: absolute;
                width: 100%;
                transform: translateX(50px); // Reduced distance
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                will-change: transform, opacity;
            }

            .hero-layout.active {
                opacity: 1;
                visibility: visible;
                position: relative;
                transform: translateX(0);
            }

            /* Optimize performance with GPU acceleration */
            .hero-content,
            .profile-section,
            .software-icon {
                transform: translateZ(0);
                backface-visibility: hidden;
                perspective: 1000px;
            }

            .hero-content {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .profile-section {
                opacity: 0;
                transform: scale(0.98);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            /* Reduce transition delays */
            .hero-layout.active .icon-1 { transition-delay: 0.2s; }
            .hero-layout.active .icon-2 { transition-delay: 0.3s; }
            .hero-layout.active .icon-3 { transition-delay: 0.4s; }
            .hero-layout.active .icon-4 { transition-delay: 0.5s; }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    async handleDomainSwitch() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const heroLayouts = document.querySelectorAll('.hero-layout');
        const currentLayout = heroLayouts[this.currentDomain];
        
        // Optimize transition
        requestAnimationFrame(() => {
            currentLayout.style.opacity = '0';
            currentLayout.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                this.currentDomain = (this.currentDomain + 1) % heroLayouts.length;
                const nextLayout = heroLayouts[this.currentDomain];
                
                // Reset and show next layout
                currentLayout.classList.remove('active');
                nextLayout.classList.add('active');
                
                this.updateContent();
                
                setTimeout(() => {
                    this.isAnimating = false;
                }, 600);
            }, 400);
        });
    }

    // Add image preloading
    preloadImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }
}

// Initialize with image preloading
document.addEventListener('DOMContentLoaded', () => {
    const animator = new AnimationController();
    animator.preloadImages();
});




document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    // Toggle menu function
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    // Close menu function
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Hamburger click event
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling
            toggleMenu();
        });

        // Close menu when clicking links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event from bubbling
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
    }
});


// script.js - Optimized and Modular
// Use Modern JavaScript Features
const initApp = async () => {
    try {
        // Dynamic Imports
        const { default: module } = await import('./module.js');
        
        // Efficient DOM Operations
        const container = document.querySelector('.container');
        const fragment = document.createDocumentFragment();
        
        // Batch DOM Updates
        requestAnimationFrame(() => {
            // DOM operations here
            container.appendChild(fragment);
        });
        
        // Use Intersection Observer for Lazy Loading
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        // Efficient Event Handling with Debounce
        const debounce = (fn, delay) => {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => fn(...args), delay);
            };
        };
        
        // Event Delegation
        document.addEventListener('click', (e) => {
            if (e.target.matches('.button')) {
                handleClick(e);
            }
        });
        
    } catch (error) {
        console.error('Error initializing app:', error);
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

        // JavaScript for the interactive project tabs and filters
        document.addEventListener('DOMContentLoaded', function() {
            // Tab functionality
            const tabBtns = document.querySelectorAll('.tab-btn');
            const projectContents = document.querySelectorAll('.project-content');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all tabs
                    tabBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    btn.classList.add('active');
                    
                    // Hide all content
                    projectContents.forEach(content => {
                        content.classList.remove('active');
                    });
                    
                    // Show corresponding content
                    const target = btn.getAttribute('data-target');
                    document.querySelector(`.${target}`).classList.add('active');
                });
            });
            
            // Filter functionality for each project category
            const projectSections = document.querySelectorAll('.project-content');
            
            projectSections.forEach(section => {
                const filterBtns = section.querySelectorAll('.filter-btn');
                const projectItems = section.querySelectorAll('.project-item');
                
                filterBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        // Remove active class from all filter buttons in this section
                        filterBtns.forEach(b => b.classList.remove('active'));
                        
                        // Add active class to clicked button
                        btn.classList.add('active');
                        
                        const filter = btn.getAttribute('data-filter');
                        
                        // Show/hide projects based on filter
                        projectItems.forEach(item => {
                            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                                item.style.display = 'block';
                            } else {
                                item.style.display = 'none';
                            }
                        });
                    });
                });
            });
        });
