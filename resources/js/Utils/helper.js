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