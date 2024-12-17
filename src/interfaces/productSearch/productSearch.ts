export interface ProductSearchItem {
    id: string;
    productId: string;
    name: string;
    description: Record<string, string>;
    listPicture: string;
    pictures: string[];
    priceInCents: number;
    booleanProperties: Record<string, boolean>;
    numericProperties: Record<string, number>;
    stringProperties: Record<string, string>;
    colors: string[];
    sizes: string[];
}

export interface NumericRange {
    min?: number;
    max?: number;
}

export interface ProductSearchRequest {
    page?: number;
    distinct?: boolean;
    searchQuery?: string;
    stringFacets?: Record<string, string[]>;
    numericFacets?: Record<string, NumericRange>;
    booleanFacets?: Record<string, boolean>;
}

export interface ProductSearchResult {
    booleanFacets: Record<string, Record<string, number>>;
    numericFacets: Record<string, Record<string, number>>;
    stringFacets: Record<string, Record<string, number>>;
    priceInCents: NumericRange;
    products: ProductSearchItem[];
}