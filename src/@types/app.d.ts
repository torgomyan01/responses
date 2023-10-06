declare interface Products {
  image: string;
  title: string;
  list: string[];
  status: string;
  autoSend: boolean;
  reviews: number;
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

declare interface Product {
  info: IReviewItem;
}

declare interface Select {
  selected?: string;
  className?: string;
  items: any[];
}

declare interface DefSwitch {
  status?: boolean;
  onChange?: any;
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
  };
}

interface IConfigurationResponse {
  ConfigurationResponse: {
    infoStore: IStore;
  };
}

declare interface IDefaultInputs {
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  onChange?: any;
  className?: string;
  value?: string | number;
  title?: any;
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
}

declare interface IStore {
  storeId: number;
  configuration: {
    replyConfiguration: {
      rates: {
        '1': IStoreRates;
        '2': IStoreRates;
        '3': IStoreRates;
        '4': IStoreRates;
        '5': IStoreRates;
      };
      version: string;
    };
  };
}

declare interface IStoreRates {
  autoReply: boolean;
  reviewStyle: string;
  blacklistKeywords: string[];
}

declare interface IDefInputs {
  value: string;
  error: boolean;
}

declare interface IStatistics {
  productsWithFeedbacksCount: number;
  unrocessedFeedbacksCount: number;
  unsetResponsesCount: number;
}

declare interface IReviewItem {
  feedback: {
    createdAt: string;
    feedbackId: number;
    message: string;
    product: {
      categoryTitle: string;
      externalProductId: string;
      image: string;
      productId: number;
      sku: string | number;
      title: string;
    };
    productId: number;
    rate: number;
    responses: IResponses[];
    status: number;
    storeId: number;
    userName: string;
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
}
