// [Hamza 2026-10-15] Colour filter: gallery shows only the media of the selected colour (Variant Galerie)
if (!customElements.get('media-gallery')) {
  customElements.define(
    'media-gallery',
    class MediaGallery extends HTMLElement {
      constructor() {
        super();

        this.selectors = {
          viewer: '[id^="GalleryViewer"]',
          thumbnails: '[id^="GalleryThumbnails"]',
          mediaList: '[id^="Slider-Gallery"]',
          mediaItems: ['.product__media-item'],
        };

        this.sliderInstance = false;
        this.thumbsInstance = false;
      }

      connectedCallback() {
        // this.init();
        FoxTheme.Motion.inView(this, this.init.bind(this));
      }

      init() {
        this.elements = window.FoxTheme.utils.queryDomNodes(this.selectors, this);
        this.mediaLayout = this.dataset.mediaLayout;
        this.onlyImage = this.dataset.onlyImage === 'true';
        this.enableDesktopSlider = this.dataset.enableDesktopSlider === 'true';
        this.enableMobileThumbnails = this.dataset.enableMobileThumbnails === 'true';
        this.enableImageZoom = this.dataset.enableImageZoom === 'true';
        this.setSliderOptions();
        this.initColorFilter(); // [Hamza 2026-10-15] added: start colour filter

        const mql = window.matchMedia(FoxTheme.config.mediaQueryMobile);
        mql.onchange = this.updateMediaLayout.bind(this);
        this.updateMediaLayout();

        if (this.enableImageZoom) {
          this.initImageZoom();
        }

        // [Hamza 2026-10-15] added: apply variant change that happened before init
        if (this.pendingVariant) {
          const variant = this.pendingVariant;
          this.pendingVariant = null;
          this.setActiveMedia(variant);
        }
      }

      // [Hamza 2026-10-15] added: read colour data and collect all slides/thumbs
      initColorFilter() {
        if (this.colorData) return; // [Hamza 2026-10-15] added: run once - theme calls init() on every variant change
        const dataEl = this.querySelector('script[data-gallery-colors]');
        if (!dataEl) return;

        let data;
        try {
          data = JSON.parse(dataEl.textContent);
        } catch (e) {
          return;
        }
        if (!data || !Array.isArray(data.media) || !data.media.length) return;

        this.colorData = data;
        this.currentColor = data.selected || '';
        this.slidePool = new Map();
        this.thumbPool = new Map();

        this.collectGalleryNodes(this);
        this.querySelectorAll('template[data-gallery-hidden]').forEach((tpl) => {
          this.collectGalleryNodes(document.importNode(tpl.content, true));
        });

        // [Hamza 2026-10-15] added: put the start colour in Variant Galerie order right away
        const startColor = this.currentColor;
        this.currentColor = null;
        this.filterByColor(startColor);
      }

      // [Hamza 2026-10-15] added: store slides/thumbs by media id
      collectGalleryNodes(root) {
        root.querySelectorAll('.product__media-item').forEach((el) => {
          if (el.dataset.mediaId) this.slidePool.set(String(el.dataset.mediaId), el);
        });
        root.querySelectorAll('.product__thumbs-item').forEach((el) => {
          if (el.dataset.target) this.thumbPool.set(String(el.dataset.target), el);
        });
      }

      // [Hamza 2026-10-15] added: media ids to show for a colour
      getMediaIdsForColor(color) {
        const media = this.colorData.media;
        const colorsOf = (m) => (Array.isArray(m.colors) ? m.colors : []);
        // [Hamza 2026-10-15] added: position in the selected colour's Variant Galerie (fallback: Media order)
        const orderOf = (m) => (m.orders && m.orders[color] !== undefined ? m.orders[color] : m.order || 0);
        const hasTaggedMedia = !!color && media.some((m) => colorsOf(m).includes(color));

        if (!hasTaggedMedia) return media.map((m) => String(m.id));

        const own = media
          .filter((m) => colorsOf(m).includes(color))
          .sort((a, b) => orderOf(a) - orderOf(b)); // [Hamza 2026-10-15] added: follow this colour's Variant Galerie order
        const shared = this.colorData.strict ? [] : media.filter((m) => colorsOf(m).length === 0);
        return own.concat(shared).map((m) => String(m.id));
      }

      // [Hamza 2026-10-15] added: swap gallery to the selected colour
      filterByColor(color) {
        if (!this.colorData || typeof color !== 'string' || color === this.currentColor) return;
        this.currentColor = color;

        if (typeof window.pauseAllMedia === 'function') window.pauseAllMedia(this);

        const ids = this.getMediaIdsForColor(color);

        const mediaList = this.elements.mediaList;
        const nextSlides = ids.map((id) => this.slidePool.get(id)).filter(Boolean);
        const slidesUnchanged =
          nextSlides.length === mediaList.children.length &&
          nextSlides.every((slide, index) => slide === mediaList.children[index]);

        const thumbList = this.querySelector('[id^="Slider-Thumbnails"]');
        const nextThumbs = thumbList ? ids.map((id) => this.thumbPool.get(id)).filter(Boolean) : [];
        const thumbsUnchanged =
          !thumbList ||
          (nextThumbs.length === thumbList.children.length &&
            nextThumbs.every((thumb, index) => thumb === thumbList.children[index]));

        if (!slidesUnchanged || !thumbsUnchanged) {
          this.destroySlider();
          this.destroyThumbsSlider();
          if (!slidesUnchanged) mediaList.replaceChildren(...nextSlides);
          if (!thumbsUnchanged) thumbList.replaceChildren(...nextThumbs);
        }

        this.elements.mediaItems = [...mediaList.querySelectorAll('.product__media-item')];
        this.elements.mediaItems.forEach((el, index) => {
          el.dataset.mediaIndex = index;
        });

        if (this.lightbox) this.buildLightboxData();

        this.updateMediaLayout();
      }

      // [Hamza 2026-10-15] added: destroy thumbnail slider before rebuilding
      destroyThumbsSlider() {
        if (typeof this.thumbsInstance === 'object' && this.thumbsInstance.slider) {
          this.thumbsInstance.slider.destroy();
        }
        this.thumbsInstance = false;
        if (this.sliderOptions) delete this.sliderOptions.thumbs;
      }

      setSliderOptions() {
        const mediaItemGap = parseInt(this.dataset.mediaItemGap);

        this.sliderOptions = {
          init: false,
          slidesPerView: '1',
          spaceBetween: mediaItemGap,
          loop: false,
          grabCursor: true,
          allowTouchMove: true,
          autoHeight: true,
          navigation: {
            nextEl: this.querySelector('.swiper-button-next'),
            prevEl: this.querySelector('.swiper-button-prev'),
          },
          pagination: {
            el: this.querySelector('.swiper-pagination'),
            clickable: true,
            type: 'fraction',
          },
          threshold: 2,
        };

        this.thumbsOptions = {
          slidesPerView: 4,
          breakpoints: {
            461: {
              slidesPerView: 5,
            },
          },
          spaceBetween: mediaItemGap,
          loop: false,
          freeMode: true,
          watchSlidesProgress: true,
          threshold: 2,
        };

        switch (this.mediaLayout) {
          case 'vertical-carousel':
            this.thumbsOptions = Object.assign({}, this.thumbsOptions, {
              breakpoints: {
                768: {
                  direction: 'vertical',
                  slidesPerView: 'auto',
                },
              },
            });
            break;
          case 'slider-freemode':
            this.sliderOptions = Object.assign({}, this.sliderOptions, {
              slidesPerView: 'auto',
            });
            break;
        }
      }

      updateMediaLayout() {
        if (FoxTheme.config.mqlMobile) {
          this.initSlider();
        } else {
          if (this.enableDesktopSlider) {
            this.initSlider();
          } else {
            this.destroySlider();
          }
        }
      }

      initSlider() {
        if (typeof this.sliderInstance !== 'object') {
          if ((this.enableDesktopSlider || this.enableMobileThumbnails) && this.elements.thumbnails) {
            this.thumbsInstance = new window.FoxTheme.Carousel(this.elements.thumbnails, this.thumbsOptions);
            this.thumbsInstance.init();

            this.sliderOptions.thumbs = {
              swiper: this.thumbsInstance.slider,
              autoScrollOffset: 2,
            };
          }

          this.sliderInstance = new window.FoxTheme.Carousel(this.elements.viewer, this.sliderOptions, [
            FoxTheme.Swiper.Thumbs,
          ]);
          this.sliderInstance.init();

          this.handleSliderAfterInit();
          this.handleSlideChange();

          this.sliderInstance.slider.init();
        }
      }

      destroySlider() {
        if (typeof this.sliderInstance === 'object') {
          this.sliderInstance.slider.destroy();
          this.sliderInstance = false;
        }
      }

      initThumbsSlider() {
        if (typeof this.thumbsInstance !== 'object') {
          this.thumbsInstance = new window.FoxTheme.Carousel(this.selectors.thumbnails, this.thumbsOptions);
          this.thumbsInstance.init();
        }
      }

      // [Hamza 2026-10-15] added: lightbox data in own method so it can be rebuilt after colour change
      buildLightboxData() {
        if (!this.lightboxData) this.lightboxData = [];
        const dataSource = this.lightboxData;
        dataSource.length = 0;

        const allMedia = [...this.querySelectorAll('.product__media-item:not(.swiper-slide-duplicate)')];
        if (allMedia) {
          allMedia.forEach((media) => {
            switch (media.dataset.mediaType) {
              case 'model':
                dataSource.push({
                  id: media.dataset.mediaIndex,
                  html: `<div class="pswp__item--${media.dataset.mediaType}">${
                    media.querySelector('product-model').outerHTML
                  }</div>`,
                  mediaType: media.dataset.mediaType,
                });
                break;
              case 'video':
              case 'external_video':
                dataSource.push({
                  id: media.dataset.mediaIndex,
                  html: `<div class="pswp__item--${media.dataset.mediaType}">${
                    media.querySelector('video-element').outerHTML
                  }</div>`,
                  mediaType: media.dataset.mediaType,
                });
                break;
              case 'image':
                dataSource.push({
                  id: media.dataset.mediaIndex,
                  src: media.dataset.src,
                  width: media.dataset.pswpWidth,
                  height: media.dataset.pswpHeight,
                  mediaType: media.dataset.mediaType,
                });
                break;
            }
          });
        }

        return dataSource;
      }

      initImageZoom() {
        this.buildLightboxData(); // [Hamza 2026-10-15] changed: was inline dataSource array

        this.lightbox = new window.FoxTheme.PhotoSwipeLightbox({
          dataSource: this.lightboxData, // [Hamza 2026-10-15] changed: was dataSource
          pswpModule: window.FoxTheme.PhotoSwipe,
          bgOpacity: 1,
          arrowPrev: false,
          arrowNext: false,
          zoom: false,
          close: false,
          counter: false,
          preloader: false,
        });

        this.lightbox.addFilter('thumbEl', (thumbEl, { id }, index) => {
          if (this.sliderInstance && this.sliderInstance.slider) {
            const { slides, activeIndex } = this.sliderInstance.slider;
            if (slides[activeIndex]) {
              const el = slides[activeIndex].querySelector('img');
              if (el) {
                return el;
              }
            }
          }

          return thumbEl;
        });

        this.lightbox.addFilter('placeholderSrc', (placeholderSrc, { data: { id } }) => {
          if (this.sliderInstance && this.sliderInstance.slider) {
            const { slides, activeIndex } = this.sliderInstance.slider;
            if (slides[activeIndex]) {
              const el = slides[activeIndex].querySelector('img');
              if (el) {
                return el.src;
              }
            }
          }

          return placeholderSrc;
        });

        this.lightbox.on('change', () => {
          window.pauseAllMedia(this);
        });

        this.lightbox.on('destroy', () => {
          const { currIndex } = this.lightbox.pswp;

          if (this.sliderInstance && this.sliderInstance.slider) {
            this.sliderInstance.slider.slideToLoop(currIndex, 0, false);
          }
        });

        this.lightbox.on('pointerDown', (e) => {
          if (this.lightbox.pswp.currSlide.data.mediaType != 'image') {
            e.preventDefault();
          }
        });

        this.lightbox.on('uiRegister', () => {
          if (!this.onlyImage) {
            this.lightbox.pswp.ui.registerElement({
              name: 'next',
              ariaLabel: 'Next slide',
              order: 3,
              isButton: true,
              html: '<svg class="pswp-icon-next flip-x" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 65,90 L 25,50  L 65,10 L 60,0 Z"></path></svg>',
              onClick: (event, el) => {
                this.lightbox.pswp.next();
              },
            });
            this.lightbox.pswp.ui.registerElement({
              name: 'prev',
              ariaLabel: 'Previous slide',
              order: 1,
              isButton: true,
              html: '<svg class="pswp-icon-prev rtl-flip-x" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 65,90 L 25,50  L 65,10 L 60,0 Z"></path></svg>',
              onClick: (event, el) => {
                this.lightbox.pswp.prev();
              },
            });
          }
          this.lightbox.pswp.ui.registerElement({
            name: 'close-zoom',
            ariaLabel: 'Close zoom image',
            order: 2,
            isButton: true,
            html: '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
            onClick: (event, el) => {
              this.lightbox.pswp.close();
            },
          });
        });

        this.lightbox.init();

        FoxTheme.utils.addEventDelegate({
          selector: '.js-photoswipe--zoom',
          context: this,
          handler: (e, media) => {
            if (media.dataset.mediaType === 'image') {
              const index = Number(media.dataset.mediaIndex) || 0;
              this.lightbox.loadAndOpen(index);
            }
          },
        });
      }

      handleSliderAfterInit() {
        this.sliderInstance.slider.on('afterInit', (swiper) => {
          const { slides, activeIndex } = swiper;

          if (slides[activeIndex]) {
            const isModelMediaType = slides[activeIndex].dataset.mediaType === 'model';
            this.toggleSliderDraggableState(!isModelMediaType);
          }
        });
      }

      handleSlideChange() {
        this.sliderInstance.slider.on('realIndexChange', (swiper) => {
          const { slides, activeIndex, thumbs } = swiper;

          if (thumbs.swiper) {
            thumbs.swiper.slideTo(activeIndex);
          }

          if (slides[activeIndex]) {
            this.playActiveMedia(slides[activeIndex]);

            const isModelMediaType = slides[activeIndex].dataset.mediaType === 'model';
            this.toggleSliderDraggableState(!isModelMediaType);
          }
        });
      }

      toggleSliderDraggableState(isDraggable) {
        if (this.sliderInstance.slider.allowTouchMove !== isDraggable) {
          this.sliderInstance.slider.allowTouchMove = isDraggable;
        }
      }

      playActiveMedia(selected) {
        const deferredMedia = selected.querySelector('product-model');
        if (deferredMedia) deferredMedia.loadContent(false);
      }

      setActiveMedia(variant) {
        // [Hamza 2026-10-15] added: remember variant if gallery not initialised yet
        if (!this.elements) {
          this.pendingVariant = variant;
          return;
        }

        // [Hamza 2026-10-15] added: filter gallery by selected colour
        if (variant && this.colorData && this.colorData.variants) {
          this.filterByColor(this.colorData.variants[String(variant.id)]);
        }

        if (!variant || !variant.hasOwnProperty('featured_media') || !variant.featured_media) return;

        // [Hamza 2026-10-15] changed: find variant image in filtered list (was featured_media.position)
        if (this.sliderInstance && this.sliderInstance.slider) {
          const slides = [...this.elements.mediaList.querySelectorAll('.product__media-item')];
          const slideIndex = slides.findIndex(
            (el) => String(el.dataset.mediaId) === String(variant.featured_media.id)
          );
          this.sliderInstance.slider.slideToLoop(slideIndex >= 0 ? slideIndex : 0, 0, false);
        } else {
          this.sortMediaItems(variant);
        }
      }

      sortMediaItems(variant) {
        let newMedias = this.elements.mediaItems;

        // Reset ordering.
        newMedias.sort(function (a, b) {
          return a.dataset.mediaIndex - b.dataset.mediaIndex;
        });

        newMedias.some((media, index) => {
          if (media.dataset.mediaId == variant.featured_media.id) {
            const [element] = newMedias.splice(index, 1);
            newMedias.unshift(element);
            return true;
          }
        });

        const mediaList = this.elements.mediaList;
        const orderUnchanged =
          newMedias.length === mediaList.children.length &&
          newMedias.every((media, index) => media === mediaList.children[index]);
        if (!orderUnchanged) mediaList.replaceChildren(...newMedias);

        if (!FoxTheme.config.mqlMobile) {
          const selectedMedia = this.querySelector(`[data-media-id="${variant.featured_media.id}"]`);
          if (selectedMedia) {
            window.scrollTo({ top: selectedMedia.offsetTop, behavior: 'smooth' });
          }
        }
      }
    }
  );
}