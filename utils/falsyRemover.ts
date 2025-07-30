

const falsyRemover = (obj: { [x: string]: any; title?: string; unitId?: string; categoryId?: string; countryId?: string; cityId?: string; socials?: { instagram?: string | undefined; facebook?: string | undefined; youtube?: string | undefined; telegram?: string | undefined; linkedin?: string | undefined; website?: string | undefined; } | undefined; contact?: { phone?: string | undefined; telephone?: string | undefined; email?: string | undefined; whatsapp?: string | undefined; } | undefined; }) => {
    return Object.keys(obj).reduce((acc, key) => {
      if (obj[key] && typeof obj[key] === 'object') {
        const nested = falsyRemover(obj[key]);
        if (Object.keys(nested).length > 0) {
          //@ts-ignore
          acc[key] = nested;
        }
      } else if (obj[key]) {
          //@ts-ignore
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  };
  
  export default falsyRemover