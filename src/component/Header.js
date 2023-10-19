import { Container, Nav, Navbar } from "react-bootstrap";
import SearchBox from "./SearchBox";
import style from './Header.module.css';

export default function Header() {
  return <Navbar expand="lg" className="navbar-dark bg-dark position-sticky top-0 z-3">
    <Container>
      <Navbar.Brand href={process.env.PUBLIC_URL} className={style.Logo}>YT Search</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link href={process.env.PUBLIC_URL}>추천</Nav.Link>
          <Nav.Link href={`${process.env.PUBLIC_URL}/search`}>찾아보기</Nav.Link>
          <Nav.Link href='#'>기록</Nav.Link>
          <Nav.Link href={`${process.env.PUBLIC_URL}/intro`}>소개</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href='https://www.youtube.com/' target="_blank">YouTube로 가기</Nav.Link>
        </Nav>
        <SearchBox />
      </Navbar.Collapse>
    </Container>
  </Navbar>
}