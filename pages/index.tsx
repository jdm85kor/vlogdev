
import { css } from '@emotion/react';
import Head from 'next/head'

const figureStyle = (url: string) => css`
  margin: 0 auto;
  width: 362px;
  height: 350px;
  background: no-repeat 100%/contain url(${url});
`;
const imgTitleStyle = css`
display: block;
height: 30px;
padding-top: 20px;
text-align: center;
font-size: 24px;
color: #000;
`;

const Home: React.FC = () => {
  return (
    <div css={css`
      margin: 0 auto;
      max-width: 1920px;
    `}>
      <Head>
        <title>VLOG</title>
        <meta name="description" content="Record yourself just for you" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <div css={css`
        margin: 0 auto;
        padding: 0 50px;
        width: 100%;
        max-width: 1024px;
        box-sizing: border-box;
        
      `}>
        <div css={css`
          display: flex;
          height: 500px;
        `}>
          <div css={css`
            margin: 30px;
            padding: 20px;
            &:hover {
              border-color: red;
            }
          `}>
            <figure css={figureStyle('letter.png')} />
            <span css={imgTitleStyle}>Job offer</span>
          </div>
          <div css={css`
            margin: 50px;
          `}>
            <figure css={figureStyle('develop.png')} />
            <span css={imgTitleStyle}>Outsourcing development</span>
          </div>
        </div>
        <div css={css`
          display: flex;
          justify-content: space-between;
        `}>
          <div css={css`
            margin: 50px;
          `}>
            <figure css={figureStyle('partnership.png')} />
            <span css={imgTitleStyle}>Contents partnership</span>
          </div>
          <div css={css`
            margin: 50px;
          `}>
            <figure css={figureStyle('golf.png')} />
            <span css={imgTitleStyle}>Play golf</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
