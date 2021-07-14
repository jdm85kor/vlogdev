
import { jsx, css } from '@emotion/react';
import Head from 'next/head'

const Home: React.FC = () => {
  return (
    <div>
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
            margin: 50px;
          `}>
            <div css={css`
              margin: 0 auto;
              width: 362px;
              height: 350px;
              background: no-repeat center center url("letter.png");
            `} />
            <div css={css`
              height: 50px;
              text-align: center;
            `}>Job offer</div>
          </div>
          <div css={css`
            margin: 50px;
          `}>
            <div css={css`
              width: 362px;
              height: 350px;
              background: no-repeat center center url("develop.png");
            `} />
            <div css={css`
              height: 50px;
              text-align: center;
            `}>Outsourcing development</div>
          </div>
        </div>
        <div css={css`
          display: flex;
          justify-content: space-between;
        `}>
          <div css={css`
            margin: 50px;
          `}>
            <div css={css`
              display: inline-block;
              width: 362px;
              height: 350px;
              background: no-repeat center center url("partnership.png");
            `} />
            <div css={css`
                height: 50px;
                text-align: center;
              `}>Contents partnership</div>
          </div>
          <div css={css`
            margin: 50px;
          `}>
            <div css={css`
              display: inline-block;
              width: 362px;
              height: 350px;
              background: no-repeat center center url("golf.png");
            `} />
            <div css={css`
                height: 50px;
                text-align: center;
              `}>Play golf</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
