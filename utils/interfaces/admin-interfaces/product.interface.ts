export interface Product {
    _id: string;
    name: string;
    code: string;
    category: string;
    standard: number;
    related_order: string;
    from_customer: number;
    weightOrNumber: string;
    unit: string;
    createdAt: string;
    details: ProductDetails;
    prices: ProductPrice[];
    priceTolerance: number;
}

export interface ProductAttribute {
    _id?: string;
    key: string;
    value: number;
    unit: string;
    calculateOnPrice: boolean;
    operator: string;
}

export interface ProductDetails {
    _id: string;
    product: string;
    attributes: ProductAttribute[];
    createdAt: string;
}

export interface ProductPrice {
    _id: string;
    product: string;
    basePrice: number;
    priceUnit: string;
    currency: string;
    calculatedPrice: number;
    createdAt: string;
}
