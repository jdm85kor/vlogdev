import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Link from 'next/link';
import { colors } from '@styles/theme';
import Setting from '@public/svg/setting.svg';
import { mq } from '@styles/theme';

const Div = styled.div`
  margin: 0 auto;
  ${mq({
    padding: ['0 20px', '0 50px', '0 50px'],
  })}
  max-width: 1920px;
  box-sizing: border-box;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  height: 50px;
`;

const Img = styled.img`
  vertical-align: middle;
`;

const Ul = styled.ul`
  flex: 1 1 1024px;
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  height: inherit;
  text-align: center;
  max-width: 1024px;
  min-width: 230px;
`;
const Li = styled.li`
  display: inline-block;
  flex: auto;
  height: inherit;
  & > a {
    font-size: 16px;
    @media (max-width: 374px) {
      padding: 0 3px;
      font-size: 14px;
    }
  }
`;

const A = styled.a`
  flex: 1 1 auto;
  color: ${colors.hermes};
  text-decoration: none;
  text-align: center;
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
    <Div role="banner">
      <Nav>
        <Link href="/" passHref>
          <A>
            <Img src="https://d6c63ppcwec2x.cloudfront.net/logo_96x96.png" alt="" width="30" height="30" />
          </A>
        </Link>
        <Ul>
          <Li>
            <Link href="/vlog" passHref><A>VLOG</A></Link>
          </Li>
          <Li>
            <Link href="/playground" passHref><A>PLAYGROUND</A></Link>
          </Li>
          <Li>
            <Link href="/dev" passHref><A>DEV</A></Link>
          </Li>
          <Li>
            <Link href="/about" passHref><A>ABOUT</A></Link>
          </Li>
        </Ul>
        <Link href="/admin" passHref>
          <A>
            <Setting css={css`
              width: 20px;
              height: 20px;
              display: inline-block;
              vertical-align: middle;
            `} />
          </A>
          </Link>
      </Nav>
    </Div>
  );
};

export default Gnb;
