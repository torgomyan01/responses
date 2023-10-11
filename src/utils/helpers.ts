import { LocalStorageKeys, STORES_MARKETPLACE } from './const';

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

export const setNumberChangeRate = (number: number) => {
  switch (number) {
    case 1:
      return '1';
    case 2:
      return '2';
    case 3:
      return '3';
    case 4:
      return '4';
    case 5:
      return '5';
    default:
      return 1;
  }
};

export const changeProductSettings = (
  key: 'blacklistKeywords' | 'autoReply' | 'reviewStyle' | 'blacklistKeywords-remove',
  productSettings: IStore | null,
  index: number,
  value: any,
  callBack: (result: IStore) => void
) => {
  if (productSettings) {
    const _productSettings = { ...productSettings };
    const configuration = { ..._productSettings.configuration };
    const replyConfiguration = { ...configuration.replyConfiguration };
    const rates = {
      ...replyConfiguration.rates
    };

    const rate = {
      ...rates[setNumberChangeRate(index)]
    };
    if (key === 'blacklistKeywords') {
      rate.blacklistKeywords = [...rate.blacklistKeywords, value];
    }
    if (key === 'blacklistKeywords-remove') {
      rate.blacklistKeywords = [...rate.blacklistKeywords].filter((item) => item !== value);
    }
    if (key === 'autoReply') {
      rate.autoReply = value;
    }
    if (key === 'reviewStyle') {
      rate.reviewStyle = value;
    }
    rates[setNumberChangeRate(index)] = rate;

    replyConfiguration.rates = rates;
    configuration.replyConfiguration = replyConfiguration;
    _productSettings.configuration = configuration;
    callBack(_productSettings);
  }
};
