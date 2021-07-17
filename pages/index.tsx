import { useState, useCallback } from 'react';
import { css } from '@emotion/react';
import Head from 'next/head'
import Modal from '../components/common/Modal';


const buttonStyle = css`
margin: 30px;
padding: 20px;
background: #fff;
border: 1px solid #fff;
border-radius: 10px;
cursor: pointer;

&:hover {
  border-color: #F37021
}`;

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
  const [isShowRequest, setIsShowRequest] = useState(false);

  const handleClickButton = useCallback(() => {
    setIsShowRequest(true);
  }, []);

  const handleClickCloseModal = useCallback(() => {
    setIsShowRequest(false);
  }, []);
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
          <button css={buttonStyle} type="button" onClick={handleClickButton}>
            <figure css={figureStyle('letter.png')} />
            <span css={imgTitleStyle}>Job offer</span>
          </button>
          <button css={buttonStyle} type="button" onClick={handleClickButton}>
            <figure css={figureStyle('develop.png')} />
            <span css={imgTitleStyle}>Outsourcing development</span>
          </button>
        </div>
        <div css={css`
          display: flex;
          justify-content: space-between;
        `}>
          <button css={buttonStyle} type="button" onClick={handleClickButton}>
            <figure css={figureStyle('partnership.png')} />
            <span css={imgTitleStyle}>Contents partnership</span>
          </button>
          <button css={buttonStyle} type="button" onClick={handleClickButton}>
            <figure css={figureStyle('golf.png')} />
            <span css={imgTitleStyle}>Play golf</span>
          </button>
        </div>
      </div>
      {
        isShowRequest && <Modal isShow={isShowRequest} onClose={handleClickCloseModal}>
          개발 작업 중 입니다.<br />
          jdm85kor@gmail.com로 문의 주세요.
        </Modal>
      }
    </div>
  )
}

export default Home;
