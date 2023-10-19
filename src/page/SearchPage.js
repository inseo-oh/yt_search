import style from './SearchPage.module.css';
import SearchBox from '../component/SearchBox';



export default function SearchPage() {
  const suggestKeywords = [
    '뉴스',
    '바다',
    '햄스터',
    '여행지',
    '애니',
    '브이튜버',
    '영화',
  ];
  const suggestKeywordItems = suggestKeywords.map((keyword, i) => {
    return <li key={i}><a href={`#/search/${encodeURIComponent(keyword)}`}>{keyword}</a></li>
  })
  return (
    <div className={style.Container}>
      <h1 className={style.Title}>무엇을 찾고<br></br>싶으신가요?</h1>
      <div className={style.SearchArea}>
        <SearchBox light={true} />
      </div>
      <p>잘 모르겠나요? 다음 검색어를 시도해 보세요!</p>
      <ul className={style.SuggestedKeywords}>
        {suggestKeywordItems}
      </ul>
    </div>
  );
}

