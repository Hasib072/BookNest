// frontend/src/utils/preloadImages.js

export const preloadImages = (imageUrls) => {
    return Promise.all(
      imageUrls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = reject;
        });
      })
    );
  };
  