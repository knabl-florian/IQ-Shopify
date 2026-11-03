(() => {
  if (window.iqCardImageLoadingReady) return;
  window.iqCardImageLoadingReady = true;
  const loadImages = event => {
    if (!(event.target instanceof Element)) return;
    const wrapper = event.target.closest('.product-card__image-wrapper');
    if (!wrapper) return;
    const templates = [...wrapper.querySelectorAll('template[data-iq-card-image]')];
    if (!templates.length) return;
    const held = [];
    if (window.matchMedia('(min-width:768px) and (hover:hover)').matches) {
      for (const [selector, opacity, visibility] of [
        ['.product-card__image--main', '1', 'visible'],
        ['.product-card__image--second', '0', 'hidden']
      ]) {
        const element = wrapper.querySelector(selector);
        if (!element) continue;
        for (const [property, value] of [['opacity', opacity], ['visibility', visibility]]) {
          held.push([element, property, element.style.getPropertyValue(property), element.style.getPropertyPriority(property)]);
          element.style.setProperty(property, value, 'important');
        }
      }
    }
    const images = [];
    for (const template of templates) {
      const fragment = template.content.cloneNode(true);
      images.push(...fragment.querySelectorAll('img'));
      template.replaceWith(fragment);
    }
    wrapper.dataset.iqCardImagesLoading = '';
    const reveal = () => {
      for (const [element, property, value, priority] of held) {
        if (value) element.style.setProperty(property, value, priority);
        else element.style.removeProperty(property);
      }
      delete wrapper.dataset.iqCardImagesLoading;
    };
    const firstImage = images[0];
    if (!firstImage) reveal();
    else firstImage.decode().then(reveal).catch(() => {
      if (firstImage.complete && firstImage.naturalWidth) reveal();
    });
  };
  for (const type of ['pointerover', 'pointerdown', 'touchstart', 'focusin', 'scroll']) {
    document.addEventListener(type, loadImages, { capture: true, passive: true });
  }
})();
