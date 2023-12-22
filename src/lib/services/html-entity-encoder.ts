
/**
 * Encodes certain characters in a string into their corresponding HTML entities.
 * @param {string} text - The text to be encoded.
 * @returns {string} - The encoded text.
 */
export const encodeHtmlEntities = (text: string): string => {
    const replacements: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
  
    return text.replace(/[&<>"']/g, (match) => replacements[match] || match);
  };
  