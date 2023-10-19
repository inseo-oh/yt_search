import { Button, Container } from 'react-bootstrap';
import style from './IntroPage.module.css';

export default function ChannelInfoPage() {
  return (
    <Container className={style.Container}>
      <h1 className={style.Title}>
        <span>단순하게</span>
        <span>동영상을</span>
        <span>찾는 방법!</span>
      </h1>
      <h2 className={style.Introduction}>
        YT Search는 이용자가 유튜브에 접속하지 않고, 대신 유튜브에서 제공하는 Data API를 활용하여
        검색을 수행하는 시스템입니다. 
      </h2>
      <ul className={style.FeatureList}>
        <li>단순한 인터페이스</li>
        <li>유튜브에 들어가지 않고 채널, 영상 상세정보 보기</li>
        <li>로그인, 개인정보 수집 No!</li>
      </ul>
      <div className={style.GetStartedButtonArea}>
        <Button href='/search'>검색 시작하기</Button>
        &nbsp;
        <Button href='/featured'>뭘 검색할지 모르겠어요</Button>
      </div>
    </Container>
  );
}

