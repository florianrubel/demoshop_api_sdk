import { describe, it, expect } from 'vitest';
import { isBoolean } from '~/helpers/misc';

describe('isBoolean', () => {
    it('should return true for boolean primitives', () => {
        expect(isBoolean(true)).toBe(true);
        expect(isBoolean(false)).toBe(true);
    });

    it('should return true for Boolean objects', () => {
        expect(isBoolean(new Boolean(true))).toBe(true);
        expect(isBoolean(new Boolean(false))).toBe(true);
    });

    it('should return false for string representations of booleans', () => {
        expect(isBoolean('true')).toBe(false);
        expect(isBoolean('false')).toBe(false);
    });

    it('should return false for numbers', () => {
        expect(isBoolean(0)).toBe(false);
        expect(isBoolean(1)).toBe(false);
    });

    it('should return false for null and undefined', () => {
        expect(isBoolean(null)).toBe(false);
        expect(isBoolean(undefined)).toBe(false);
    });

    it('should return false for other non-boolean types', () => {
        expect(isBoolean([])).toBe(false);
        expect(isBoolean({})).toBe(false);
        expect(isBoolean(() => {})).toBe(false);
        expect(isBoolean(new Date())).toBe(false);
    });
});
