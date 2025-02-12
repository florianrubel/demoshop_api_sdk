import type { AxiosResponse } from "axios";

export function getPaginationHeaders(res: AxiosResponse): {
    page: number;
    pages: number;
    pageSize: number;
    total: number;
} {
    return {
        page: Number.parseInt(res.headers['pagination.page'], 10),
        pages: Number.parseInt(res.headers['pagination.totalpages'], 10),
        pageSize: Number.parseInt(res.headers['pagination.pagesize'], 10),
        total: Number.parseInt(res.headers['pagination.totalcount'], 10),
    }
}
