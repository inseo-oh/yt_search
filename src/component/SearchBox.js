import { useState } from "react";
import style from "./SearchBox.module.css";
import { BsSearch } from 'react-icons/bs';

export default function SearchBox({ light }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchUrl = `#/search/${encodeURIComponent(searchKeyword)}`;
  return <div className={`${style.Container} ${light ? style.Light : ''}`}>
    <input className={style.SearchQueryInput} value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} type='text' placeholder='검색어를 입력하세요' />
    <a className={style.SearchButton} href={searchUrl}><BsSearch /></a>
  </div>
}