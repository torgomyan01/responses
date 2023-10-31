type MessengerType = 'telegram' | 'whatsapp' | 'viber';
type ReplyRateType = '1' | '2' | '3' | '4' | '5';
type ReviewStyleType = 'formal' | 'friendly';

declare type ReplySignatureType = 'default' | 'storeName' | 'brandName' | 'custom';
declare type ReplyModeType = 'auto' | 'semi-auto' | 'manual';

declare interface IStaticsProduct {
  image: string;
  isActive: boolean;
  productId: number;
  sku: number | string;
  storeId: number;
  title: string;
  vendorCode: string;
  updatedAt: Date;
  createdAt: Date;
  externalProductId: string;
}

declare interface IStatics {
  avgRate: number;
  feedbacksCount: number;
  processedFeedbacksCount: number;
  unrocessedFeedbacksCount: number;
  productId: number;
  ratesStatisctics: { 1: number; 2: number; 3: number; 4: number; 5: number };
}

declare interface ProductReplyMode {
  storeId: number;
  productId: number;
  replyMode: ReplyModeType;
}

declare interface IStaticsProducts {
  product: IStaticsProduct;
  statistics: IStatics;
  replyMode: ProductReplyMode;
}

declare interface PaginationCount {
  array: number[];
  active: number;
  onChange: any;
}

declare interface MainTemplate {
  children: any;
  className: string;
}

declare interface Select {
  selected?: string;
  className?: string;
  items: any[];
  onChange?: (value: any) => void;
  keys?: any[];
}

declare interface DefSwitch {
  status?: boolean;
  onChangeProps?: (changeValue: boolean) => void;
  className?: string;
  checked?: boolean;
}

declare interface StatusButton {
  status: number;
}

declare interface SortingSelect {
  items: string[];
}

declare interface IStores {
  isAuthorized?: boolean;
  storeId?: number;
  storeType: string;
  title: string;
  apiToken?: string;
}

interface IUserInfo {
  UserInfo: {
    userId: number | string;
    username: string;
    email: string;
    stores: IStores[];
    activeStore: IStores | null;
    userAuth: boolean;
    selectedProduct: IStaticsProducts | null;
  };
}

declare interface IDefaultInputs {
  error?: boolean | string;
  errorMessage?: string;
  placeholder?: string;
  onChange?: any;
  className?: string;
  value?: string | number;
  title?: any;
  disabled?: boolean;
  quotation?:
    | {
        title: string;
        text: string;
      }
    | undefined;
  inpProps?: any;
}

declare interface IInterrogative {
  text: string;
  title: string;
  className?: string;
}

declare interface ISettings {
  change: any;
}

declare interface IPayments {
  change: any;
}

declare interface ICreateProject {
  change: any;
}

declare interface IProjectSettingsWrapper {
  index: number;
  title: string;
  item: any;
  onChange: any;
  changeAutoReply: (checked: boolean, keyNumber: number) => void;
  removeTalentItem: (array: string[], keyNumber: number) => void;
  inputTitle?: string;
}

declare interface IAlertSite {
  AlertSite: {
    open: {
      status: any;
      go: boolean;
    };
    vertical: string;
    horizontal: string;
    message: string;
  };
}

declare interface IStore {
  storeId: number;
  configuration: {
    replyConfiguration: {
      rates: {
        [key in ReplyRateType]: IStoreRates;
      };
      signature: {
        customText: string;
      };
      version: string;
    };
  };
}

interface IProductReplyConfiguration {
  storeId: number;
  productId: string | number;
  isActive: false;
  configuration: {
    replyConfiguration: {
      rates: {
        [key in ReplyRateType]: IStoreRates;
      };
      version: string;
      signature: {
        type: ReplySignatureType;
        customText: string | null;
      };
      recommendations: {
        isActive: boolean;
        sku: string | null;
        message: string | null;
        keywords: string[];
        useKeywords: boolean;
      };
      useProductNameInReply: boolean;
      replyToOldFeedbacks: boolean;
    };
  };
}

declare interface IStoreRates {
  autoReply: boolean;
  reviewStyle: ReviewStyleType;
  blacklistKeywords: string[];
}

declare interface IDefInputs {
  value: string;
  error: boolean | string;
}

declare interface IStatistics {
  productsWithFeedbacksCount: number;
  unrocessedFeedbacksCount: number;
  unsetResponsesCount: number;
}

declare interface IReviewItem {
  feedbackId: number;
  productId: number;
  storeId: number;

  rate: number;
  responses?: IResponses[];
  response: IResponses | null;
  status: number;

  userName: string;

  createdAt: string;

  message: string;
  product: {
    categoryTitle: string;
    externalProductId: string;
    image: string;
    productId: number;
    sku: string;
    title: string;
    vendorCode: string;
  };
}

declare interface IResponses {
  createdAt: string;
  feedbackId: number;
  message: string;
  publishedAt: string;
  responseId: number;
  status: number;
  responseType?: number;
  approveType?: number;
}

declare interface IUserProfile {
  fio: {
    firstname: string;
    lastname: string;
    middlename: string;
  };
  company: {
    name: string;
    inn: string;
  };
  phone: string;
  email: string;
  messenger: MessengerType;
}
