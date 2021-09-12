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
  justify-content: space-between;
  box-sizing: border-box;
  height: 50px;
`;

const Img = styled.img`
  vertical-align: middle;
`;

const Ul = styled.ul`
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;
  height: inherit;
  text-align: center;
`;
const Li = styled.li`
  display: inline-block;
  height: inherit;
  & > a {
    ${mq({
      padding: ['0 7px', '0 30px', '0 50px'],
    })}
  }
`;

const A = styled.a`
  color: ${colors.hermes};
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

const loginUrl: string = 'https://v-log.auth.ap-northeast-2.amazoncognito.com/login?client_id=3kvrs1co551opb4tr7qd6qde4a&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://v-log.dev';

const Gnb: React.FC = () => {
  return (
    <Div>
      <Nav>
        <Link href="/" passHref>
          <A>
            <Img src="https://d6c63ppcwec2x.cloudfront.net/logo144.png" alt="VLOG" width="30" height="30" />
          </A>
        </Link>
        <Ul>
          <Li>
            <Link href="/dev" passHref><A>DEV</A></Link>
          </Li>
          <Li>
            <Link href="/vlog" passHref><A>VLOG</A></Link>
          </Li>
          <Li>
            <Link href="/playground" passHref><A>Playground</A></Link>
          </Li>
          <Li>
            <Link href="/about" passHref><A>About</A></Link>
          </Li>
        </Ul>
        <Link href={loginUrl} passHref>
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
