
if (!customElements.get('iq-collection-video')) {
  customElements.define('iq-collection-video', class extends HTMLElement {
    connectedCallback() {
      if (this.ready) return;
      this.ready = true;
      this.button = this.querySelector('button');
      this.video = this.querySelector('video');
      this.media = window.matchMedia('(max-width:749px)');
      if (this.querySelector('template[data-iq-video-poster]')) {
        if ('IntersectionObserver' in window) {
          this.posterObserver = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) this.loadPoster();
          }, { rootMargin: '400px 0px' });
          this.posterObserver.observe(this);
        } else {
          this.loadPoster();
        }
      }
      this.button.addEventListener('click', () => this.play());
      this.onResize = () => {
        if (!this.video.currentSrc) return;
        this.video.pause();
        this.video.removeAttribute('src');
        this.video.load();
        this.video.hidden = true;
        this.video.tabIndex = -1;
        this.button.hidden = false;
        this.querySelector('picture')?.removeAttribute('hidden');
      };
      this.media.addEventListener('change', this.onResize);
    }
    disconnectedCallback() {
      this.media?.removeEventListener('change', this.onResize);
      this.posterObserver?.disconnect();
    }
    loadPoster() {
      const template = this.querySelector('template[data-iq-video-poster]');
      if (!template) return;
      template.replaceWith(template.content.cloneNode(true));
      this.posterObserver?.disconnect();
    }
    async play() {
      const sources = JSON.parse(this.media.matches ? this.dataset.mobileSources : this.dataset.desktopSources).filter(s => s.mime_type === 'video/mp4').sort((a,b) => a.width - b.width);
      const width = Math.min(this.video.parentElement.clientWidth * Math.min(devicePixelRatio,2),1280);
      const source = sources.find(s => s.width >= width) || sources.at(-1);
      if (!source) return;
      this.querySelector('[role="status"]').hidden = true;
      this.video.src = source.url;
      this.video.hidden = false;
      this.video.tabIndex = 0;
      this.button.hidden = true;
      this.querySelector('picture')?.setAttribute('hidden','');
      this.video.focus({preventScroll:true});
      try { await this.video.play(); }
      catch { this.querySelector('[role="status"]').hidden = false; }
    }
  });
}
