document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. ENHMΕΡΩΣΗ ΕΤΟΥΣ ΣΤΟ FOOTER
       ========================================== */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ==========================================
       2. HAMBURGER MENU & NAVIGATION
       ========================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navLinks) {
        // Toggle Μενού
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Κλείσιμο όταν ο χρήστης πατάει σε σύνδεσμο
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Κλείσιμο όταν ο χρήστης κάνεις κλικ εκτός μενού
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    /* ==========================================
       3. SMOOTH SCROLLING (Για Anchors)
       ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#' || targetId === '#hero') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else if (targetId.startsWith('#')) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    // Scroll target με συνυπολογισμό του Navbar height
                    const navHeight = document.querySelector('nav')?.offsetHeight || 70;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ==========================================
       4. LIGHTBOX WITH PREV / NEXT & TOUCH SWIPE
       ========================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;

    // Ενημέρωση εικόνας στο Lightbox
    const updateLightboxImage = (index) => {
        if (!lightboxImg || galleryImages.length === 0) return;

        if (index < 0) {
            currentIndex = galleryImages.length - 1; // Κυκλική πλοήγηση προς τα πίσω
        } else if (index >= galleryImages.length) {
            currentIndex = 0; // Κυκλική πλοήγηση προς τα εμπρός
        } else {
            currentIndex = index;
        }

        lightboxImg.style.opacity = '0.3';
        setTimeout(() => {
            lightboxImg.src = galleryImages[currentIndex].src;
            lightboxImg.alt = galleryImages[currentIndex].alt || 'Φωτογραφία Gallery';
            lightboxImg.style.opacity = '1';
        }, 120);
    };

    // Άνοιγμα Lightbox
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            if (lightbox) {
                lightbox.classList.add('active');
                updateLightboxImage(index);
            }
        });
    });

    // Κλείσιμο Lightbox
    const closeLightbox = () => {
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    // Κουμπιά Πλοήγησης
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateLightboxImage(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateLightboxImage(currentIndex + 1);
        });
    }

    // Κλείσιμο με κλικ στο φόντο
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Πλοήγηση με το πληκτρολόγιο (Esc, Αριστερό/Δεξί βέλος)
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            updateLightboxImage(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            updateLightboxImage(currentIndex + 1);
        }
    });

    // Υποστήριξη Swipe για οθόνες αφής
    let touchStartX = 0;
    let touchEndX = 0;

    if (lightbox) {
        lightbox.addEventListener('touchstart', (e) => {
            if (!lightbox.classList.contains('active')) return;
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            if (!lightbox.classList.contains('active')) return;
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    const handleSwipe = () => {
        const swipeThreshold = 50; // Ελάχιστη απόσταση σύρσης σε px
        if (touchEndX < touchStartX - swipeThreshold) {
            updateLightboxImage(currentIndex + 1); // Swipe Αριστερά -> Επόμενη
        } else if (touchEndX > touchStartX + swipeThreshold) {
            updateLightboxImage(currentIndex - 1); // Swipe Δεξιά -> Προηγούμενη
        }
    };

});