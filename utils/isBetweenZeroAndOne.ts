export default function (value: any): boolean {
    let toNumber: number;
    if (typeof value === 'number') {
        toNumber = value;
    } else if (typeof value === 'string') {
        const temp = parseInt(value);
        if (Number.isNaN(temp)) {
            return false;
        }
        toNumber = temp;
    } else {
        return false;
    }
    if (toNumber >= 0 || toNumber <= 1) return true;
    return false;
}
