import React from 'react';
import { css } from '@emotion/react';
import { mq } from '@styles/theme';
import ModalPortal from './ModalPortal';

type Props = {
  isShow: boolean,
  title: string,
  onClose: () => void,
  children: React.ReactNode,
}
const Modal: React.FC<Props> = ({ title, isShow, onClose, children }) => {
  return (
    isShow ?
      <div>
        <ModalPortal>
          <div css={css`
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            background-color: rgba(0, 0, 0, 0.6);
            text-align: center;
          `}>
            <section css={css`
              display: inline-block;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              padding: 0 0 20px;
              width: 400px;
              min-height:400px;
              background: #fff;
              overflow: hidden;
              box-sizing: border-box;
              border-radius: 10px;
              
              @media (max-width: 420px) {
                width: 90%;
              }
            `}>
              <header css={css`
                padding-top: 15px;
                height: 50px;
                font-size: 24px;
                text-align: center;
              `}>
                { title || 'Notice' }
                <button
                  type="button"
                  onClick={onClose}
                  css={css`
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    font-size: 18px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                  `}
                >X</button>
              </header>
              <main css={css`
                overflow-y: auto;
              `}>
                { children }
              </main>
            </section>
          </div>
        </ModalPortal>

      </div> :
      <></>
  );
};

export default Modal;
