(function () {
    'use strict';

    /*UTILITY*/
    function $(sel, ctx) { return (ctx || document).querySelector(sel); }
    function $$(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }
    function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }

    /*SCROLL REVEAL */
    var revealEls = $$('.reveal');

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });


    /*FAQ ACCORDION*/
    var faqItems = $$('.faq-item');

    faqItems.forEach(function (item) {
        var btn    = item.querySelector('.faq-question');
        var answer = item.querySelector('.faq-answer');

        btn.addEventListener('click', function () {
            var isOpen = btn.getAttribute('aria-expanded') === 'true';

            // Close all
            faqItems.forEach(function (other) {
                var otherBtn    = other.querySelector('.faq-question');
                var otherAnswer = other.querySelector('.faq-answer');
                otherBtn.setAttribute('aria-expanded', 'false');
                otherAnswer.style.maxHeight = null;
            });

            // Toggle clicked
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });


    /*FORM HELPERS*/
    function getFormGroup(input) {
        return input.closest('[data-field]');
    }

    function setError(input, msg) {
        var group = getFormGroup(input);
        if (!group) return;
        group.classList.add('is-invalid');
        var errEl = group.querySelector('.err-msg');
        if (errEl) errEl.textContent = msg;
    }

    function clearError(input) {
        var group = getFormGroup(input);
        if (!group) return;
        group.classList.remove('is-invalid');
        var errEl = group.querySelector('.err-msg');
        if (errEl) errEl.textContent = '';
    }

    function showFeedback(el, type) {
        el.classList.remove('show');
        void el.offsetWidth; // reflow for animation re-trigger
        el.classList.add('show');
        if (type === 'auto-hide') {
            setTimeout(function () { el.classList.remove('show'); }, 6000);
        }
    }

    function hideFeedback(el) { el.classList.remove('show'); }

    function setLoading(btn, loading) {
        btn.disabled = loading;
        if (loading) {
            btn.classList.add('sending');
        } else {
            btn.classList.remove('sending');
        }
    }

    // Attach live validation clear on input
    function attachLiveValidation(inputs) {
        inputs.forEach(function (input) {
            input.addEventListener('input', function () { clearError(input); });
            input.addEventListener('change', function () { clearError(input); });
        });
    }


    /*MAIN CONTACT FORM*/
    var mainForm    = $('#mainForm');
    var mainSuccess = $('#mainSuccess');
    var mainError   = $('#mainError');
    var mainSubmit  = $('#mainSubmit');

    if (mainForm) {
        var mainInputs = $$('input, select, textarea', mainForm);
        attachLiveValidation(mainInputs);

        mainForm.addEventListener('submit', function (e) {
            e.preventDefault();
            hideFeedback(mainSuccess);
            hideFeedback(mainError);

            var fullName    = $('#fullName');
            var email       = $('#email');
            var subject     = $('#subject');
            var message     = $('#message');
            var valid       = true;

            if (!fullName.value.trim()) {
                setError(fullName, 'Please enter your full name.');
                valid = false;
            }

            if (!email.value.trim()) {
                setError(email, 'Please enter your email address.');
                valid = false;
            } else if (!isValidEmail(email.value)) {
                setError(email, 'Please enter a valid email address.');
                valid = false;
            }

            if (!subject.value) {
                setError(subject, 'Please select a subject.');
                valid = false;
            }

            if (!message.value.trim()) {
                setError(message, 'Please enter a message.');
                valid = false;
            }

            if (!valid) {
                showFeedback(mainError, 'persist');
                return;
            }

            // Simulate send
            setLoading(mainSubmit, true);

            setTimeout(function () {
                setLoading(mainSubmit, false);
                showFeedback(mainSuccess, 'auto-hide');
                mainForm.reset();
            }, 1800);

            /*
             * ── Replace setTimeout above with a real send, e.g. EmailJS: ──
             *
             * emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
             *     from_name: fullName.value.trim(),
             *     from_email: email.value.trim(),
             *     subject: subject.value,
             *     message: message.value.trim(),
             * }).then(function () {
             *     setLoading(mainSubmit, false);
             *     showFeedback(mainSuccess, 'auto-hide');
             *     mainForm.reset();
             * }).catch(function (err) {
             *     setLoading(mainSubmit, false);
             *     document.getElementById('mainErrorMsg').textContent =
             *         'Something went wrong. Please try again.';
             *     showFeedback(mainError, 'persist');
             *     console.error(err);
             * });
             */
        });
    }


    /* SUPPORT / HELPDESK FORM*/
    var supportForm    = $('#supportForm');
    var supportSuccess = $('#supportSuccess');
    var supportError   = $('#supportError');
    var supportSubmit  = $('#supportSubmit');
    var concernSelect  = $('#concernType');
    var sMessage       = $('#sMessage');

    // Concern-type → placeholder suggestions
    var placeholderMap = {
        'Booking':      'E.g. I\'d like to book a tour to Palawan for 4 people on June 15–20. What packages are available?',
        'Destinations': 'E.g. Can you suggest itineraries for Siargao or Batanes? Best time to visit?',
        'Payments':     'E.g. Do you accept GCash or PayPal? Is a downpayment required to confirm my booking?',
        'Refunds':      'E.g. I need to cancel my booking due to an emergency. What is the refund process?',
        'Others':       'Please describe your concern in as much detail as possible so we can assist you quickly.',
        '':             'Ask about packages, pricing, or travel dates…',
    };

    if (concernSelect && sMessage) {
        concernSelect.addEventListener('change', function () {
            var ph = placeholderMap[concernSelect.value] || placeholderMap[''];
            sMessage.setAttribute('placeholder', ph);
            // Subtle pulse to draw attention to the textarea
            sMessage.style.transition = 'border-color 0.3s';
            sMessage.style.borderColor = 'var(--gold)';
            setTimeout(function () { sMessage.style.borderColor = ''; }, 800);
        });
    }

    if (supportForm) {
        var supportInputs = $$('input, select, textarea', supportForm);
        attachLiveValidation(supportInputs);

        supportForm.addEventListener('submit', function (e) {
            e.preventDefault();
            hideFeedback(supportSuccess);
            hideFeedback(supportError);

            var sName       = $('#sName');
            var sEmail      = $('#sEmail');
            var sConcern    = $('#concernType');
            var sMsgEl      = $('#sMessage');
            var valid       = true;

            if (!sName.value.trim()) {
                setError(sName, 'Please enter your full name.');
                valid = false;
            }

            if (!sEmail.value.trim()) {
                setError(sEmail, 'Please enter your email address.');
                valid = false;
            } else if (!isValidEmail(sEmail.value)) {
                setError(sEmail, 'Please enter a valid email address.');
                valid = false;
            }

            if (!sConcern.value) {
                setError(sConcern, 'Please select a concern type.');
                valid = false;
            }

            if (!sMsgEl.value.trim()) {
                setError(sMsgEl, 'Please describe your concern.');
                valid = false;
            }

            if (!valid) {
                showFeedback(supportError, 'persist');
                return;
            }

            setLoading(supportSubmit, true);

            setTimeout(function () {
                setLoading(supportSubmit, false);
                showFeedback(supportSuccess, 'auto-hide');
                supportForm.reset();
                if (sMessage) sMessage.setAttribute('placeholder', placeholderMap['']);
            }, 1800);
        });
    }


    /* SMOOTH SCROLL for anchor links*/
    $$('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var offset = 80; // navbar height
                var top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

})();
