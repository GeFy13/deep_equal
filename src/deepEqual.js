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
        return true;
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

    return true;
}

module.exports = deepEqual;