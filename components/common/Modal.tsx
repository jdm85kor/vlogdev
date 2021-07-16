import { css } from '@emotion/react';
import ModalPortal from './ModalPortal';

type Props = {
  isShow: boolean,
  onClose: () => void,
  children: React.ReactNode,
}
const Modal: React.FC<Props> = ({ isShow, onClose, children }) => {
  return (
    isShow ?
      <div>
        <ModalPortal>
          <div css={css`
            height: 400px;
          `}>
            <header css={css`
              width: 200px;
              height: 50px;
            `}>
              <button type="button" onClick={onClose}>close</button>
            </header>
            <body>
              { children }
            </body>
          </div>
        </ModalPortal>

      </div> :
      <></>
  );
};

export default Modal;
