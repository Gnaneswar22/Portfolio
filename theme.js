document.addEventListener('DOMContentLoaded', function() {
    class ThemeManager {
        static init() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            ThemeManager.applyTheme(savedTheme);
        }

        static applyTheme(theme) {
            // Remove existing theme classes
            document.body.classList.remove('light-mode', 'dark-mode');
            // Add new theme class
            document.body.classList.add(`${theme}-mode`);
            // Save to localStorage
            localStorage.setItem('theme', theme);
            // Update UI elements
            ThemeManager.updateUI(theme);
        }

        static updateUI(theme) {
            // Update hamburger color
            const hamburger = document.querySelector('.hamburger');
            if (hamburger) {
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.backgroundColor = theme === 'light' ? '#333333' : '#ffffff';
                });
            }
        
            // Update nav links color only
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.querySelectorAll('a').forEach(link => {
                    link.style.color = theme === 'light' ? '#333333' : '#ffffff';
                });
            }
        
            // Update footer
            const footer = document.querySelector('.modern-footer');
            const footerBottom = document.querySelector('.footer-bottom');
            const socialCards = document.querySelectorAll('.social-card');
            const copyright = document.querySelector('.copyright');
            const footerLinks = document.querySelectorAll('.footer-privacy a');
        
            // Update footer background
            if (footer) {
                footer.style.background = theme === 'light' ? 
                    'linear-gradient(135deg, #f8f9fa, #e9ecef)' :
                    'linear-gradient(135deg, #1a1c2c, #131525)';
            }
        
            // Update footer bottom
            if (footerBottom) {
                footerBottom.style.backgroundColor = theme === 'light' ? 
                    'rgba(51, 51, 51, 0.9)' : 'rgba(0, 0, 0, 0.3)';
            }
        
            // Update copyright text
            if (copyright) {
                copyright.style.color = theme === 'light' ? 
                    'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.9)';
            }
        
            // Update footer links
            if (footerLinks) {
                footerLinks.forEach(link => {
                    link.style.color = theme === 'light' ? 
                        'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.7)';
                });
            }
        
            // Update social cards
            socialCards.forEach(card => {
                if (theme === 'light') {
                    if (card.classList.contains('linkedin')) {
                        card.style.background = 'linear-gradient(135deg, #0077B5, #00a0dc)';
                    } else if (card.classList.contains('email')) {
                        card.style.background = 'linear-gradient(135deg, #ff6b6b, #ff4757)';
                    } else if (card.classList.contains('github')) {
                        card.style.background = 'linear-gradient(135deg, #6c5ce7, #a55eea)';
                    } else if (card.classList.contains('instagram')) {
                        card.style.background = 'linear-gradient(45deg, #fd79a8, #e84393)';
                    }
                } else {
                    if (card.classList.contains('linkedin')) {
                        card.style.background = 'linear-gradient(135deg, #0077B5, #00669c)';
                    } else if (card.classList.contains('email')) {
                        card.style.background = 'linear-gradient(135deg, #ff4d4d, #ff6b6b)';
                    } else if (card.classList.contains('github')) {
                        card.style.background = 'linear-gradient(135deg, #333, #24292e)';
                    } else if (card.classList.contains('instagram')) {
                        card.style.background = 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)';
                    }
                }
            });
        
            // Update theme toggle icon
            const modeToggle = document.querySelector('.mode-toggle');
            const icon = modeToggle?.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
        
    }

    // Initialize theme
    ThemeManager.init();

    // Theme toggle click handler
    const modeToggle = document.querySelector('.mode-toggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            ThemeManager.applyTheme(newTheme);
        });

        // Add touch event for mobile
        modeToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            ThemeManager.applyTheme(newTheme);
        });
    }

    // Mobile menu handler
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            this.classList.toggle('active');
            navLinks.classList.toggle('show');
            
            if (isMenuOpen) {
                navLinks.style.display = 'flex';
                setTimeout(() => {
                    navLinks.style.transform = 'translateX(0)';
                    navLinks.style.opacity = '1';
                }, 10);
            } else {
                navLinks.style.transform = 'translateX(-100%)';
                navLinks.style.opacity = '0';
                setTimeout(() => {
                    navLinks.style.display = 'none';
                }, 300);
            }
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navLinks) {
                navLinks.style.display = 'flex';
                navLinks.style.transform = 'translateX(0)';
                navLinks.style.opacity = '1';
            }
        } else if (!isMenuOpen && navLinks) {
            navLinks.style.display = 'none';
            navLinks.style.transform = 'translateX(-100%)';
            navLinks.style.opacity = '0';
        }
    });

    // Handle theme changes from other tabs
    window.addEventListener('storage', (e) => {
        if (e.key === 'theme') {
            const newTheme = e.newValue || 'dark';
            ThemeManager.applyTheme(newTheme);
        }
    });
});
