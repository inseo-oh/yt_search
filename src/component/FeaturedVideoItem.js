import { useEffect, useState } from 'react';
import { queryChannel, queryVideo } from '../util/yt';
import toRelativeTimeString from '../util/toRelativeTimeString';
import style from './FeaturedVideoItem.module.css';
import toHumanReadableNumberString from '../util/toHumanReadableNumber';

export default function FeaturedVideoItem({ videoId, snippet, onError }) {
  // console.log(snippet);
  const timeStr = toRelativeTimeString(new Date(snippet.publishTime));
  const [channelThumbnailUrl, setChannelThumbnailUrl] = useState("");
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(function () {
    queryChannel(snippet.channelId, function (result) {
      setChannelThumbnailUrl(result.snippet.thumbnails.medium.url);
    }, onError);
  }, []);

  useEffect(function () {
    queryVideo(videoId, function (result) {
      setVideoDetails(result);
    }, onError);
  }, []);

  let viewCount = "로딩 중";

  if (videoDetails) {
    viewCount = toHumanReadableNumberString(videoDetails.statistics.viewCount);
  }

  // 참고: YouTube API는 HTML 이스케이핑이 된 상태로 결과를 반환하기 때문에, React가 추가
  //      이스케이핑을 하지 않도록 dangerouslySetInnerHTML를 사용함. HTTPS이기 때문에
  //      중간에 데이터가 변조되기 어려워 XSS 위험은 없음.
  return (
    <a className={style.Container} href={`${process.env.PUBLIC_URL}/video/${videoId}`}>
      <div className={style.Thumbnail}>
        <img src={snippet.thumbnails.medium.url}></img>
      </div>
      <div className={style.Description}>
        <div className={style.DescriptionLeft}>
          <img className={style.ChannelProfileImage} src={channelThumbnailUrl}></img>
        </div>
        <div className={style.DescriptionRight}>
          <h3 className={style.VideoTitle} dangerouslySetInnerHTML={{ __html: snippet.title }}></h3>
          <p className={style.ViewCountAndTime}>{snippet.channelTitle} • 조회수 {viewCount}회 • {timeStr}</p>
        </div>
      </div>
    </a>
  );
}
