(function () {
  function enhanceShopifyForm(embed) {
    if (!embed || embed.dataset.formEnhanced === 'true') return;

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

        h2 {
          margin-bottom: 22px !important;
        }

        [data-file-upload-label] {
          margin-bottom: 4px !important;
          font-size: 14px !important;
          line-height: 1.2 !important;
        }
      `;
      root.appendChild(style);
    }

    const textarea = root.querySelector('textarea');
    const container = textarea?.closest('div');
    if (container) {
      container.classList.add('no-before');
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

    embed.dataset.formEnhanced = 'true';
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

  initShopifyFormEnhancements();

  window.addEventListener('load', () => {
    setTimeout(initShopifyFormEnhancements, 500);
    setTimeout(() => observer.disconnect(), 5000);
  });
})();