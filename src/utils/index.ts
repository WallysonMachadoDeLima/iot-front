export * from './clear-data';
export * from './controler-api';
export * from './format-data';
export * from './mask';
export * from './storage';
export * from './validation';




export const findFirstKeyWithValue = (
    obj: Record<string, any>,
    optionalKeys: string[] = [],
): string | null => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];

            // Skip if key is optional
            if (optionalKeys.includes(key)) {
                continue;
            }

            // Check nested objects recursively
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                const nestedKey = findFirstKeyWithValue(value, optionalKeys);
                if (nestedKey !== null) {
                    return nestedKey;
                }
            }

            // Check if current key is empty (required field not filled)
            if (value === null || value === undefined || value === '') {
                return `${key} é obrigatório`;
            }
        }
    }
    return null;
};

