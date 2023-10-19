
export default function toRelativeTimeString(date) {
  const now = new Date();
  const diff = now - date;
  const diffTotalSeconds = diff / 1000;
  const diffTotalMinutes = Math.floor(diffTotalSeconds / 60);
  const diffTotalHours = Math.floor(diffTotalMinutes / 60);
  const diffTotalDays = Math.floor(diffTotalHours / 24);
  if (diffTotalMinutes < 60) {
    return `${diffTotalMinutes}분 전`;
  } else if (diffTotalHours < 24) {
    return `${diffTotalHours}시간 전`;
  } else if (diffTotalDays < 30) {
    return `${diffTotalDays}일 전`;
  } else {
    let diffMonths = (now.getFullYear() - date.getFullYear()) * 12;
    diffMonths += now.getMonth() - date.getMonth();
    if (12 <= diffMonths) {
      return `${Math.floor(diffMonths / 12)}년 전`;
    } else {
      return `${diffMonths}개월 전`;
    }
  }
}