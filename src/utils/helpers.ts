import { STORES_MARKETPLACE } from './const';

export const RandomKey = (length = 5) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const ChangeDefInputValue = (value: string, error: boolean) => {
  return {
    value,
    error
  };
};

export const checkNumberOfString = (str: string) => /\d/.test(str);

export const GetStoreImage = (type: string | undefined) => {
  const res = STORES_MARKETPLACE.find((_type) => _type.name === type);
  return res ? res.image : '';
};

export const CreatePageCount = (count: number, pageCount: number) => {
  const remaining = count % pageCount;
  const calcPages = count / pageCount;
  return remaining ? Math.ceil(calcPages) : calcPages;
};
