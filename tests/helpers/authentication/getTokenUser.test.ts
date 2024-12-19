import { describe, it, expect } from 'vitest';
import { getTokenUser } from '~api/helpers/authentication'; // Update the import path

describe('getTokenUser', () => {
    it('should decode a valid JWT token and return the payload', () => {
        const payload = { id: '123', name: 'John Doe', email: 'john.doe@example.com' };
        const base64Payload = btoa(JSON.stringify(payload));
        const mockToken = `header.${base64Payload}.signature`;

        const result = getTokenUser(mockToken);

        expect(result).toEqual(payload);
    });

    it('should throw an error if the token does not have 3 parts', () => {
        const invalidToken = 'header.payload';

        expect(() => getTokenUser(invalidToken)).toThrowError('Invalid JWT token');
    });

    it('should decode a payload with special characters', () => {
        const payload = { id: '123', name: 'John Doe', email: 'john.doe+test@example.com' };
        const base64Payload = btoa(JSON.stringify(payload));
        const mockToken = `header.${base64Payload}.signature`;

        const result = getTokenUser(mockToken);

        expect(result).toEqual(payload);
    });

    it('should throw an error if the payload is not valid JSON', () => {
        const invalidPayload = btoa('invalid-json');
        const mockToken = `header.${invalidPayload}.signature`;

        expect(() => getTokenUser(mockToken)).toThrowError();
    });
});
