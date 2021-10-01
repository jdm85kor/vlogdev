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
      <div>
        
      </div>
      
    </footer>
  );
};

export default Footer;
