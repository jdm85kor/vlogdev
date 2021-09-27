import React, { useState, useCallback } from 'react';
import { css } from '@emotion/react';
import Modal from '../components/common/Modal';
import { apiCall } from '@utils/apis';
import { colors } from '@styles/theme';

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

interface Props {
  isShow: boolean,
  setShow: (status: boolean) => void;
  type: string,
}

const RequestModal: React.FC<Props> = ({
  isShow,
  setShow,
  type,
}) => {
  const [modalInfo, setModalInfo] = useState<Record<string, string>>({
    name: '',
    tel: '',
    email: '',
    contents: '',
  });

  const handleClickCloseModal = useCallback((): void => {
    setShow(false);
    setModalInfo({
      name: '',
      tel: '',
      email: '',
      contents: '',
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

  return (
    <Modal
      title={type}
      isShow={isShow}
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
            const response = await apiCall({
              method: 'post',
              url: '/vlogdev/request',
              data: {
                ...modalInfo,
                type,
              },
            });

            if (response.status === 200) {
              alert("Registration completed");
              handleClickCloseModal();
            } else {
              alert('Registration failed');
            }
          }}
        >Save</button>
      </div>
    </Modal>
  );
};

export default RequestModal;