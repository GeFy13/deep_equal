/**
 * Performs deep comparison between two values to determine if they are equivalent
 * @param {*} obj1 - First element to compare
 * @param {*} obj2 - Second element to compare
 * @returns {boolean} - True if values of elements are deeply equal, false otherwise
 */
function deepEqual(obj1, obj2) {
    // Strict equality check for primitive types and identical references
    if (obj1 === obj2) {
        return true;
    }

    // Handle null or undefined cases
    if (obj1 == null || obj2 == null) {
        return false;
    }

    // Handle different types
    if (typeof obj1 !== typeof obj2) {
        return false;
    }

    // Handle Date objects
    if (obj1 instanceof Date && obj2 instanceof Date) {
        return obj1.getTime() === obj2.getTime();
    }

    // Handle RegExp objects
    if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
        return obj1.toString() === obj2.toString();
    }

    // Handle primitive wrapper objects (Number, String, Boolean)
    if (typeof obj1 !== 'object' && typeof obj2 !== 'object') {
        return obj1 === obj2;
    }

    // Handle maps 
    if (obj1 instanceof Map && obj2 instanceof Map) {
        const keys1 = Array.from(obj1.keys())
        const keys2 = Array.from(obj2.keys())

        if (!deepEqual(keys1, keys2)) {
            return false;
        }

        const values1 = Array.from(obj1.values())
        const values2 = Array.from(obj2.values())

        if (!deepEqual(values1, values2)) {
            return false;
        }
    }

    // Handle sets
    if (obj1 instanceof Set && obj2 instanceof Set) {
        const values1 = Array.from(obj1)
        const values2 = Array.from(obj2)

        if (!deepEqual(values1, values2)) {
            return false;
        }
    }

    // Handle arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }

        for (let i = 0; i < obj1.length; i++) {
            if (!deepEqual(obj1[i], obj2[i])) {
                return false;
            }
        }
    }

    // Handle cases where one is array and other is not
    if (Array.isArray(obj1) !== Array.isArray(obj2)) {
        return false;
    }

    // Handle objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    // Check if number of properties is different
    if (keys1.length !== keys2.length) {
        return false;
    }
    
    // Check if all keys in obj1 exist in obj2
    for (const key of keys1) {
        if (!keys2.includes(key)) {
            return false;
        }
    }
    
    // Recursively compare values for each key
    for (const key of keys1) {
        if ((obj1[key] === obj1) && (obj2[key] === obj2)) {
            continue;
        }
        
        if (!deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    // Get symbol properties
    const symkeys1 = Object.getOwnPropertySymbols(obj1)
    const symkeys2 = Object.getOwnPropertySymbols(obj2)

    // Check if number of symbol properties is different
    if (symkeys1.length !== symkeys2.length) {
        return false;
    }
    
    // Check if all symkeys in obj1 exist in obj2
    for (const key of symkeys1) {
        if (!symkeys2.includes(key)) {
            return false;
        }
    }
    
    // Recursively compare values for each symkey
    for (const key of symkeys1) {
        if ((obj1[key] === obj1) && (obj2[key] === obj2)) {
            continue;
        }
        
        if (!deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

module.exports = deepEqual;