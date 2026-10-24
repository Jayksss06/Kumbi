// Offline QR Code SVG Generator for Kumbi
// Fully self-contained, 100% client-side, zero external API dependency

import QRCode from 'qrcode';

/**
 * Menghasilkan SVG string untuk QR Code secara lokal
 */
export async function generateQrCodeSvg(text: string): Promise<string> {
  try {
    return await QRCode.toString(text, {
      type: 'svg',
      errorCorrectionLevel: 'M',
      margin: 2,
      color: {
        dark: '#1C2E24', // Kontras tinggi untuk cetak B/W
        light: '#FFFFFF'
      }
    });
  } catch (err) {
    console.error('Error generating QR SVG:', err);
    // Fallback simple SVG
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="#fff"/><text x="50" y="55" font-size="12" text-anchor="middle" fill="#000">${text}</text></svg>`;
  }
}

/**
 * Menghasilkan Data URL base64 image untuk QR Code
 */
export async function generateQrCodeDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 200,
      color: {
        dark: '#1C2E24',
        light: '#FFFFFF'
      }
    });
  } catch (err) {
    console.error('Error generating QR DataURL:', err);
    return '';
  }
}
