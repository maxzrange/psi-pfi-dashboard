import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export const generateEncryption = (data: string): string => {
  const encryped = CryptoJS.AES.encrypt(data, SECRET_KEY!);

  return encryped.toString();
};

export const generateDecryption = (data: string): string => {
  const decrypted = CryptoJS.AES.decrypt(data, SECRET_KEY!);

  return decrypted.toString(CryptoJS.enc.Utf8);
};
