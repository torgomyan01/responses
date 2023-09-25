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
}

declare interface StatusButton {
  status: string;
  text: string;
}
