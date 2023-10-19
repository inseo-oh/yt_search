import SearchChannelItem from '../component/SearchChannelItem';
import style from './SearchResultPage.module.css';
import SearchVideoItem from '../component/SearchVideoItem';
import { useEffect, useState } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import PageControls from '../component/PageControls';
import { search } from '../util/yt';
import { useParams } from 'react-router-dom';
import PageTitle from '../component/PageTitle';



export default function SearchResultPage({ onError }) {
  const { query } = useParams();
  const [searchResult, setSearchResult] = useState(null);
  const [ordering, setOrdering] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [desiredPageToken, setDesiredPageToken] = useState(null);
  useEffect(function () {
    search(query, {
      pageToken: desiredPageToken,
      ordering: ordering
    }, function (result) {
      setSearchResult(result);
    }, onError)
  }, [ordering, desiredPageToken]);
  let listContents = [];
  let pageCount = 0;
  let thumbnailUrls = [];
  if (searchResult != null) {
    for (const entry of searchResult.items) {
      switch (entry.id.kind) {
        case 'youtube#channel':
          listContents.push(<li key={entry.id.channelId}>
            <SearchChannelItem snippet={entry.snippet} onError={onError} />
          </li>);
          break;
        case 'youtube#video':
          thumbnailUrls.push(entry.snippet.thumbnails.medium.url);
          listContents.push(<li key={entry.id.videoId}>
            <SearchVideoItem videoId={entry.id.videoId} snippet={entry.snippet} onError={onError} />
          </li>);
          break;
      }
    }
    pageCount = Math.floor(searchResult.pageInfo.totalResults / searchResult.pageInfo.resultsPerPage);
    if ((searchResult.pageInfo.totalResults % searchResult.pageInfo.resultsPerPage) != 0) {
      ++pageCount;
    }
  }
  function onPrevPagePressed() {
    setDesiredPageToken(searchResult.prevPageToken);
    setCurrentPage(currentPage - 1);
  }
  function onNextPagePressed() {
    setDesiredPageToken(searchResult.nextPageToken);
    setCurrentPage(currentPage + 1);
  }

  let orderingText;
  switch (ordering) {
    case 'relevance':
      orderingText = '연관성';
      break;
    case 'date':
      orderingText = '업로드 날짜';
      break;
    case 'title':
      orderingText = '제목';
      break;
    case 'rating':
      orderingText = '평가';
      break;
    case 'viewCount':
      orderingText = '조회수';
      break;
    case 'videoCount':
      orderingText = '채널 동영상 수';
      break;
  }

  // 검색 결과 한 페이지에 보여지는 썸네일 양으로는 PageTitle을 채우기에 모자라므로 같은 내용을
  // 한번 더 반복시킴
  thumbnailUrls = [...thumbnailUrls, ...thumbnailUrls];

  return (
    <Container>
      <PageTitle title={`${query}에 대한 검색 결과`} thumbnailUrls={thumbnailUrls} />
      <div className={style.SearchOptionToolbar}>
        <Dropdown>
          <Dropdown.Toggle>정렬 기준: {orderingText}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href='#' onClick={() => setOrdering('relevance')}>연관성</Dropdown.Item>
            <Dropdown.Item href='#' onClick={() => setOrdering('date')}>업로드 날짜</Dropdown.Item>
            <Dropdown.Item href='#' onClick={() => setOrdering('title')}>제목</Dropdown.Item>
            <Dropdown.Item href='#' onClick={() => setOrdering('rating')}>평가</Dropdown.Item>
            <Dropdown.Item href='#' onClick={() => setOrdering('viewCount')}>조회수</Dropdown.Item>
            <Dropdown.Item href='#' onClick={() => setOrdering('videoCount')}>채널 동영상 수</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <ul>
        {listContents}
      </ul>
      <PageControls currentPage={currentPage} pageCount={pageCount} onPrevPagePressed={onPrevPagePressed} onNextPagePressed={onNextPagePressed} />
    </Container>
  );
}

