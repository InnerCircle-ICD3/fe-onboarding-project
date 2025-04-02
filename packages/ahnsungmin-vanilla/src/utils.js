export function formatMoney(amount) {
    if (amount === 0) return '0';
    return amount.toLocaleString();
}

export function getKoreanParticle(str) {
    const charCode = str.charCodeAt(str.length - 1);
    const hasFinalConsonant = (charCode - 0xAC00) % 28 > 0;
    return hasFinalConsonant ? '을' : '를';
} 