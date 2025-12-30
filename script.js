// Mobile Navigation Toggle with touch support
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && navMenu) {
    let touchStartX = 0;
    let touchEndX = 0;

    // Click/touch toggle
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isActive = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', !isActive);
    });

    // Touch gestures for swipe to close
    navMenu.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    navMenu.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        // Swipe left to close (if menu is open)
        if (swipeDistance < -swipeThreshold && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Close mobile menu when clicking on a link (but not if it's a dropdown toggle)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                // If it's a dropdown parent, don't close the whole menu
                if (link.parentElement.classList.contains('dropdown')) {
                    return;
                }
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close mobile menu when clicking outside or pressing Escape
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
        }
    });
}

// Dropdown menu for mobile
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('.nav-link');
    dropdownLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const isActive = dropdown.classList.contains('active');
            dropdown.classList.toggle('active');
            dropdownLink.setAttribute('aria-expanded', !isActive);
        }
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Global Interactive Quiz Injection & Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject FAB and Modal HTML if not on Contact page
    if (!window.location.pathname.includes('contatti')) {
        const quizHTML = `
            <button class="quiz-fab" id="open-quiz" aria-label="Scopri il percorso più adatto">
                <span class="icon" aria-hidden="true">
                    <i class="fa-solid fa-compass"></i>
                </span>
                <span class="quiz-fab-label">Scopri il percorso più adatto</span>
            </button>

            <div class="quiz-modal" id="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title">
                <div class="quiz-modal-content">
                    <button class="quiz-close" id="close-quiz" aria-label="Chiudi assistente"><span aria-hidden="true">&times;</span></button>
                    
                    <div id="quiz-inner-container">
                        <div class="quiz-progress" aria-hidden="true">
                            <div class="quiz-progress-bar" id="quiz-progress-bar"></div>
                        </div>

                        <h2 id="quiz-title" class="visually-hidden">Bussola Evolutiva - Assistente alla scelta del percorso</h2>

                        <!-- Step 1 -->
                        <div class="quiz-step active" data-step="1" aria-live="polite">
                            <h3 class="quiz-question">Quanti anni ha il tuo bambino?</h3>
                            <div class="quiz-options">
                                <button class="quiz-option" data-value="0-3">
                                    <span class="icon" aria-hidden="true">
                                        <i class="fa-solid fa-baby"></i>
                                    </span>
                                    <span>0 - 3 anni</span>
                                </button>
                                <button class="quiz-option" data-value="4-6">
                                    <span class="icon" aria-hidden="true">
                                        <i class="fa-solid fa-child"></i>
                                    </span>
                                    <span>4 - 6 anni</span>
                                </button>
                                <button class="quiz-option" data-value="6+">
                                    <span class="icon" aria-hidden="true">
                                        <i class="fa-solid fa-school"></i>
                                    </span>
                                    <span>Oltre i 6 anni</span>
                                </button>
                            </div>
                        </div>

                        <!-- Step 2 -->
                        <div class="quiz-step" data-step="2" aria-live="polite">
                            <h3 class="quiz-question">Cosa noti di più nel suo comportamento?</h3>
                            <div class="quiz-options">
                                <button class="quiz-option" data-value="motricità">
                                    <span class="icon" aria-hidden="true">
                                        <i class="fa-solid fa-child-reaching"></i>
                                    </span>
                                    <span>Movimenti goffi o poca coordinazione</span>
                                </button>
                                <button class="quiz-option" data-value="attenzione">
                                    <span class="icon" aria-hidden="true">
                                        <i class="fa-solid fa-bolt"></i>
                                    </span>
                                    <span>Irrequietezza o poca concentrazione</span>
                                </button>
                                <button class="quiz-option" data-value="linguaggio">
                                    <span class="icon" aria-hidden="true">
                                        <i class="fa-solid fa-comment-dots"></i>
                                    </span>
                                    <span>Difficoltà a parlare o relazionarsi</span>
                                </button>
                                <button class="quiz-option" data-value="gioco">
                                    <span class="icon" aria-hidden="true">
                                        <i class="fa-solid fa-puzzle-piece"></i>
                                    </span>
                                    <span>Ho bisogno di consigli su come giocarci</span>
                                </button>
                            </div>
                        </div>

                        <!-- Step 3 -->
                        <div class="quiz-step" data-step="3" aria-live="polite">
                            <h3 class="quiz-question">Qual è il tuo obiettivo principale?</h3>
                            <div class="quiz-options">
                                <button class="quiz-option" data-value="valutazione">
                                    <span class="icon" aria-hidden="true">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <span>Capire se c'è un problema (Valutazione)</span>
                                </button>
                                <button class="quiz-option" data-value="terapia">
                                    <span class="icon" aria-hidden="true">
                                        <i class="fa-solid fa-chart-line"></i>
                                    </span>
                                    <span>Iniziare un percorso (Terapia)</span>
                                </button>
                                <button class="quiz-option" data-value="consulto">
                                    <span class="icon" aria-hidden="true">
                                        <i class="fa-solid fa-lightbulb"></i>
                                    </span>
                                    <span>Strumenti pratici per me genitore</span>
                                </button>
                            </div>
                        </div>

                        <!-- Result -->
                        <div class="quiz-step" id="quiz-result" aria-live="assertive">
                            <div class="quiz-result" style="text-align: center;">
                                <div id="result-content"></div>
                                <div class="cta-center" style="margin-top: 30px;">
                                    <button class="btn btn-primary" id="result-cta">Richiedi disponibilità subito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', quizHTML);
        initQuiz();
    }

    function initQuiz() {
        const quizModal = document.getElementById('quiz-modal');
        const openQuizBtn = document.getElementById('open-quiz');
        const closeQuizBtn = document.getElementById('close-quiz');
        const steps = document.querySelectorAll('.quiz-step');
        const progressBar = document.getElementById('quiz-progress-bar');
        const options = document.querySelectorAll('.quiz-option');
        const resultContent = document.getElementById('result-content');
        const resultStep = document.getElementById('quiz-result');
        const resultCta = document.getElementById('result-cta');

        let currentStep = 0;
        let quizData = { eta: '', preoccupazione: '', obiettivo: '' };

        openQuizBtn.addEventListener('click', () => {
            quizModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            resetQuiz();
            // Move focus to modal
            setTimeout(() => closeQuizBtn.focus(), 100);
        });

        const closeModal = () => {
            quizModal.classList.remove('active');
            document.body.style.overflow = '';
            openQuizBtn.focus();
        };

        closeQuizBtn.addEventListener('click', closeModal);

        quizModal.addEventListener('click', (e) => {
            if (e.target === quizModal) closeModal();
        });

        // Keyboard management: Escape and Tab Trap
        document.addEventListener('keydown', (e) => {
            if (!quizModal.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeModal();
            }

            if (e.key === 'Tab') {
                const focusableElements = quizModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });

        function updateProgressBar() {
            progressBar.style.width = `${(currentStep / 3) * 100}%`;
        }

        function showStep(stepIndex) {
            steps.forEach((step, index) => step.classList.toggle('active', index === stepIndex));
            currentStep = stepIndex;
            updateProgressBar();
        }

        options.forEach(option => {
            option.addEventListener('click', function () {
                const step = this.closest('.quiz-step');
                const stepNum = parseInt(step.getAttribute('data-step'));
                const text = this.querySelector('span:last-child').innerText;

                if (stepNum === 1) quizData.eta = text;
                if (stepNum === 2) quizData.preoccupazione = text;
                if (stepNum === 3) quizData.obiettivo = text;

                if (currentStep < 2) showStep(currentStep + 1);
                else showResult();
            });
        });

        function showResult() {
            progressBar.style.width = '100%';
            steps.forEach(s => s.classList.remove('active'));
            resultStep.classList.add('active');

            let title = "", text = "", recommendedService = "";

            if (quizData.eta.includes('0 - 3') || quizData.preoccupazione.includes('gioco')) {
                recommendedService = "supporto";
                title = "Supporto Genitoriale e Parent Coaching";
                text = `Il tuo bambino è in una fase magica di scoperta. Il percorso ideale è il <strong>Supporto Genitoriale</strong>. Ti aiuterò a capire come stimolarlo al meglio attraverso il gioco.`;
            } else if (quizData.obiettivo.includes('Valutazione')) {
                recommendedService = "valutazione";
                title = "Valutazione Neuropsicomotoria";
                text = `La tua priorità è fare chiarezza. Una <strong>Valutazione</strong> approfondita ci permetterà di osservare come il tuo bambino interagisce, dandoti risposte concrete.`;
            } else {
                recommendedService = "trattamento";
                title = "Trattamento Neuropsicomotorio";
                text = `Un percorso di <strong>Trattamento</strong> aiuterà il tuo bambino a rinforzare le sue abilità divertendosi.`;
            }

            resultContent.innerHTML = `<h3 style="margin-bottom:15px; color:var(--primary-color);">${title}</h3><p style="color:var(--text-light); line-height:1.6;">${text}</p>`;

            resultCta.onclick = () => {
                const quizSummary = `Età: ${quizData.eta}, Nota: ${quizData.preoccupazione}, Obiettivo: ${quizData.obiettivo}.`;
                localStorage.setItem('quizResult', quizSummary);
                localStorage.setItem('recommendedService', recommendedService);
                // Handle relative paths correctly
                const isSubdir = window.location.pathname.includes('/servizi/');
                window.location.href = isSubdir ? '../contatti-e-prenotazioni.html' : 'contatti-e-prenotazioni.html';
            };
        }

        function resetQuiz() {
            currentStep = 0;
            quizData = { eta: '', preoccupazione: '', obiettivo: '' };
            showStep(0);
        }
    }

    // 2. Contact Form Pre-filling
    const quizResult = localStorage.getItem('quizResult');
    const recommendedService = localStorage.getItem('recommendedService');

    if (quizResult && (window.location.pathname.includes('contatti') || document.querySelector('.contact-form-card'))) {
        const messageField = document.getElementById('message');
        const serviceField = document.getElementById('service');
        if (messageField) messageField.value = `Ho completato il test sul sito. Risultati: ${quizResult}\n\nVorrei approfondire perché... `;
        if (serviceField && recommendedService) serviceField.value = recommendedService;
        localStorage.removeItem('quizResult');
        localStorage.removeItem('recommendedService');
    }
});
