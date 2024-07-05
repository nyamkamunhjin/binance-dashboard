export interface ProductsResult {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface Connection {
    name: string;
    url: string;
    symbol: string;
}

export interface IHistory {
    symbol: string
    id: number
    orderId: number
    side: string
    price: string
    qty: string
    realizedPnl: string
    quoteQty: string
    commission: string
    commissionAsset: string
    time: number
    positionSide: string
    maker: boolean
    buyer: boolean
  }
  

export interface IPosition {
    accountAlias: string;
    asset: string;
    balance: string;
    crossWalletBalance: string;
    crossUnPnl: string;
    availableBalance: string;
    maxWithdrawAmount: string;
    marginAvailable: boolean;
    updateTime: number;
}
