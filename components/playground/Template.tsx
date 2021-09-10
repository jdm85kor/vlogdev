import { css } from '@emotion/react';

interface Props {
  children?: React.ReactNode;
};

const Template: React.FC<Props> = ({ children }) => {
  return (
    <div css={css`
      display: inline-block;
      vertical-align: top;
    `}>
      {children}
    </div>
  );
};

export default Template;
