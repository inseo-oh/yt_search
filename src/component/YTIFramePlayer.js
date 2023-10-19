import style from './YTIFramePlayer.module.css';

export default function YTIFramePlayer({ videoId }) {
  return <iframe
    className={style.Player}
    id="player" type="text/html" width="640" height="360"
    src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
    frameBorder="0">

  </iframe>
}