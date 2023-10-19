import { Container } from 'react-bootstrap';
import YTIFramePlayer from '../component/YTIFramePlayer';
import style from './VideoInfoPage.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { queryChannel, queryVideo } from '../util/yt';
import toHumanReadableNumberString from '../util/toHumanReadableNumber';


export default function VideoInfoPage({ onError }) {
  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const { id } = useParams();

  useEffect(function () {
    queryVideo(id, function (result) {
      setVideoDetails(result);
    }, onError);
  }, []);

  useEffect(function() {
    if (!videoDetails) {
      return;
    }
    queryChannel(videoDetails.snippet.channelId, function(result) {
      setChannelDetails(result);
    }, onError);
  }, [videoDetails]);

  let title = "로딩 중";
  let description = [<li key={0}>"로딩 중"</li>];
  let channelId = "";
  let publushDate = new Date();
  let viewCount = "로딩 중";
  let likeCount = "로딩 중";
  let channelTitle = "로딩 중";

  if (videoDetails) {
    title = videoDetails.snippet.localized.title;
    description = videoDetails.snippet.localized.description
      .split("\n")
      .map((x, i) => <li key={i}>{x}</li>);
    channelId = videoDetails.snippet.channelId;
    publushDate = new Date(videoDetails.snippet.publishedAt);
    channelTitle = videoDetails.snippet.channelTitle;
    viewCount = toHumanReadableNumberString(videoDetails.statistics.viewCount);
    likeCount = toHumanReadableNumberString(videoDetails.statistics.likeCount);
  }
  
  let channelProfileImage = "";
  if (channelDetails) {
    channelProfileImage = channelDetails.snippet.thumbnails.medium.url;
  }

  return (
    <Container>
      <YTIFramePlayer videoId={id} />
      <div className={style.Description}>
        <h3 className={style.Title}>{title}</h3>
        <a className={style.ChannelInfo} href={`#/channel/${channelId}`}>
          <img className={style.ChannelProfileImage} src={channelProfileImage} />
          <span className={style.ChannelName}>{channelTitle}<span className={style.ChannelSubs}>18만</span></span>
        </a>
        <div className={style.VideoInfo}>
          <div className={style.LikeCount}>
            <p className={style.StatsUpperText}>{likeCount}</p>
            <p className={style.StatsLowerText}>좋아요 수</p>
          </div>
          <div className={style.ViewCount}>
            <p className={style.StatsUpperText}>{viewCount}</p>
            <p className={style.StatsLowerText}>조회수</p>
          </div>
          <div className={style.Date}>
            <p className={style.StatsUpperText}>{publushDate.getMonth() + 1}월 {publushDate.getDate()}일</p>
            <p className={style.StatsLowerText}>{publushDate.getFullYear()}년</p>
          </div>
          <ul className={style.VideoDescription}>
            {description}
          </ul>
        </div>
      </div>
    </Container>
  );
}

