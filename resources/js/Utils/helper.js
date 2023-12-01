/**
 * The `npwpFormat` function formats a string or number into the Indonesian NPWP (Nomor Pokok Wajib
 * Pajak) format.
 * @param value - The `value` parameter is the input value that needs to be formatted as an NPWP (Nomor
 * Pokok Wajib Pajak) number.
 * @returns a formatted NPWP (Nomor Pokok Wajib Pajak) value.
 */
export const npwpFormat = (value) => {
    if (typeof value === 'string') {
        return value.replace(/(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})/, '$1.$2.$3.$4-$5.$6');
    } else {
        let string = value.toString();
        return string.replace(/(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})/, '$1.$2.$3.$4-$5.$6');
    }
}

/**
 * The function `convertMb` converts the total size in bytes to megabytes.
 * @param {Number} totalSizeBytes - The total size of a file or data in bytes.
 * @returns the total size in megabytes (MB) by dividing the total size in bytes by 1024 raised to the
 * power of 2.
 */
export const convertMb = (totalSizeBytes) => {
    return totalSizeBytes / Math.pow(1024,2);
}

/**
 * The `sliceArray` function takes an array and an index as parameters and returns a new array
 * containing the elements starting from the specified index.
 * @param {Array} array - The `array` parameter is the array that you want to slice. It is the array from which
 * you want to extract a portion of elements.
 * @param {any} index - The index parameter is the starting index from which the array should be sliced.
 * @returns The function `sliceArray` returns a new array containing the elements from the original
 * `array` starting from the `index` specified.
 */
export const sliceArray = (array, index) => {
    return array.splice(index);
};

export const userHasRoles = (userRoles, roles) => {
    let array = Array.isArray(userRoles);
    if (array) {
        for (let i = 0; i < userRoles.length; i++) {
            if (userRoles[i].role.name !== roles) {
                continue;
            } else {
                return true;
            }
        }
    }
};