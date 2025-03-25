// This is a utility function to help save the profile image
// You can use this in the browser console to save the image data to localStorage
// Then we'll retrieve it and use it in the About page

function saveImageToLocalStorage(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      try {
        const dataURL = canvas.toDataURL('image/jpeg');
        localStorage.setItem('profileImage', dataURL);
        console.log('Image saved to localStorage');
        resolve(dataURL);
      } catch (e) {
        console.error('Error saving image to localStorage', e);
        reject(e);
      }
    };
    img.onerror = function(e) {
      console.error('Error loading image', e);
      reject(e);
    };
    img.src = imageUrl;
  });
}

export { saveImageToLocalStorage };
