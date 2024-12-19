import { describe, it, expect } from 'vitest';
import { isArray } from '~api/helpers/misc';

describe('isArray', () => {
    it('should return true for empty arrays', () => {
        expect(isArray([])).toBe(true);
    });

    it('should return true for arrays with elements', () => {
        expect(isArray([1, 2, 3])).toBe(true);
        expect(isArray(['a', 'b', 'c'])).toBe(true);
        expect(isArray([true, false])).toBe(true);
    });

    it('should return true for nested arrays', () => {
        expect(isArray([[1, 2], [3, 4]])).toBe(true);
        expect(isArray([[], []])).toBe(true);
    });

    it('should return false for objects', () => {
        expect(isArray({})).toBe(false);
        expect(isArray({ key: 'value' })).toBe(false);
    });

    it('should return false for primitive values', () => {
        expect(isArray(42)).toBe(false);
        expect(isArray('string')).toBe(false);
        expect(isArray(true)).toBe(false);
        expect(isArray(null)).toBe(false);
        expect(isArray(undefined)).toBe(false);
    });

    it('should return false for other non-array types', () => {
        expect(isArray(new Date())).toBe(false);
        expect(isArray(() => {})).toBe(false);
        expect(isArray(Buffer.from([]))).toBe(false);
    });
});
