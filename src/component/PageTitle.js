import style from "./PageTitle.module.css"

export default function PageTitle({ title, thumbnailUrls }) {
  return <div className={style.Title}>
    <ul className={style.Thumbnails}>
      {thumbnailUrls && thumbnailUrls.map((url, i) => {
        return <li key={i}>
          <img src={url}/>
        </li>
      })}
    </ul>
    <h1>{title}</h1>
  </div>
}