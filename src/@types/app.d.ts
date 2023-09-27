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
  info: Products;
}

declare interface DefSwitch {
  status?: boolean;
  onChange?: any;
  className?: string;
}

declare interface StatusButton {
  status: string;
  text: string;
}

declare interface SortingSelect {
  items: string[];
}

declare interface IStores {
  storeId: number;
  storeType: string;
  title: string;
  apiToken: string;
}

interface IUserInfo {
  UserInfo: {
    userId: number | string;
    username: string;
    email: string;
    stores: IStores[];
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
  title: string;
}
