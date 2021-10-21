import React from 'react';
import { css } from '@emotion/react';
import ModalPortal from './ModalPortal';
import Close from '@public/svg/close.svg';

type Props = {
  isShow: boolean,
  title: string,
  onClose: () => void,
  children: React.ReactNode,
}
const Modal = ({ title, isShow, onClose, children }: Props) => {
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
                    top: 20px;
                    right: 10px;
                    font-size: 18px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                  `}
                >
                  <Close css={css`
                    width: 20px;
                    height: 20px;
                    vertical-align: top;
                    margin: 0 5px;
                  `} />
                </button>
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
