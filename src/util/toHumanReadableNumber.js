export default function toHumanReadableNumberString(n) {
  if (n > 100000000) {
    return `${Math.floor(n / 100000000)}억`;
  }
  if (n > 10000) {
    return `${Math.floor(n / 10000)}만`;
  }
  if (n > 1000) {
    return `${Math.floor(n / 1000)}천`;
  }
  return `${n}`;
}
