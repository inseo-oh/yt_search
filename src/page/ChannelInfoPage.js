import style from './ChannelInfoPage.module.css';
import ChannelInfoVideoItem from '../component/ChannelInfoVideoItem';
import { useEffect, useState } from 'react';
import { queryChannel, queryChannelRecentVideos } from '../util/yt';
import { useParams } from 'react-router-dom';
import toHumanReadableNumberString from '../util/toHumanReadableNumber';
import PageControls from '../component/PageControls';
import { Container } from 'react-bootstrap';

export default function ChannelInfoPage({ onError }) {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [desiredPageToken, setDesiredPageToken] = useState(null);
  useEffect(function () {
    queryChannel(id, function (result) {
      setDetails(result);
    }, onError);
  }, []);
  useEffect(function () {
    queryChannelRecentVideos(id, desiredPageToken, function (result) {
      setSearchResult(result);
    }, onError);
  }, [desiredPageToken]);

  function onPrevPagePressed() {
    setDesiredPageToken(searchResult.prevPageToken);
    setCurrentPage(currentPage - 1);
  }
  function onNextPagePressed() {
    setDesiredPageToken(searchResult.nextPageToken);
    setCurrentPage(currentPage + 1);
  }

  let channelName = "로딩 중";
  let channelId = "로딩 중";
  let subs = "로딩 중";
  let videoCount = "로딩 중";
  let channelImage = "";
  let description = "로딩 중";
  let channelBannerImage = "";
  let pageCount = 0;
  if (details != null) {
    channelName = details.snippet.localized.title;
    description = details.snippet.localized.description;
    channelId = details.snippet.customUrl;
    channelImage = details.snippet.thumbnails.medium.url;
    if (details.statistics.hiddenSubscriberCount) {
      subs = "구독자수 비공개";
    } else {
      subs = toHumanReadableNumberString(details.statistics.subscriberCount) + "명";
    }
    videoCount = toHumanReadableNumberString(details.statistics.videoCount) + "개";
    // https://stackoverflow.com/questions/66413441/how-to-get-youtube-channel-banner-using-youtube-api-with-the-same-resolution
    channelBannerImage = details.brandingSettings.image.bannerExternalUrl + "=w1920";
  }

  let listContents = [];
  if (searchResult != null) {
    for (const entry of searchResult.items) {
      switch (entry.id.kind) {
        case "youtube#video":
          listContents.push(<li key={entry.id.videoId}>
            <ChannelInfoVideoItem videoId={entry.id.videoId} snippet={entry.snippet} />
          </li>);
          break;
      }
    }
    pageCount = Math.floor(searchResult.pageInfo.totalResults / searchResult.pageInfo.resultsPerPage);
    if ((searchResult.pageInfo.totalResults % searchResult.pageInfo.resultsPerPage) != 0) {
      ++pageCount;
    }
  }

  const bannerStyle = {
    backgroundImage: `url(${channelBannerImage})`
  };

  return (
    <Container className={style.Container}>
      <div className={style.ChannelArt} style={bannerStyle}>
      </div>
      <div className={style.ChannelInfoAndProfileImage}>
        <div className={style.ProfileImage}>
          <img src={channelImage} ></img>
        </div>
        <div className={style.ChannelInfo}>
          <h3 className={style.ChannelName}>{channelName}</h3>
          <p className={style.ChannelIdAndStats}>{channelId}&nbsp;&nbsp;구독자 {subs}&nbsp;&nbsp;동영상 {videoCount}</p>
          <h3 className={style.Description}>{description}</h3>
          <a className={style.VisitLink} href={`https://www.youtube.com/channel/${id}`} target='_blank'>YouTube 채널 방문하기</a>
        </div>
      </div>
      <ul className={style.VideoList}>
        {listContents}
      </ul>
      <PageControls currentPage={currentPage} pageCount={pageCount} onPrevPagePressed={onPrevPagePressed} onNextPagePressed={onNextPagePressed} />
    </Container>
  );
}

