import { css } from '@emotion/react';
import Link from 'next/link';
import { colors } from '@styles/theme';
import { mq } from '@styles/theme';

const Footer: React.FC = () => {
  return (
    <footer
      role="contentinfo"
      css={css`
        position: relative;
        width: 100%;
        height: 150px;
        background: #333;
      `}
    >
      <div css={css`
        margin: 0 auto;
        padding: 20px;
        box-sizing: border-box;
        width: 100%;
        max-width: 1024px;
        height: 100px;
        color: #aaa;
        font-size: 12px;
        word-break: keep-all;
      `}>
        <p>
          v-log.dev | KIMPO
        </p>
        <p css={css`
          text-decoration:none;
        `}>
          사업자 등록번호: 365-11-01858 | jdm85kor@gmail.com | 장동민
        </p>
      </div>
      
    </footer>
  );
};

export default Footer;
