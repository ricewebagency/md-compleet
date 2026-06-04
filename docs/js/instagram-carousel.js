document.addEventListener('DOMContentLoaded', () => {
  const lazyVideos = Array.from(document.querySelectorAll('video[data-lazy-video]'));

  const playVideo = (video) => {
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  };

  const loadVideo = (video) => {
    if (video.dataset.videoLoaded === 'true') {
      return;
    }

    const sources = video.querySelectorAll('source[data-src]');
    sources.forEach((source) => {
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
    });

    if (sources.length > 0) {
      video.load();
    }

    video.dataset.videoLoaded = 'true';
  };

  if ('IntersectionObserver' in window) {
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        loadVideo(entry.target);
        observer.unobserve(entry.target);
      });
    }, {
      root: null,
      rootMargin: '300px 0px',
      threshold: 0.01
    });

    lazyVideos.forEach((video) => {
      lazyLoadObserver.observe(video);
    });

    // Non-carousel videos only play while visible.
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (video.closest('[data-ig-carousel]')) {
          return;
        }

        if (entry.isIntersecting) {
          loadVideo(video);
          playVideo(video);
        } else {
          video.pause();
        }
      });
    }, {
      root: null,
      threshold: 0.35
    });

    lazyVideos.forEach((video) => {
      visibilityObserver.observe(video);
    });
  } else {
    lazyVideos.forEach((video) => {
      loadVideo(video);
      if (video.autoplay) {
        playVideo(video);
      }
    });
  }

  const carousels = document.querySelectorAll('[data-ig-carousel]');

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('[data-ig-track]');
    const prevButton = carousel.querySelector('[data-ig-prev]');
    const nextButton = carousel.querySelector('[data-ig-next]');

    if (!track) {
      return;
    }

    const slides = Array.from(track.children);
    if (slides.length <= 1) {
      return;
    }

    let currentIndex = 0;
    let touchStartX = 0;
    let isCarouselVisible = false;

    const updateControls = () => {
      if (prevButton) {
        prevButton.disabled = currentIndex === 0;
      }

      if (nextButton) {
        nextButton.disabled = currentIndex === slides.length - 1;
      }
    };

    const updateVideos = () => {
      slides.forEach((slide, index) => {
        const video = slide.tagName === 'VIDEO' ? slide : slide.querySelector('video');
        if (!video) {
          return;
        }

        if (index === currentIndex && isCarouselVisible) {
          loadVideo(video);
          playVideo(video);
        } else {
          video.pause();
          if (video.dataset.videoLoaded === 'true') {
            video.currentTime = 0;
          }
        }
      });
    };

    const goToSlide = (index) => {
      const slideIndex = Math.max(0, Math.min(index, slides.length - 1));

      if (slideIndex === currentIndex) {
        updateControls();
        return;
      }

      currentIndex = slideIndex;
      track.scrollTo({
        left: slideIndex * track.clientWidth,
        behavior: 'smooth'
      });
      updateControls();
      updateVideos();
    };

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
      });
    }

    track.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (event) => {
      const touchEndX = event.changedTouches[0].screenX;
      const deltaX = touchStartX - touchEndX;

      if (Math.abs(deltaX) < 40) {
        return;
      }

      if (deltaX > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    });

    window.addEventListener('resize', () => {
      track.scrollTo({ left: currentIndex * track.clientWidth, behavior: 'auto' });
    });

    if ('IntersectionObserver' in window) {
      const carouselVisibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isCarouselVisible = entry.isIntersecting;
          if (!isCarouselVisible) {
            slides.forEach((slide) => {
              const video = slide.tagName === 'VIDEO' ? slide : slide.querySelector('video');
              if (video) {
                video.pause();
              }
            });
            return;
          }

          updateVideos();
        });
      }, {
        root: null,
        threshold: 0.35
      });

      carouselVisibilityObserver.observe(carousel);
    } else {
      isCarouselVisible = true;
      updateVideos();
    }

    updateControls();
  });
});