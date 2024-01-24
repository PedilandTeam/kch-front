import { useState, useEffect } from 'react';

function useRecaptchaV3() {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    // Check if reCAPTCHA script is already loaded
    if (!window.grecaptcha || !window.grecaptcha.ready) {
      // Dynamically insert script to page
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY`;  
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
    return () => {
      // Cleanup
    };
  }, []);
  
  const executeRecaptcha = (action: string) => {
    return window.grecaptcha
      .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V3!, {action: action}) 
      .then(token => {
        setToken(token);
        return token;
      });
  };

  return {
    token,
    executeRecaptcha
  };

}

export default useRecaptchaV3;