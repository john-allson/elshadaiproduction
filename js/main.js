document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize Particles.js if element exists
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffd700' // Gold color to match theme
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffd700',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            hero.style.transform = `translate(-${x * 30}px, -${y * 30}px)`;
        });
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    let isScrolling = false;
    
    // Add animation class to nav links
    navLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('animate-fade-in-up');
    });

    // Touch start event to detect actual touch on the toggle button
    if (navToggle) {
        navToggle.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            this.classList.add('touched');
        }, { passive: true });

        // Click/touch handler for the menu toggle
        const handleMenuToggle = function(e) {
            // Only toggle if it's a direct click/touch on the toggle
            if (e.type === 'click' || this.classList.contains('touched')) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
                this.classList.remove('touched');
            }
        };

        navToggle.addEventListener('click', handleMenuToggle);
        navToggle.addEventListener('touchend', handleMenuToggle);
    }

    // Close mobile menu when clicking on a nav link or outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && !e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });

    // Close menu when scrolling on mobile
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 992) { // Only for mobile/tablet view
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
            
            // Clear any existing timer
            clearTimeout(scrollTimer);
            
            // Prevent menu from reopening immediately after scroll
            isScrolling = true;
            scrollTimer = setTimeout(function() {
                isScrolling = false;
            }, 100);
        }
    }, { passive: true });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    const scrollThreshold = 5; // Minimum number of pixels to scroll before showing/hiding header
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containClass = (className) => header.classList.contains(className);

    window.addEventListener('scroll', () => {
        const currentScroll = scrollPosition();
        
        // At the top of the page
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            header.classList.remove('scroll-down');
            header.classList.remove('scrolled');
            lastScroll = currentScroll;
            return;
        }
        
        // Scrolling down
        if (currentScroll > lastScroll + scrollThreshold && !containClass('scroll-down')) {
            // Hide header
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } 
        // Scrolling up
        else if (currentScroll < lastScroll - scrollThreshold && containClass('scroll-down')) {
            // Show header
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        // Add/remove scrolled class for header background
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Smooth scrolling for anchor links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                this.appendChild(ripple);
                
                // Position the ripple
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size/2}px`;
                ripple.style.top = `${e.clientY - rect.top - size/2}px`;
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Smooth scroll to target
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            }
        });
    });

    // Back to top button with animation
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button on scroll
        const toggleBackToTop = () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        };
        
        window.addEventListener('scroll', toggleBackToTop);
        
        // Smooth scroll to top with animation
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add click animation
            backToTopBtn.classList.add('clicked');
            setTimeout(() => {
                backToTopBtn.classList.remove('clicked');
            }, 300);
            
            // Scroll to top with easing function
            const startPosition = window.pageYOffset;
            const targetPosition = 0;
            const distance = targetPosition - startPosition;
            const duration = 1000; // 1 second
            let start = null;
            
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                
                // Easing function (easeInOutCubic)
                const easeInOutCubic = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
                const scrollY = startPosition + distance * easeInOutCubic(percentage);
                
                window.scrollTo(0, scrollY);
                
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            
            window.requestAnimationFrame(step);
        });
    }

    // Add animation to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run once on page load and then on scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Initialize Swiper for testimonials
    if (typeof Swiper !== 'undefined') {
        const testimonialSwiper = new Swiper('.testimonial-slider', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            grabCursor: true,
            spaceBetween: 30,
        });
    }

    // Form submission handling with animation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            const formData = new FormData(this);
            
            // Add loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Simulate API call (replace with actual fetch/axios call)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success animation
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.classList.add('success');
                
                // Add confetti effect
                createConfetti();
                
                // Reset form
                this.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                }, 3000);
                
            } catch (error) {
                // Show error state
                submitBtn.innerHTML = '<i class="fas fa-times"></i> Error!';
                submitBtn.classList.add('error');
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('error');
                }, 3000);
                
                console.error('Form submission error:', error);
            }
        });
        
        // Add input focus effects
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Add focus/blur effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on page load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }
    
    // Create confetti effect
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.classList.add('confetti-container');
        document.body.appendChild(confettiContainer);
        
        const colors = ['#ffd700', '#ff9e7d', '#ff6b6b', '#4ecdc4', '#45b7d1'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 2;
            const animationDelay = Math.random() * 2;
            const rotation = Math.random() * 360;
            
            // Apply styles
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}%`;
            confetti.style.animationDuration = `${animationDuration}s`;
            confetti.style.animationDelay = `${animationDelay}s`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            // Random shape (square or circle)
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, (animationDuration + animationDelay) * 1000);
        }
        
        // Remove container after all confetti is gone
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }

    // Lazy loading for images with fade-in effect
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        // Create a new image to preload
                        const tempImg = new Image();
                        tempImg.src = src;
                        
                        // When image is loaded, apply it with fade-in effect
                        tempImg.onload = () => {
                            img.src = src;
                            img.style.opacity = '0';
                            img.style.transition = 'opacity 0.6s ease-in-out';
                            
                            // Trigger reflow to ensure the transition works
                            void img.offsetWidth;
                            
                            // Fade in the image
                            img.style.opacity = '1';
                            
                            // Remove data-src to avoid reloading
                            img.removeAttribute('data-src');
                            
                            // Stop observing this image
                            observer.unobserve(img);
                            
                            // Add loaded class for any additional styling
                            img.classList.add('loaded');
                        };
                        
                        // Handle image loading errors
                        tempImg.onerror = () => {
                            console.error('Failed to load image:', src);
                            img.classList.add('error');
                            observer.unobserve(img);
                        };
                    }
                }
            });
        }, {
            rootMargin: '200px 0px', // Start loading images 200px before they come into view
            threshold: 0.01
        });
        
        io.observe(target);
    };
    
    // Initialize lazy loading for all images with data-src
    lazyImages.forEach(lazyLoad);
    
    // Handle dynamically added images (e.g., from AJAX)
    const lazyImageObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                const newImages = [];
                mutation.addedNodes.forEach(node => {
                    if (node.nodeName === 'IMG' && node.hasAttribute('data-src')) {
                        newImages.push(node);
                    }
                    if (node.querySelectorAll) {
                        const childImages = node.querySelectorAll('img[data-src]');
                        childImages.forEach(img => newImages.push(img));
                    }
                });
                
                newImages.forEach(img => {
                    if (!img.hasAttribute('data-lazy-loaded')) {
                        img.setAttribute('data-lazy-loaded', 'true');
                        lazyLoad(img);
                    }
                });
            }
        });
    });
    
    // Start observing the document with the configured parameters
    lazyImageObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add click animation
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
                
                // Smooth scroll to target
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current section in navigation
    const highlightNavigation = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Run once on page load

    // Video background play/pause on hover (if using video background)
    const videoBg = document.getElementById('heroVideo');
    if (videoBg) {
        // Mute the video for autoplay to work on most browsers
        videoBg.muted = true;
        
        // Try to play the video
        const playPromise = videoBg.play();
        
        // Handle autoplay restrictions
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay was prevented, show a play button
                const playButton = document.createElement('button');
                playButton.className = 'video-play-button';
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                
                playButton.addEventListener('click', () => {
                    videoBg.play();
                    playButton.style.display = 'none';
                });
                
                videoBg.parentNode.appendChild(playButton);
                
                // Show play button when video is paused
                videoBg.addEventListener('pause', () => {
                    playButton.style.display = 'flex';
                });
                
                // Hide play button when video is playing
                videoBg.addEventListener('play', () => {
                    playButton.style.display = 'none';
                });
            });
        }
        
        // For mobile devices, play video on first interaction
        const playVideoOnInteraction = () => {
            if (videoBg.paused) {
                videoBg.play();
            }
            document.body.removeEventListener('click', playVideoOnInteraction);
            document.body.removeEventListener('touchstart', playVideoOnInteraction);
        };
        
        document.body.addEventListener('click', playVideoOnInteraction, { once: true });
        document.body.addEventListener('touchstart', playVideoOnInteraction, { once: true, passive: true });
        
        // Pause video when tab is not visible to save resources
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                videoBg.pause();
            } else if (!videoBg.paused) {
                videoBg.play().catch(() => {});
            }
        });
    }

    // Make navigation links smooth
    const makeNavLinksSmooth = () => {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = document.querySelector(link.getAttribute('href'));
                
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    };
    
    const spyScrolling = () => {
        const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const sectionOffset = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionOffset && scrollPosition < sectionOffset + sectionHeight) {
                document.querySelector(`.nav-link[href*=${sectionId}]`).classList.add('active');
            } else {
                const navLink = document.querySelector(`.nav-link[href*=${sectionId}]`);
                if (navLink) navLink.classList.remove('active');
            }
        });
    };
    
    makeNavLinksSmooth();
    window.addEventListener('scroll', spyScrolling);
    
    // Initialize on page load
    spyScrolling();
    
    // Preloader with progress animation
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        const progressBar = preloader.querySelector('.progress-bar');
        let progress = 0;
        const duration = 3000; // 3 seconds
        const interval = 30; // Update every 30ms
        const increment = (interval / duration) * 100;
        
        const updateProgress = () => {
            progress += increment;
            
            if (progress <= 100) {
                if (progressBar) {
                    progressBar.style.width = `${Math.min(progress, 100)}%`;
                }
                
                // Simulate loading different resources
                if (progress < 30) {
                    // Loading initial resources
                    preloader.querySelector('.loading-text').textContent = 'Loading resources...';
                } else if (progress < 70) {
                    // Loading content
                    preloader.querySelector('.loading-text').textContent = 'Almost there...';
                } else {
                    // Finalizing
                    preloader.querySelector('.loading-text').textContent = 'Ready to explore!';
                }
                
                setTimeout(updateProgress, interval);
            } else {
                // Animation complete
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                // Remove preloader from DOM after animation
                setTimeout(() => {
                    preloader.remove();
                    
                    // Trigger any animations that should happen after page load
                    document.body.classList.add('page-loaded');
                    
                    // Play any animations that were waiting for page load
                    const waitingAnimations = document.querySelectorAll('[data-wait-for-load]');
                    waitingAnimations.forEach(el => {
                        el.style.animationPlayState = 'running';
                    });
                }, 500);
            }
        };
        
        // Start the progress animation
        setTimeout(updateProgress, 500);
        
        // Force complete after 5 seconds max
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                setTimeout(() => {
                    if (preloader.parentNode) {
                        preloader.remove();
                        document.body.classList.add('page-loaded');
                    }
                }, 500);
            }
        }, 5000);
    }
});
