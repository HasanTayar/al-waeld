export const decodeHtmlEntities = (text: string): string => {
    if (typeof window === 'undefined') {
      return text; 
    }
  
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(`<!doctype html><body>${text}`, 'text/html').body.textContent || '';
  
    return decodedString;
  };