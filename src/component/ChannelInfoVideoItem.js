import { useEffect, useState } from 'react';
import toHumanReadableNumberString from '../util/toHumanReadableNumber';
import toRelativeTimeString from '../util/toRelativeTimeString';
import { queryVideo } from '../util/yt';
import style from './ChannelInfoVideoItem.module.css';

export default function ChannelInfoVideoItem({ videoId, snippet, onError }) {
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(function () {
    queryVideo(videoId, function (result) {
      setVideoDetails(result);
    }, onError);
  }, [videoId]);

  let viewCount = "로딩 중";

  if (videoDetails) {
    viewCount = toHumanReadableNumberString(videoDetails.statistics.viewCount);
  }

  const timeStr = toRelativeTimeString(new Date(snippet.publishTime));
  // 참고: YouTube API는 HTML 이스케이핑이 된 상태로 결과를 반환하기 때문에, React가 추가
  //      이스케이핑을 하지 않도록 dangerouslySetInnerHTML를 사용함. HTTPS이기 때문에
  //      중간에 데이터가 변조되기 어려워 XSS 위험은 없음.
  return (
    <a className={style.Container} href={`#/video/${videoId}`}>
      <div className={style.Thumbnail}>
        <img src={snippet.thumbnails.medium.url}></img>
      </div>
      <div className={style.Description}>
        <h3 className={style.Title} dangerouslySetInnerHTML={{ __html: snippet.title }}></h3>
        <p className={style.DescriptionOther}>조회수 {viewCount}회 • {timeStr}</p>
      </div>
    </a>
  );
}
