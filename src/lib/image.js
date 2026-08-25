// ─────────────────────────────────────────────────────────────────
//  IMAGE HELPER  ·  selfie ko downscale karke compact dataURL banata hai
//  (Firestore doc limit 1MB hai — chhoti JPEG ~30-80KB me aa jati hai)
// ─────────────────────────────────────────────────────────────────

/**
 * File → square-ish, downscaled JPEG dataURL.
 * @param {File} file
 * @param {number} max  longest side in px (default 480)
 * @param {number} quality JPEG quality 0-1 (default 0.72)
 * @returns {Promise<string>} dataURL
 */
export function fileToScaledDataURL(file, max = 480, quality = 0.72) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("Yeh image file nahi hai."));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("File padhi nahi ja saki."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Image load nahi hui."));
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > max) {
          height = Math.round((height * max) / width);
          width = max;
        } else if (height > max) {
          width = Math.round((width * max) / height);
          height = max;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
