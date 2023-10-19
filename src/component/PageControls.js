import { Button } from "react-bootstrap";
import style from './PageControls.module.css'

export default function PageControls({ currentPage, pageCount, onNextPagePressed, onPrevPagePressed }) {
  return <div className={style.PageControls}>
    <Button onClick={onPrevPagePressed} disabled={pageCount == 0 || currentPage == 1}>이전</Button>
    <p className={style.CurrentPageDisplay}>{currentPage} / {pageCount}</p>
    <Button onClick={onNextPagePressed}  disabled={pageCount == 0 || currentPage == pageCount}>다음</Button>
  </div>
}