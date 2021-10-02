import React from 'react';
import { css } from '@emotion/react';
import { mq } from '@styles/theme';

interface Props {
  children: React.ReactNode,
};

const Playground: React.FC<Props> = ({
  children,
}) => {
  return (
    <main css={css`
      margin: 0 auto;
      max-width: 1920px;
      ${mq({
        paddingLeft: [0, 0, '20px'],
      })}
    `}>
      { children }
    </main>
  );
};

export default Playground;
