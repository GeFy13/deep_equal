const deepEqual = require('../src/DeepEqual');

describe('deepEqual function tests', () => {
    
    test('should return true for identical primitive values', () => {
        expect(deepEqual(5, 5)).toBe(true);
        expect(deepEqual('hello', 'hello')).toBe(true);
        expect(deepEqual(true, true)).toBe(true);
        expect(deepEqual(null, null)).toBe(true);
        expect(deepEqual(undefined, undefined)).toBe(true);
    });

    test('should return false for different primitive values', () => {
        expect(deepEqual(5, 10)).toBe(false);
        expect(deepEqual('hello', 'world')).toBe(false);
        expect(deepEqual(true, false)).toBe(false);
        expect(deepEqual(5, '5')).toBe(false);
        expect(deepEqual(null, undefined)).toBe(false);
    });

    test('should correctly compare simple objects', () => {
        const obj1 = { name: 'John', age: 30 };
        const obj2 = { name: 'John', age: 30 };
        const obj3 = { name: 'Jane', age: 25 };
        const obj4 = { name: 'John', age: 30, city: 'NY' };

        expect(deepEqual(obj1, obj2)).toBe(true);
        expect(deepEqual(obj1, obj3)).toBe(false);
        expect(deepEqual(obj1, obj4)).toBe(false);
    });

    test('should correctly compare nested objects', () => {
        const obj1 = {
            name: 'John',
            address: {
                city: 'New York',
                zip: 10001,
                coordinates: { lat: 40.7128, lng: -74.0060 }
            }
        };
        const obj2 = {
            name: 'John',
            address: {
                city: 'New York',
                zip: 10001,
                coordinates: { lat: 40.7128, lng: -74.0060 }
            }
        };
        const obj3 = {
            name: 'John',
            address: {
                city: 'New York',
                zip: 10001,
                coordinates: { lat: 40.7128, lng: -74.0061 }
            }
        };

        expect(deepEqual(obj1, obj2)).toBe(true);
        expect(deepEqual(obj1, obj3)).toBe(false);
    });

    test('should correctly compare arrays', () => {
        expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
        expect(deepEqual([1, 2, 3], [1, 2])).toBe(false);
        expect(deepEqual([], [])).toBe(true);
        
        // Nested arrays
        expect(deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
        expect(deepEqual([1, [2, 3]], [1, [2, 4]])).toBe(false);
    });

    test('should correctly compare arrays of objects', () => {
        const arr1 = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
        const arr2 = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
        const arr3 = [{ id: 1, name: 'John' }, { id: 2, name: 'Bob' }];

        expect(deepEqual(arr1, arr2)).toBe(true);
        expect(deepEqual(arr1, arr3)).toBe(false);
    });

    test('should correctly compare Date objects', () => {
        const date1 = new Date(2023, 0, 1);
        const date2 = new Date(2023, 0, 1);
        const date3 = new Date(2023, 0, 2);

        expect(deepEqual(date1, date2)).toBe(true);
        expect(deepEqual(date1, date3)).toBe(false);
        expect(deepEqual(date1, '2023-01-01')).toBe(false);
    });

    test('should correctly compare RegExp objects', () => {
        expect(deepEqual(/abc/g, /abc/g)).toBe(true);
        expect(deepEqual(/abc/g, /abc/i)).toBe(false);
        expect(deepEqual(/abc/g, 'abc')).toBe(false);
    });

    test('should correctly compare objects with circular references', () => {
        const obj1 = { name: 'John' };
        const obj2 = { name: 'John' };
        obj1.self = obj1;
        obj2.self = obj2;

        // This test might cause stack overflow in simple recursive implementation
        // In a production environment, you might need to handle circular references
        expect(() => deepEqual(obj1, obj2)).not.toThrow();
    });

    test('should correctly compare objects with different key orders', () => {
        const obj1 = { a: 1, b: 2, c: 3 };
        const obj2 = { b: 2, c: 3, a: 1 };

        expect(deepEqual(obj1, obj2)).toBe(true);
    });

    test('should correctly compare objects with special values', () => {
        expect(deepEqual(NaN, NaN)).toBe(false); // NaN is not equal to itself in strict equality
        expect(deepEqual(Infinity, Infinity)).toBe(true);
        expect(deepEqual(-Infinity, -Infinity)).toBe(true);
        expect(deepEqual(0, -0)).toBe(true); // 0 and -0 are equal in strict equality
    });

    test('should correctly compare objects with Symbol properties', () => {
        const sym = Symbol("test");
        const obj1 = { [sym]: 'value' };
        const obj2 = { [sym]: 'value' };
        const obj3 = { [Symbol("test")]: 'value' };

        expect(deepEqual(obj1, obj2)).toBe(true);
        expect(deepEqual(obj1, obj3)).toBe(false);
    });

    test('should correctly compare Map objects', () => {
        const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
        const map2 = new Map([['key1', 'value1'], ['key2', 'value2']]);
        const map3 = new Map([['key1', 'value1'], ['key2', 'value3']]);

        expect(deepEqual(map1, map2)).toBe(true);
        expect(deepEqual(map1, map3)).toBe(false);
    });

    test('should correctly compare Set objects', () => {
        const set1 = new Set([1, 2, 3]);
        const set2 = new Set([1, 2, 3]);
        const set3 = new Set([1, 2, 4]);

        expect(deepEqual(set1, set2)).toBe(true);
        expect(deepEqual(set1, set3)).toBe(false);
    });
});