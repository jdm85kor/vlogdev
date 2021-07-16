import styled from '@emotion/styled';
import Link from 'next/link';

const Nav = styled.nav`
  display: flex;
  margin: 0 auto;
  padding: 0 50px;
  max-width: 1920px;
  height: 50px;
  flex-direction: row;
  justify-content: space-around;
  box-sizing: border-box;
`;

const Img = styled.img`
  vertical-align: middle;
`;

const A = styled.a`
  color: #F37021;
  text-decoration: none;
  &:hover {
    color: #f3a621;
  }
  &::before {
    content: '';
    height: 100%;
    vertical-align: middle;
    display: inline-block;
  }
`;

const Gnb: React.FC = () => {
  return (
    <Nav>
      <Link href="/" passHref><A><Img src="/logo.png" alt="VLOG" width="30" height="30" /></A></Link>
      <Link href="https://dongmin-jang.medium.com" passHref><A>Dev</A></Link>
      <Link href="/vlog" passHref><A>VLOG</A></Link>
      {/* <Link href="/parenting" passHref><A>Parenting</A></Link> */}
      <Link href="/playground" passHref><A>Playground</A></Link>
      <Link href="/about" passHref><A>About</A></Link>
    </Nav>
  );
};

export default Gnb;
