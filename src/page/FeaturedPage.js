import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { search } from '../util/yt';
import style from './FeaturedPage.module.css';
import FeaturedVideoItem from '../component/FeaturedVideoItem';
import PageTitle from '../component/PageTitle';

function FeaturedPageRow({ emoji, keyword, onError, details }) {
  let listContents = [];
  listContents = details.items.map((entry, i) => {
    switch (entry.id.kind) {
      case "youtube#video":
        return <li key={entry.id.videoId + '@' + keyword + '_' + i}>
          <FeaturedVideoItem videoId={entry.id.videoId} snippet={entry.snippet} onError={onError} noWideOutput={true} />
        </li>;
      default:
        return;
    }
  });
  return <section className={style.FeaturedSection}>
    <a className={style.FeaturedSectionTitle} href={`/search/${encodeURIComponent(keyword)}`}>
      {emoji}{keyword}
    </a>
    <ul className={style.FeaturedSectionContent}>
      {listContents}
    </ul>
  </section>
}

export default function FeaturedPage({ onError }) {
  const TOPICS = [
    '뉴스',
    '음악',
    '게임',
    '풍경',
    '쇼핑',
    '버츄얼 유튜버',
  ];
  const TOPIC_EMOJIS = [
    '📰',
    '🎵',
    '🎮',
    '⛰️',
    '🛒',
    '🙋',
  ]
  const [thumbnailUrls, setThumbnailUrls] = useState([]);
  const [searchResults, setSearchResults] = useState(TOPICS.map(
    (name, i) => ({
      name: name, emoji: TOPIC_EMOJIS[i], details: null
    })));
  useEffect(function () {
    TOPICS.forEach((keyword, i) => {
      search(keyword, {
        maxResults: 5,
      }, function (result) {
        setThumbnailUrls(thumbnailUrls => [
          ...thumbnailUrls,
          ...result.items.map(entry => {
            return entry.snippet.thumbnails.medium.url
          })
        ]);
        setSearchResults(searchResults => {
          searchResults[i].details = result;
          return searchResults;
        })
      }, onError);
    });
  }, []);
  const rows = searchResults.map((entry, i) => {
    if (entry.details == null) {
      return;
    }
    return <FeaturedPageRow key={i} emoji={entry.emoji} keyword={entry.name} onError={onError} details={entry.details} />
  })
  return (
    <Container>
      <PageTitle title='추천 동영상' thumbnailUrls={thumbnailUrls} />
      {rows}
    </Container>
  );
}

