import { useEffect, useState } from 'react';
import style from './SearchChannelItem.module.css';
import { queryChannel } from '../util/yt';
import toHumanReadableNumberString from '../util/toHumanReadableNumber';


export default function SearchChannelItem({ snippet, onError }) {
  const [details, setDetails] = useState(null);
  useEffect(function () {
    queryChannel(snippet.channelId, function (result) {
      setDetails(result);
    }, onError);
  }, []);
  let channelId = "로딩 중";
  let subs = "로딩 중";
  let channelImage = "";
  let description = "로딩 중";
  if (details != null) {
    channelId = details.snippet.customUrl;
    channelImage = details.snippet.thumbnails.medium.url;
    description = details.snippet.description;
    if (details.statistics.hiddenSubscriberCount) {
      subs = "구독자수 비공개";
    } else {
      subs = "구독자 " + toHumanReadableNumberString(details.statistics.subscriberCount) + "명";
    }
  }
  return (
    <a className={style.Container} href={`/channel/${snippet.channelId}`}>
      <div className={style.ChannelImage}>
        <img src={channelImage}></img>
      </div>
      <div className={style.ChannelInfo}>
        <h3 className={style.ChannelName}>{snippet.title}</h3>
        <p className={style.ChannelId}>{channelId}</p>
        <p className={style.Subs}>{subs}</p>
        <p className={style.Description}>{description}</p>
      </div>
    </a>
  );
}
