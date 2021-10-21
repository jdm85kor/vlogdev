import React from 'react';
import { css } from '@emotion/react';
import { mq, colors } from '@styles/theme';

interface Props {
  children: React.ReactNode,
};

const Playground = ({
  children,
}: Props) => {
  return (
    <main css={css`
      margin: 0 auto;
      max-width: 1920px;
      ${mq({
        paddingLeft: [0, 0, '20px'],
      })}
      & > h1 {
        color: ${colors.hermes}
      }
    `}>
      { children }
    </main>
  );
};

export default Playground;
