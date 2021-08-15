import React, { useState, useCallback, useEffect } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import Head from 'next/head'
import Modal from '../components/common/Modal';
import Loading from "@components/common/Loading";
import { colors } from '@styles/theme';

const buttonStyle = css`
margin: 30px;
padding: 20px;
background: #fff;
border: 1px solid #fff;
border-radius: 10px;
cursor: pointer;

&:hover {
  border-color: ${colors.hermes}
}`;

const imgStyle = (src: string) => css`
  margin: 0 auto;
  width: 362px;
  height: 350px;
  background: no-repeat 100%/contain url(${src});
`;
const imgTitleStyle = css`
display: block;
margin: 20px 0 0;
padding: 0;
height: 30px;
text-align: center;
font-size: 24px;
color: #000;
`;

const modalLabel = css`
  display: block;
  margin-top: 10px;
`;
const modalInput = css`
  display: block;
  width: 100%;
  box-sizing: border-box;
`;
const modalTextarea = css`
  display: block;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
`;

const instance = axios.create({
  baseURL: 'https://utcrpcgdq0.execute-api.ap-northeast-2.amazonaws.com/dev',
});

const Home: React.FC = () => {
  const [isShowRequest, setIsShowRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalInfo, setModalInfo] = useState<Record<string, string>>({
    name: '',
    tel: '',
    email: '',
    contents: '',
    type: '',
  });

  const handleClickButton = useCallback((type: string) => {
    setIsShowRequest(true);
    setModalInfo(prev => ({
      ...prev,
      type,
    }));
  }, []);

  const handleClickCloseModal = useCallback((): void => {
    setIsShowRequest(false);
    setModalInfo({
      name: '',
      tel: '',
      email: '',
      contents: '',
      type: '',
    });
  }, []);
  
  const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setModalInfo(prev => ({
      ...prev,
      [id]: value,
    }));
  }, []);
  const handleChangeTextarea = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setModalInfo(prev => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  } ,[]);
  
  return (
    <div css={css`
      margin: 0 auto;
      max-width: 1920px;
    `}>
      <Head>
        <title>VLOG</title>
      </Head>
      {
        isLoading ?
        <div css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}>
          <Loading />
        </div> :
        <>
          <h1 css={css`
            display: none;
          `}>Record yourself</h1>
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
              justify-content: space-around;
            `}>
              <button css={buttonStyle} type="button" onClick={() => handleClickButton('Job offer')}>
                <div css={imgStyle('letter.png')} />
                <span css={imgTitleStyle}>Job offer</span>
              </button>
              <button css={buttonStyle} type="button" onClick={() => handleClickButton('Outsourcing development')}>
                <div css={imgStyle('develop.png')} />
                <span css={imgTitleStyle}>Outsourcing development</span>
              </button>
            </div>
            <div css={css`
              display: flex;
              height: 500px;
              justify-content: space-around;
            `}>
              <button css={buttonStyle} type="button" onClick={() => handleClickButton('Contents partnership')}>
                <div css={imgStyle('partnership.png')} />
                <span css={imgTitleStyle}>Contents partnership</span>
              </button>
              <button css={buttonStyle} type="button" onClick={() => handleClickButton('Play golf')}>
                <div css={imgStyle('golf.png')} />
                <span css={imgTitleStyle}>Play golf</span>
              </button>
            </div>
          </div>
        </>
      }
      {
        isShowRequest &&
          <Modal
            title={modalInfo.type}
            isShow={isShowRequest}
            onClose={handleClickCloseModal}
          >
            <div css={css`
              margin: 0 20px;
              text-align: left;
            `}>
              <label
                css={modalLabel}
                htmlFor="name"
              >Name</label>
              <input
                css={modalInput}
                id="name"
                type="text"
                onChange={handleChangeInput}
                value={modalInfo.name}
              />
              <label
                css={modalLabel}
                htmlFor="tel"
                >Tel</label>
              <input
                css={modalInput}
                id="tel"
                type="text"
                onChange={handleChangeInput}
                value={modalInfo.tel}
                />
              <label
                css={modalLabel}
                htmlFor="email"
              >Email</label>
              <input
                css={modalInput}
                id="email"
                type="email"
                onChange={handleChangeInput}
                value={modalInfo.email}
              />
              <label
                css={modalLabel}
                htmlFor="contents"
              >Contents</label>
              <textarea
                css={modalTextarea}
                id="contents"
                onChange={handleChangeTextarea}
                value={modalInfo.contents}
              />
              <button
                css={css`
                  margin-top: 10px;
                  background: ${colors.hermes};
                  border: 1px solid ${colors.hermes};
                  width: 100%;
                  text-align: center;
                  color: #fff;
                  cursor: pointer;
                `}
                type="button"
                onClick={async () => {
                  const response = await instance.post('/vlogdev/request', {
                    ...modalInfo
                  });
                  if (response.status === 200) {
                    alert("Registration is complete");
                    handleClickCloseModal();
                  } else {
                    alert('Registration failed');
                  }
                }}
              >Save</button>
            </div>
          </Modal>
      }
    </div>
  )
}

export default Home;
