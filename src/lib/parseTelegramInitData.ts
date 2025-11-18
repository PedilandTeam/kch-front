export function parseInitData(initDataRaw: string) {
  const params = new URLSearchParams(initDataRaw);
  const data: any = {};

  for (const [key, value] of params.entries()) {
    try {
      data[key] = JSON.parse(value);
    } catch {
      if (/^\d+$/.test(value)) {
        data[key] = Number(value);
      } else {
        data[key] = value;
      }
    }
  }

  return data;
}
