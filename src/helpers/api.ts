// eslint-disable-next-line import/prefer-default-export
export function getCleanedQueryString(params?: unknown): string {
    if (!params) return '';

    const cleaned: Record<string, string> = {};

    Object.keys(params as Record<string, unknown>).forEach((key) => {
        if ((params as Record<string, unknown>)[key]) {
            cleaned[key] = (params as Record<string, unknown>)[key] as string;
        }
    });

    return new URLSearchParams(cleaned).toString();
}
