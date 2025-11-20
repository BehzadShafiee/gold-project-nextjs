export interface Wallet {
    _id : string,
    userId : string,
    createdAt : Date,
    updatedAt : Date,
    products: [Product],
}

interface Product {
    _id : string;
    productId : string;
    productName : string;
    amount : string;
    unit : string;
    pricePerUnit : string;
    currency : string;
    totalPrice : string;
    addDate : Date;
}