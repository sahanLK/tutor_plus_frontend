
export function getFormattedDate() {
    const date = new Date();
    const dayStr = date.toLocaleString('en-us', {weekday: 'long'});
    const monthStr = date.toLocaleString('en-us', {month: 'short'});
    return `${dayStr}, ${date.getDate()} ${monthStr} ${date.getFullYear()}`;
}