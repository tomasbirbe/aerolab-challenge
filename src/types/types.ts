export interface Product {
  category: string;
  cost: number;
  img: {
    hdUrl: string;
    url: string;
  };
  name: string;
  _id: string;
}

export interface User {
  createDate: string;
  name: string;
  points: number;
  redeemHistory: Product[];
  __v: number;
  _id: string;
}
