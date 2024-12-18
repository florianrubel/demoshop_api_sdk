import { describe, it, expect } from 'vitest';
import { isObject } from '~/helpers/misc';

describe('isObject', () => {
    it('should return true for plain objects', () => {
        expect(isObject({})).toBe(true);
        expect(isObject({ key: 'value' })).toBe(true);
    });

    it('should return false for arrays', () => {
        expect(isObject([])).toBe(false);
        expect(isObject([1, 2, 3])).toBe(false);
    });

    it('should return false for null', () => {
        expect(isObject(null)).toBe(false);
    });

    it('should return false for primitive types', () => {
        expect(isObject(42)).toBe(false);
        expect(isObject('string')).toBe(false);
        expect(isObject(true)).toBe(false);
        expect(isObject(undefined)).toBe(false);
    });

    it('should return false for functions', () => {
        expect(isObject(() => {})).toBe(false);
        expect(isObject(function test() {})).toBe(false);
    });

    it('should return true for objects created with Object.create(null)', () => {
        const obj = Object.create(null);
        expect(isObject(obj)).toBe(true);
    });

    it('should return false for instances of non-plain objects (like Date)', () => {
        expect(isObject(new Date())).toBe(false);
    });
});
