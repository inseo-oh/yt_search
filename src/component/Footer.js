import style from "./Footer.module.css";

export default function Header() {
  return <footer className={style.Footer}>
    <h1 className={style.Title}>YT Search</h1>
    <p>Copyright &copy; 2023 Inseo Oh</p>
    <p>본 웹사이트는 YouTube 공식 웹사이트가 아니며, YouTube는 Google LLC의 상표입니다.</p>
  </footer>
}