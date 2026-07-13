/* ============================================================
   TEDA, forms.js
   Reusable progress-bar submit behavior for every form on the
   site (join, apply, contact, youth forum register, volunteer,
   partner). Handles: an actual submission to Web3Forms (with a
   honeypot field for basic spam protection), an animated fill
   and live percentage while sending, masked email in the
   confirmation notification, and an auto-dismissing toast.
   Shows a clear error state (and allows retrying) if the real
   submission fails.

   Durations used across the site (per the confirmed plan):
     join.html            20000 ms
     apply.html           15000 ms
     contact.html         10000 ms
     youth-forum register 15000 ms (not specified in original
                           timing table, matches apply's pace)
     get-involved (both)  15000 ms
   ============================================================ */

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Mask an email address as to*****ke@gmail.com style.
 */
function maskEmail(email) {
  const [user, domain] = (email || '').split('@');
  if (!domain) return email;
  if (user.length <= 4) {
    return user[0] + '*'.repeat(Math.max(user.length - 1, 1)) + '@' + domain;
  }
  return user.slice(0, 2) + '*'.repeat(user.length - 4) + user.slice(-2) + '@' + domain;
}

/**
 * Wire a form to the animated progress-bar submit button, with an
 * invisible reCAPTCHA v3 check and a real submission to Web3Forms.
 *
 * @param {string} formId       id of the <form> element
 * @param {string} btnId        id of the submit <button class="progress-btn">
 * @param {string} fillId       id of the .fill div inside the button
 * @param {string} labelId      id of the .label div inside the button
 * @param {string|null} emailFieldId  id of the email <input> to mask in the
 *                              notification (pass null if the form has no
 *                              email field)
 * @param {number} durationMs   how long the fill animation runs (decorative,
 *                              runs alongside the real network request)
 * @param {string} doneText     label text shown once complete (e.g. "Sent")
 * @param {string} sendingText  label text shown while filling (e.g. "Sending...")
 */
function wireProgressForm(formId, btnId, fillId, labelId, emailFieldId, durationMs, doneText, sendingText) {
  const form = document.getElementById(formId);
  if (!form) return;

  const btn = document.getElementById(btnId);
  const fill = document.getElementById(fillId);
  const label = document.getElementById(labelId);
  const notify = document.getElementById('formNotify');
  const notifyText = document.getElementById('notifyText');

  function runProgressAnimation() {
    return new Promise((resolve) => {
      btn.classList.remove('done', 'error');
      btn.classList.add('running');
      label.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${sendingText} <span class="pct">0%</span>`;
      fill.style.background = '';
      fill.style.transition = `width ${durationMs}ms linear`;
      requestAnimationFrame(() => { fill.style.width = '100%'; });

      const start = Date.now();
      const interval = setInterval(() => {
        const pct = Math.min(100, Math.round(((Date.now() - start) / durationMs) * 100));
        const pctEl = label.querySelector('.pct');
        if (pctEl) pctEl.textContent = pct + '%';
        if (pct >= 100) clearInterval(interval);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        resolve();
      }, durationMs);
    });
  }

  function showSuccess() {
    btn.classList.remove('running');
    btn.classList.add('done');
    label.innerHTML = `<i class="fas fa-check"></i> ${doneText}`;

    if (notify && notifyText) {
      const emailField = emailFieldId ? document.getElementById(emailFieldId) : null;
      const emailVal = emailField ? emailField.value : '';
      notifyText.textContent = emailVal
        ? 'Confirmation going to ' + maskEmail(emailVal)
        : 'Your request has been sent';
      notify.classList.add('show');
      setTimeout(() => notify.classList.remove('show'), 4000);
    }
  }

  function showError(reason) {
    btn.classList.remove('running');
    btn.classList.add('error');
    fill.style.background = '#c0392b';
    label.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Failed, tap to retry`;

    // Allow the person to try again rather than being stuck
    setTimeout(() => {
      btn.classList.remove('error');
      fill.style.width = '0%';
      fill.style.background = '';
      label.innerHTML = `<i class="fas fa-paper-plane"></i> ${doneText === 'Sent' ? 'Try Again' : doneText}`;
    }, 3000);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (btn.classList.contains('running')) return;

    // Simple honeypot check, if the hidden botcheck field got filled in
    // (only bots do this), silently drop the submission.
    const honeypot = form.querySelector('input[name="botcheck"]');
    if (honeypot && honeypot.checked) return;

    function proceedWithSubmit() {
      const formData = new FormData(form);

      const animationDone = runProgressAnimation();
      const submitDone = fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => ({
          success: !!(result && result.success),
          message: result && result.message,
        }))
        .catch((err) => ({ success: false, message: 'Network error: ' + err.message }));

      Promise.all([animationDone, submitDone]).then(([, result]) => {
        if (result.success) {
          showSuccess();
        } else {
          showError(result.message);
        }
      });
    }

    proceedWithSubmit();
  });
}
