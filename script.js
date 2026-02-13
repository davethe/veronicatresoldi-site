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
// Global Interactive Quiz Injection & Logic
document.addEventListener('DOMContentLoaded', () => {
    // Quiz Data Configuration
    const quizContent = {
        checklists: {
            '0-2': [
                "Sembra muoversi meno dei coetanei (fatica a rotolare, strisciare o stare seduto)",
                "Usa prevalentemente una sola mano o è goffo nell'afferrare piccoli oggetti",
                "Aggancia poco il mio sguardo quando giochiamo o quando lo chiamo",
                "Fatica a incuriosirsi agli oggetti o tende a lanciarli senza esplorarli",
                "Mostra crisi intense di fronte a piccoli cambiamenti o interruzioni",
                "È molto sensibile a rumori, luci o contatto fisico (reagisce con forte fastidio)"
            ],
            '3-5': [
                "Inciampa spesso, cade facilmente o ha paura di salire sulle giostre",
                "Fa fatica a impugnare matite e pennarelli o evita di disegnare",
                "Non gioca ancora a \"fare finta di...\" (es. dar da mangiare alla bambola)",
                "Fatica molto a rispettare le piccole regole quotidiane o i turni di gioco",
                "Esprime la frustrazione con crisi emotive intense e difficili da gestire",
                "Si stanca velocemente o non riesce a stare seduto per brevi attività"
            ],
            '6+': [
                "Perde spesso il filo del discorso o dimentica/perde il materiale scolastico",
                "Sembra \"maldestro\" negli sport o nei giochi di coordinazione complessi",
                "Vive con forte ansia o rabbia le situazioni in cui non riesce subito bene (bassa tolleranza alla frustrazione)",
                "Fatica a rispettare le regole dei giochi strutturati o le indicazioni dell'adulto",
                "Fatica a mantenere l'attenzione su un compito per il tempo richiesto",
                "La scrittura è disordinata, lenta o lamenta dolore alla mano mentre scrive",
                "Ha difficoltà a organizzare lo spazio sul foglio o a pianificare i compiti"
            ]
        },
        expectations: [
            {
                text: "Capire se queste fatiche sono tappe dello sviluppo o se serve un intervento",
                type: "valutazione",
                label: "Valutazione" // Short label for summary
            },
            {
                text: "Iniziare un percorso specifico per aiutare mio figlio a superare queste difficoltà",
                type: "trattamento",
                label: "Terapia"
            },
            {
                text: "Avere strategie pratiche per gestire meglio queste situazioni (regole, crisi, quotidianità) a casa",
                type: "supporto",
                label: "Supporto Genitoriale"
            }
        ],
        results: {
            'valutazione': {
                title: "Valutazione Neuropsicomotoria",
                text: "È il punto di partenza fondamentale per comprendere a fondo le fatiche di tuo figlio. Attraverso l'osservazione nel gioco e prove specifiche, analizzerò le sue potenzialità e le aree di fragilità per capire se e come intervenire."
            },
            'trattamento': {
                title: "Trattamento Neuropsicomotorio",
                text: "Un percorso terapeutico personalizzato dove il gioco diventa lo strumento per superare le difficoltà motorie, relazionali, emotive o attentive, favorendo uno sviluppo armonico nel rispetto dei suoi tempi."
            },
            'supporto': {
                title: "Supporto Genitoriale",
                text: "Uno spazio dedicato a voi genitori per approfondire le dinamiche educative e ricevere strumenti concreti. L'obiettivo è supportarvi nel comprendere i bisogni di vostro figlio e migliorare la gestione del quotidiano."
            }
        }
    };

    // 1. Inject FAB and Modal HTML if not on Contact page
    if (!window.location.pathname.includes('contatti')) {
        const quizHTML = `
            <button class="quiz-fab" id="open-quiz" aria-label="Apre il quiz per scoprire il percorso adatto">
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

                        <!-- Step 1: Age Selection -->
                        <div class="quiz-step active" data-step="1" aria-live="polite">
                            <h3 class="quiz-question">Quanti anni ha il tuo bambino?</h3>
                            <div class="quiz-options">
                                <button class="quiz-option" data-age="0-2">
                                    <span class="icon" aria-hidden="true"><i class="fa-solid fa-baby"></i></span>
                                    <span>0 - 2 anni</span>
                                </button>
                                <button class="quiz-option" data-age="3-5">
                                    <span class="icon" aria-hidden="true"><i class="fa-solid fa-child"></i></span>
                                    <span>3 - 5 anni</span>
                                </button>
                                <button class="quiz-option" data-age="6+">
                                    <span class="icon" aria-hidden="true"><i class="fa-solid fa-school"></i></span>
                                    <span>Oltre i 6 anni</span>
                                </button>
                            </div>
                        </div>

                        <!-- Step 2: Dynamic Checklist (Multi-select) -->
                        <div class="quiz-step" data-step="2" aria-live="polite">
                            <h3 class="quiz-question">Seleziona ciò che noti (puoi sceglierne più di uno):</h3>
                            <div class="quiz-options" id="quiz-checklist-container">
                                <!-- Dynamic Content -->
                            </div>
                            <div class="quiz-navigation">
                                <button class="quiz-prev-btn" data-target="1">Indietro</button>
                                <button class="quiz-next-btn" id="step-2-next" disabled>Prosegui</button>
                            </div>
                        </div>

                        <!-- Step 3: Expectations -->
                        <div class="quiz-step" data-step="3" aria-live="polite">
                            <h3 class="quiz-question">In questo momento, di cosa senti di aver più bisogno?</h3>
                            <div class="quiz-options">
                                ${quizContent.expectations.map((exp, index) => `
                                    <button class="quiz-option" data-expectation-type="${exp.type}" data-expectation-label="${exp.label}">
                                        <span class="icon" aria-hidden="true"><i class="fa-solid fa-chevron-right"></i></span>
                                        <span style="font-size: 0.95rem;">${exp.text}</span>
                                    </button>
                                `).join('')}
                            </div>
                            <div class="quiz-navigation" style="justify-content: flex-start;">
                                <button class="quiz-prev-btn" data-target="2">Indietro</button>
                            </div>
                        </div>

                        <!-- Result -->
                        <div class="quiz-step" id="quiz-result" aria-live="assertive">
                            <div class="quiz-result" style="text-align: center;">
                                <div id="result-content"></div>
                                <div class="cta-center" style="margin-top: 30px;">
                                    <button class="btn btn-primary" id="result-cta">Richiedi disponibilità</button>
                                </div>
                                <p style="font-size: 0.8rem; color: var(--text-light); margin-top: 20px; font-style: italic;">
                                    "I risultati di questo quiz sono indicativi e basati sulla tua osservazione. Non sostituiscono una valutazione clinica. Durante il nostro primo contatto verificheremo insieme il percorso più idoneo."
                                </p>
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
        const resultStep = document.getElementById('quiz-result');
        const checklistContainer = document.getElementById('quiz-checklist-container');
        const step2NextBtn = document.getElementById('step-2-next');

        let currentStep = 0;
        let selections = {
            age: '',
            symptoms: [],
            expectationType: '',
            expectationLabel: ''
        };

        // Event Listeners for Opening/Closing
        openQuizBtn.addEventListener('click', () => {
            quizModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            resetQuiz();
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

        // Step navigation logic
        function goStep(stepIndex) {
            steps.forEach((step, index) => step.classList.toggle('active', index === stepIndex));
            currentStep = stepIndex;
            // Progress: 0->0%, 1->33%, 2->66%, 3->100%
            progressBar.style.width = `${(currentStep / 3) * 100}%`;
        }

        // Back Buttons
        document.querySelectorAll('.quiz-prev-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = parseInt(btn.getAttribute('data-target'));
                // Adjust for 0-index array (Step 1 is index 0)
                goStep(target - 1);
            });
        });

        // STEP 1: Age Selection
        document.querySelectorAll('[data-age]').forEach(btn => {
            btn.addEventListener('click', function () {
                selections.age = this.getAttribute('data-age');
                renderChecklist(selections.age);
                goStep(1); // Go to Step 2
            });
        });

        // Helper: Render Checklist for Step 2
        function renderChecklist(age) {
            checklistContainer.innerHTML = '';
            selections.symptoms = []; // Reset selected symptoms
            step2NextBtn.disabled = true; // Disable until selection made

            const items = quizContent.checklists[age] || [];
            items.forEach(itemText => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option';
                btn.innerHTML = `
                    <span class="icon"><i class="fa-regular fa-square"></i></span>
                    <span>${itemText}</span>
                `;
                btn.addEventListener('click', () => toggleSymptom(btn, itemText));
                checklistContainer.appendChild(btn);
            });
        }

        // Checklist Selection Logic
        function toggleSymptom(btn, text) {
            btn.classList.toggle('selected');
            const icon = btn.querySelector('.icon i');

            if (btn.classList.contains('selected')) {
                icon.className = 'fa-solid fa-square-check';
                selections.symptoms.push(text);
            } else {
                icon.className = 'fa-regular fa-square';
                selections.symptoms = selections.symptoms.filter(t => t !== text);
            }

            // Enable Next button if at least 1 is selected
            step2NextBtn.disabled = selections.symptoms.length === 0;
            step2NextBtn.innerText = selections.symptoms.length === 0 ? "Seleziona almeno un'opzione" : "Prosegui";
        }

        // STEP 2 Next Button
        step2NextBtn.addEventListener('click', () => {
            if (selections.symptoms.length > 0) {
                goStep(2); // Go to Step 3
            }
        });

        // STEP 3: Expectation Selection
        document.querySelectorAll('[data-expectation-type]').forEach(btn => {
            btn.addEventListener('click', function () {
                selections.expectationType = this.getAttribute('data-expectation-type');
                selections.expectationLabel = this.getAttribute('data-expectation-label');
                showResult();
            });
        });

        // Render Result
        function showResult() {
            progressBar.style.width = '100%';
            steps.forEach(s => s.classList.remove('active'));
            resultStep.classList.add('active');

            const resultData = quizContent.results[selections.expectationType];
            const resultContent = document.getElementById('result-content');

            resultContent.innerHTML = `
                <h3 style="margin-bottom:15px; color:var(--primary-color); font-size: 1.8rem;">${resultData.title}</h3>
                <p style="color:var(--text-light); line-height:1.6; font-size: 1.1rem;">${resultData.text}</p>
            `;

            // Setup CTA
            const resultCta = document.getElementById('result-cta');
            resultCta.onclick = () => {
                // Build Detailed Summary
                const summary = [
                    `Età Bambino: ${selections.age}`,
                    `Osservazioni:`,
                    ...selections.symptoms.map(s => `- ${s}`),
                    `Obiettivo Genitore: ${selections.expectationLabel}`
                ].join('\n');

                localStorage.setItem('quizResult', summary);
                localStorage.setItem('recommendedService', resultData.title); // Use title for service field

                const isSubdir = window.location.pathname.includes('/servizi/');
                window.location.href = isSubdir ? '../contatti-e-prenotazioni.html' : 'contatti-e-prenotazioni.html';
            };
        }

        function resetQuiz() {
            currentStep = 0;
            selections = { age: '', symptoms: [], expectationType: '', expectationLabel: '' };
            // Reset Progress Bar
            progressBar.style.width = '0%';
            // Reset Active Step
            steps.forEach(s => s.classList.remove('active'));
            document.querySelector('[data-step="1"]').classList.add('active');
        }
    }

    // 2. Contact Form Pre-filling logic
    const quizResult = localStorage.getItem('quizResult');
    const recommendedService = localStorage.getItem('recommendedService');

    if (quizResult && (window.location.pathname.includes('contatti') || document.querySelector('.contact-form-card'))) {
        const messageField = document.getElementById('message');
        const serviceField = document.getElementById('service');

        if (messageField) {
            // Check if already filled to prevent overwriting user input on reload (optional, but good UX)
            // Here we just overwrite as per request logic implies immediate transfer
            messageField.value = `Ho completato il test Bussola Evolutiva.\n\n${quizResult}\n\nVorrei maggiori dettagli su questo percorso.\n\n---\nI risultati di questo quiz sono indicativi e basati sulla tua osservazione. Non sostituiscono una valutazione clinica. Durante il nostro primo contatto verificheremo insieme il percorso più idoneo.`;
        }

        if (serviceField && recommendedService) {
            // Try to match the dropdown value exactly or loosely
            // If options are strict, we might need to map 'Valutazione Neuropsicomotoria' -> 'valutazione'
            // Assuming the form options have values like 'valutazione', 'trattamento', 'parent-coaching'
            // We can fuzzy match or set it if the text matches.
            // For now, let's look at the service output.
            // The values in 'resultData.title' are "Valutazione Neuropsicomotoria", "Trattamento Neuropsicomotorio", "Supporto Genitoriale".
            // Let's assume standard values. If not, text remains in message.

            // Simplistic mapping attempt for standard select values
            const val = recommendedService.toLowerCase();
            if (val.includes('valutazione')) serviceField.value = 'valutazione';
            else if (val.includes('trattamento')) serviceField.value = 'trattamento';
            else if (val.includes('supporto')) serviceField.value = 'parent-coaching'; // Common substitute
        }

        // Clean up
        localStorage.removeItem('quizResult');

        // 3. EmailJS Form Handling
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function (event) {
                event.preventDefault();

                // Show loading state on button
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerText;
                submitBtn.disabled = true;
                submitBtn.innerText = 'Invio in corso...';

                // Parameters for EmailJS
                const serviceID = 'service_v4zydxn';
                const templateID = 'template_cgp5o94';

                emailjs.sendForm(serviceID, templateID, this)
                    .then(() => {
                        submitBtn.innerText = 'Messaggio inviato!';
                        submitBtn.style.backgroundColor = '#1a3d2e'; // Feedback success color
                        contactForm.reset();
                        alert('Grazie! Il tuo messaggio è stato inviato correttamente. Ti risponderò il prima possibile.');

                        // Reset button after 5 seconds
                        setTimeout(() => {
                            submitBtn.disabled = false;
                            submitBtn.innerText = originalBtnText;
                            submitBtn.style.backgroundColor = '';
                        }, 5000);
                    }, (err) => {
                        submitBtn.disabled = false;
                        submitBtn.innerText = originalBtnText;
                        alert('Si è verificato un errore durante l\'invio. Per favore riprova o scrivimi direttamente a veronicatresoldi.tnpee@gmail.com.\n\nErrore: ' + JSON.stringify(err));
                    });
            });
        }
    });
