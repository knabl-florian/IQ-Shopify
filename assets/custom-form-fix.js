(function () {
  function applySuccessContent(root) {
    const success = root.querySelector('[data-testid="banner-success"]');
    if (!success || success.dataset.successEnhanced === 'true') return;

    success.dataset.successEnhanced = 'true';

    const heading = success.querySelector('h2');
    const text = success.querySelector('div');
    const lang =
      document.documentElement.lang ||
      document.documentElement.getAttribute('lang') ||
      'de';

    if (lang.toLowerCase().startsWith('en')) {
      if (heading) heading.textContent = 'Message sent successfully';
      if (text) {
        text.textContent =
          'Thank you. Your form has been submitted successfully. We will get back to you as soon as possible.';
      }
    } else {
      if (heading) heading.textContent = 'Erfolgreich gesendet!';
      if (text) {
        text.textContent =
          'Danke! Das Formular wurde übermittelt. Wir kümmern uns um Ihr Anliegen und melden uns so schnell wie möglich!';
      }
    }
  }

  function enhanceShopifyForm(embed) {
    if (!embed) return;

    const root = embed.shadowRoot;
    if (!root) return;

    if (!root.getElementById('custom-form-fixes')) {
      const style = document.createElement('style');
      style.id = 'custom-form-fixes';
      style.textContent = `
        .no-before::before {
          content: none !important;
          display: none !important;
        }

        button:has(input[type="file"]) {
          min-height: 40px !important;
          height: 40px !important;
          padding: 0 !important;
          margin-top: 8px !important;
          display: flex !important;
          align-items: stretch !important;
          justify-content: center !important;
          overflow: hidden !important;
          width: 100% !important;
        }
          fieldset[name="custom#zielgruppe"] {
  border: 0 !important;
  margin: 18px 0 10px !important;
  padding: 0 !important;
  min-inline-size: 0 !important;
}

fieldset[name="custom#zielgruppe"] > legend {
  margin: 0 0 12px !important;
  font-size: 14px !important;
  line-height: 1.4 !important;
  font-weight: 600 !important;
  color: #1f2937 !important;
}

fieldset[name="custom#zielgruppe"] > div {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 10px 12px !important;
}

fieldset[name="custom#zielgruppe"] label[for^="custom#zielgruppe-"] {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  margin: 0 !important;
  padding: 12px 14px !important;
  border: 1px solid #d0d5dd !important;
  border-radius: 12px !important;
  background: #ffffff !important;
  cursor: pointer !important;
  transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease !important;
}

fieldset[name="custom#zielgruppe"] label[for^="custom#zielgruppe-"]:hover {
  border-color: #000000!important;
  background: #f6fef9 !important;
}

fieldset[name="custom#zielgruppe"] input[type="checkbox"] {
  appearance: none !important;
  -webkit-appearance: none !important;
  width: 18px !important;
  height: 18px !important;
  min-width: 18px !important;
  margin: 0 !important;
  border: 1.5px solid #98a2b3 !important;
  border-radius: 5px !important;
  background: #ffffff !important;
  display: grid !important;
  place-items: center !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  box-shadow: none !important;
}

fieldset[name="custom#zielgruppe"] input[type="checkbox"]::before {
  content: "" !important;
  width: 10px !important;
  height: 10px !important;
  transform: scale(0) !important;
  transition: transform 0.15s ease-in-out !important;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0, 43% 62%) !important;
  background: #ffffff !important;
}
fieldset[name="custom#zielgruppe"] input[type="checkbox"]:checked {
  background: #000000 !important;
  border-color: #000000 !important;
}

fieldset[name="custom#zielgruppe"] input[type="checkbox"]:checked::before {
  transform: scale(1) !important;
}

fieldset[name="custom#zielgruppe"] input[type="checkbox"]:focus-visible {
  outline: 0 !important;
  box-shadow: 0 0 0 3px rgba(8, 18, 12, 0.2) !important;
}

fieldset[name="custom#zielgruppe"] label[for^="custom#zielgruppe-"]:has(input[type="checkbox"]:checked) {
  border-color: #000000 !important;
  background: #f0fdf4 !important;
}

fieldset[name="custom#zielgruppe"] label[for^="custom#zielgruppe-"] span {
  margin: 0 !important;
  font-size: 14px !important;
  line-height: 1.4 !important;
  color: #111827 !important;
}

@media (max-width: 749px) {
  fieldset[name="custom#zielgruppe"] > div {
    grid-template-columns: 1fr !important;
  }

  fieldset[name="custom#zielgruppe"] label[for^="custom#zielgruppe-"] {
    padding: 10px 12px !important;
  }
}
/* =========================
   COUNTRY SELECT ONLY
   excludes phone country selector
========================= */

._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"]) {
  position: relative !important;
}

._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"]) > ._label_12thd_10 {
  position: absolute !important;
  left: 16px !important;
  top: calc(50% + 1px) !important;
  transform: translateY(-50%) !important;
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1 !important;
  font-size: 14px !important;
  color: #b1b1b1 !important;
  pointer-events: none !important;
  transition: all 0.2s ease !important;
  background: transparent !important;
  z-index: 2 !important;
}

._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"]) > ._selectToggle_12thd_25 {
  width: 100% !important;
  min-height: 48px !important;
  height: 48px !important;
  padding: 0 16px !important;
  border: 1px solid #b1b1b1 !important;
  border-radius: 999px !important;
  background: #fff !important;
  box-shadow: none !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  text-align: left !important;
  transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
}



._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"]) > ._selectToggle_12thd_25:focus,
._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"]) > ._selectToggle_12thd_25:focus-visible,
._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"]:focus),
._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"][aria-expanded="true"]) > ._selectToggle_12thd_25 {
  outline: none !important;
  border-color: #000 !important;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.08) !important;
}

._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"]) ._selectToggleText_12thd_25 {
  display: flex !important;
  align-items: center !important;
  flex: 1 1 auto !important;
  min-height: 1em !important;
  font-size: 14px !important;
  line-height: 1.4 !important;
  color: #b1b1b1 !important;
  text-align: left !important;
}

._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"]) ._selectToggleText_12thd_25:empty {
  min-height: 1em !important;
}

/* float label only for Country select */
._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"]:focus) > ._label_12thd_10,
._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"][aria-expanded="true"]) > ._label_12thd_10,
._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"] ._selectToggleText_12thd_25:not(:empty)) > ._label_12thd_10 {
  top: -6px !important;
  transform: none !important;
  padding: 0 4px !important;
  font-size: 12px !important;
  background: #fff !important;
  color: #b1b1b1 !important;
}

._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"]) ._arrowDownIcon_12thd_19 {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-left: 12px !important;
  flex: 0 0 auto !important;
}

._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-controls="custom#land-selector-dropdown"]) ._arrowDownIcon_12thd_19 svg path {
  fill: #b1b1b1 !important;
}
/* =========================
   DEFAULT STATE (black border)
========================= */

._formInputField_nag3b_7,
._formPhoneInputField_piv1u_17,
textarea,
._selectContainer_12thd_6 > ._selectToggle_12thd_25 {
  border: 1px solid #b1b1b1!important;
  box-shadow: none !important;
  transition: border-color 0.15s ease !important;
  cursor: text !important;
}


/* =========================
   FOCUS / ACTIVE (green)
========================= */

._formInputField_nag3b_7:focus,
._formPhoneInputField_piv1u_17:focus,
textarea:focus,
._formFieldContainer_1mxsl_5:focus-within ._formInputField_nag3b_7,
._formPhoneInputContainer_piv1u_6:focus-within ._formPhoneInputField_piv1u_17,
._selectContainer_12thd_6 > ._selectToggle_12thd_25:focus,
._selectContainer_12thd_6:has(> ._selectToggle_12thd_25[aria-expanded="true"]) > ._selectToggle_12thd_25,
._selectContainer_12thd_6:focus-within > ._selectToggle_12thd_25 {
  border:1px solid #16a34a !important; /* green */
  outline: none !important;
  box-shadow: none !important;
}


/* =========================
   HOVER (stay black)
========================= */
._formInputField_nag3b_7:hover,
._formPhoneInputField_piv1u_17:hover,
textarea:hover,
._selectContainer_12thd_6 > ._selectToggle_12thd_25:hover {
  border-color: #b1b1b1 !important;
cursor: text !important;
}
._formInputField_nag3b_7,
._formPhoneInputField_piv1u_17,
textarea,
._selectContainer_12thd_6 > ._selectToggle_12thd_25,
._selectContainer_12thd_6 > ._selectToggle_12thd_25 * {
  cursor: text !important;
}
        button:has(input[type="file"]) > p {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-sizing: border-box !important;
          width: 100% !important;
          height: 100% !important;
          min-height: 100% !important;
          margin: 0 !important;
          padding: 0 12px !important;
          background-color: rgb(241, 241, 241) !important;
          border-radius: var(--form-field-border-radius) !important;
          font: var(--forms-body-font) !important;
          font-size: 12px !important;
          font-weight: 400 !important;
          color: rgb(97, 97, 97) !important;
          line-height: 1 !important;
          text-align: center !important;
        }

        textarea {
          min-height: 120px !important;
          resize: vertical !important;
        }

        textarea[name="custom#detaillierte_reklamationsbeschreibung"] {
          min-height: 150px !important;
          resize: vertical !important;
        }

        h2 {
          margin-bottom: 22px !important;
        }

        [data-file-upload-label] {
          margin-bottom: 4px !important;
          font-size: 14px !important;
          line-height: 1.2 !important;
        }

        [data-testid="banner-success"] {
          background: #ecfdf3 !important;
          border: 1px solid #a6f4c5 !important;
          border-radius: 14px !important;
          padding: 24px !important;
          margin: 20px auto !important;
          max-width: 480px !important;
          width: 100% !important;
          text-align: center !important;
          box-sizing: border-box !important;
        }

        [data-testid="banner-success"]::before {
          content: "✓" !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 44px !important;
          height: 44px !important;
          margin: 0 auto 14px !important;
          border-radius: 999px !important;
          background: #12b76a !important;
          color: #ffffff !important;
          font-size: 20px !important;
          font-weight: 700 !important;
        }

        [data-testid="banner-success"] h2 {
          margin: 0 0 8px !important;
          font-size: 20px !important;
          line-height: 1.3 !important;
          font-weight: 700 !important;
          color: #067647 !important;
          text-align: center !important;
        }

        [data-testid="banner-success"] div {
          margin: 0 !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
          color: #344054 !important;
          text-align: center !important;
        }

        [data-sizing="form-wrapper"],
        ._formContainer_1q1d2_30,
        ._inline_1q1d2_47 {
          overflow: visible !important;
          box-sizing: border-box !important;
        }
      `;
      root.appendChild(style);
    }

    const textarea = root.querySelector('textarea');
    const container = textarea?.closest('div');
    if (container) {
      container.classList.add('no-before');
    }

    if (textarea && !textarea.dataset.autoResizeBound) {
      textarea.dataset.autoResizeBound = 'true';
      textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    }

    root.querySelectorAll('button').forEach((button) => {
      if (button.querySelector('input[type="file"]')) {
        const wrapper = button.parentElement;
        const label = wrapper?.querySelector(':scope > p');
        if (label) {
          label.setAttribute('data-file-upload-label', '');
        }
      }
    });

    applySuccessContent(root);

    if (!embed._shopifyFormShadowObserver) {
      const shadowObserver = new MutationObserver(() => {
        applySuccessContent(root);
      });

      shadowObserver.observe(root, {
        childList: true,
        subtree: true
      });

      embed._shopifyFormShadowObserver = shadowObserver;
    }
  }

  function initShopifyFormEnhancements() {
    document.querySelectorAll('shopify-forms-embed').forEach(enhanceShopifyForm);
  }

  const observer = new MutationObserver(() => {
    initShopifyFormEnhancements();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
    function applyMiniUploadTranslations() {
    const lang =
      document.documentElement.lang ||
      document.documentElement.getAttribute('lang') ||
      'de';

    const isEnglish = lang.toLowerCase().startsWith('en');

    const text = isEnglish
      ? {
          subtitle: 'Upload service ID if available',
          description: 'Upload file as JPG, PNG, or PDF up to 10 MB.',
          group: 'Authorization to wear the official patch',
          yes: 'Yes, available (see upload)',
          no: 'No, not available (blank patch)'
        }
      : {
          subtitle: 'ggf. Dienstausweis hochladen',
          description: 'Datei hochladen als JPG, PNG, oder PDF bis zu 10 MB.',
          group: 'Berechtigung zum Tragen des behördlichen Patches',
          yes: 'Ja, vorhanden (siehe Upload)',
          no: 'Nein, nicht vorhanden (Blanko Patch)'
        };

    document.querySelectorAll('.image-upload-field-subtitle').forEach((el) => {
      el.textContent = text.subtitle;
    });

    document.querySelectorAll('.image-upload-field-description').forEach((el) => {
      el.textContent = text.description;
    });

    document.querySelectorAll('.polaris-radio-group__label').forEach((el) => {
      el.textContent = text.group;
    });

    document.querySelectorAll('.polaris-radio__label').forEach((el, index) => {
      if (index === 0) el.textContent = text.yes;
      if (index === 1) el.textContent = text.no;
    });
  }

  initShopifyFormEnhancements();
    applyMiniUploadTranslations();

  window.addEventListener('load', () => {
    setTimeout(initShopifyFormEnhancements, 500);
    setTimeout(() => observer.disconnect(), 5000);
  });

// Remove dynamically injected Rez Notification branding from the DOM.
  function removeRezPoweredBy() {
  document.querySelectorAll('.rez-notify-powered-by').forEach((el) => {
    el.remove();
  });
}

removeRezPoweredBy();

const rezObserver = new MutationObserver(removeRezPoweredBy);

rezObserver.observe(document.body, {
  childList: true,
  subtree: true
});


})();
