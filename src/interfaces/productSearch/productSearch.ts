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
    stringFilters?: Record<string, string[]>;
    numericFilters?: Record<string, NumericRange>;
    booleanFilters?: Record<string, boolean[]>;
}

export interface BooleanFacet {
    false: number;
    true: number;
}

export type NumericFacet = Record<string, number>;

export type StringFacet = Record<string, number>;

export interface ProductSearchResult {
    booleanFacets: Record<string, BooleanFacet>;
    numericFacets: Record<string, NumericFacet>;
    stringFacets: Record<string, StringFacet>;
    priceInCents: NumericRange;
    numericFacetsRanges: Record<string, NumericRange>;
    products: ProductSearchItem[];
    stringFilters?: Record<string, string[]>;
    numericFilters?: Record<string, NumericRange>;
    booleanFilters?: Record<string, boolean[]>;
}
