if (!customElements.get('iq-upload-loader')) {
  customElements.define('iq-upload-loader', class extends HTMLElement {
    connectedCallback() {
      if (this.started) return;
      this.started = true;
      this.checkFields();
    }

    async checkFields() {
      const context = this.querySelector('[data-iq-upload-context]');
      const template = this.querySelector('template');
      if (!context || !template) return;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
      let activate = true;
      try {
        const selectedItems = JSON.parse(context.textContent);
        const response = await fetch('/apps/hey-image-upload/proxy-get-fields', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedItems),
          signal: controller.signal
        });
        if (!response.ok) throw new Error('Upload configuration unavailable');
        const data = await response.json();
        if (!Array.isArray(data.fields)) throw new Error('Invalid upload configuration');
        activate = data.fields.length > 0;
      } catch (error) {
        activate = true;
      } finally {
        clearTimeout(timeout);
      }
      if (activate) {
        await this.activate(template);
      } else {
        template.remove();
        this.dataset.uploadState = 'not-required';
      }
    }

    async activate(template) {
      this.dataset.uploadState = 'loading';
      const fieldsObserver = new MutationObserver(() => {
        if (!this.querySelector('.image-upload-field-container')) return;
        fieldsObserver.disconnect();
        clearTimeout(fieldsTimeout);
        document.dispatchEvent(new Event('iq:upload-fields-ready'));
      });
      const fieldsTimeout = setTimeout(() => fieldsObserver.disconnect(), 30000);
      fieldsObserver.observe(this, { childList: true, subtree: true });
      const fragment = template.content.cloneNode(true);
      const scripts = Array.from(fragment.querySelectorAll('script')).map((original) => {
        const marker = document.createComment('');
        original.replaceWith(marker);
        return { original, marker };
      });
      template.replaceWith(fragment);
      for (const { original, marker } of scripts) {
        const script = document.createElement('script');
        for (const attribute of original.attributes) {
          script.setAttribute(attribute.name, attribute.value);
        }
        if (original.src) {
          script.async = false;
          await new Promise((resolve) => {
            script.onload = resolve;
            script.onerror = resolve;
            marker.replaceWith(script);
          });
        } else {
          script.textContent = original.textContent;
          marker.replaceWith(script);
        }
      }
      this.dataset.uploadState = 'loaded';
    }
  });
}
