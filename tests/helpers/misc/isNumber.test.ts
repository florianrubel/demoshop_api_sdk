import { describe, it, expect } from 'vitest';
import { isNumber } from '~api/helpers/misc';

describe('isNumber', () => {
    it('should return true for finite numbers', () => {
        expect(isNumber(42)).toBe(true);
        expect(isNumber(3.14)).toBe(true);
        expect(isNumber(-1000)).toBe(true);
        expect(isNumber(0)).toBe(true);
    });

    it('should return false for NaN', () => {
        expect(isNumber(NaN)).toBe(false);
    });

    it('should return false for Infinity and -Infinity', () => {
        expect(isNumber(Infinity)).toBe(false);
        expect(isNumber(-Infinity)).toBe(false);
    });

    it('should return false for non-number types', () => {
        expect(isNumber('42')).toBe(false); // String
        expect(isNumber(true)).toBe(false); // Boolean
        expect(isNumber(null)).toBe(false); // Null
        expect(isNumber(undefined)).toBe(false); // Undefined
        expect(isNumber([])).toBe(false); // Array
        expect(isNumber({})).toBe(false); // Object
    });

    it('should return false for functions', () => {
        expect(isNumber(() => {})).toBe(false);
        expect(isNumber(function test() {})).toBe(false);
    });

    it('should return false for instances of other objects', () => {
        expect(isNumber(new Date())).toBe(false); // Date
        expect(isNumber(new Number(42))).toBe(false); // Number object
    });
});
