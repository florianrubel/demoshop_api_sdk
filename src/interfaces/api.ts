export interface PatchOperation {
    op: string;
    path: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
}

export interface PaginationResult {
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
}

export interface ShapingParameters {
    fields?: string;
}

export interface ShapingWithOrderingParameters extends ShapingParameters {
    orderBy?: string;
}

export interface PaginationParameters extends ShapingWithOrderingParameters {
    page?: number;
    pageSize?: number;
}

export interface SearchParameters extends PaginationParameters {
    searchQuery?: string | null;
}

export interface UuidViewModel {
    id: string;
    createdAt: string;
    updatedAt: string | null;
}

export interface ApiError {
    errorCode?: string;
    details?: string;
    conflicts?: Record<string, string []>
}

export interface CustomErrorResponseBody {
    errors: ApiError[];
}

export interface ErrorResponseBody {
    errors?: Record<string, string[]>
    status?: number;
    title?: string;
    traceId?: string;
    type?: string;
}
