function useRecaptchaV3() {  
  const executeRecaptcha = async (action: string) => {
    return await (window as any).grecaptcha
      .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V3!, {action: action}) 
      .then((token: string) => {
        return token;
      });
  };

  return {
    executeRecaptcha
  };

}

export default useRecaptchaV3;