import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ChannelInfoPage from './page/ChannelInfoPage';
import SearchResultPage from './page/SearchResultPage';
import VideoInfoPage from './page/VideoInfoPage';
import IntroPage from './page/IntroPage';
import Header from './component/Header';
import Footer from './component/Footer';
import SearchPage from './page/SearchPage';
import FeaturedPage from './page/FeaturedPage';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  function onError(e) {
    setErrorMessage(e);
  }
  return (
    <div>
      <ToastContainer style={{ margin: 5 }}>
        <Toast onClose={() => setErrorMessage(null)} show={errorMessage != null} delay={5000} bg='warning' autohide>
          <Toast.Header>
            <strong className="me-auto">안내</strong>
          </Toast.Header>
          <Toast.Body>
            {errorMessage}<br /><br />
            <p>데모 목적을 위해 임의로 만들어진 데이터를 대신 사용합니다.</p>
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <Header />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={`/`} element={<FeaturedPage onError={onError} />} />
          <Route path={`/intro`} element={<IntroPage />} />
          <Route path={`/search`} element={<SearchPage />} />
          <Route path={`/search/:query`} element={<SearchResultPage onError={onError} />} />
          <Route path={`/channel/:id`} element={<ChannelInfoPage onError={onError} />} />
          <Route path={`/video/:id`} element={<VideoInfoPage onError={onError} />} />
        </Routes>
      </BrowserRouter>
      <Footer />

    </div>
  );
}
