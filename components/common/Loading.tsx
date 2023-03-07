import { css, keyframes } from '@emotion/react';
import { colors } from '@styles/theme';

const block1 = keyframes`
  0% {left: 45px; top: 0;background: #af298a;}
  4% {left: 30px; top: 0;}
  8% {left: 15px; top: 0;}
  12% {left: 0px; top: 15px;}
  18% {left: 0px; top: 90px;}
  90% {left: 0px; top: 90px;background: #af298a;}
  100% {left: 0px; top: 90px;background: #bbb;}
`;
const block2 = keyframes`
  0% { opacity: 0; }
  17% { opacity: 0; }
  18% {
    opacity: 1;
    left: 45px;
    top: 0px;
    background: #59b101;
  }
  22% {left: 45px; top: 30px;}
  26% {left: 45px; top: 60px;}
  30% {left: 45px; top: 90px;}
  32% {left: 45px; top: 105px;}
  36% {left: 15px; top: 105px;}
  90% {left: 15px; top: 105px;background: #59b101;}
  100% {left: 15px; top: 105px;background: #bbb;}
`;
const block3 = keyframes`
  0% { opacity: 0; }
  35% { opacity: 0; }
  36% {
    opacity: 1;
    left: 45px;
    top: 0;
    background: #0f9bd7;
  }
  40% {left: 60px; top: 0;}
  44% {left: 60px; top: 60px;}
  48% {left: 60px; top: 90px;}
  52% {left: 60px; top: 105px;}
  56% {left: 45px; top: 105px;}
  90% {left: 45px; top: 105px;background: #0f9bd7;}
  100% {left: 45px; top: 105px;background: #bbb;}
`;
const block4 = keyframes`
  0% { opacity: 0; }
  55% { opacity: 0; }
  56% {
    opacity: 1;
    left: 45px;
    top: 0;
    background: #e39f02;
  }
  60% {left: 45px; top: 30px;}
  64% {left: 45px; top: 60px;}
  68% {left: 45px; top: 90px;}
  90% {left: 45px; top: 90px;background: #e39f02;}
  100% {left: 45px; top: 90px;background: #bbb;}
`;
const block5 = keyframes`
  0% { opacity: 0; }
  67% { opacity: 0; }
  68% {
    opacity: 1;
    left: 45px;
    top: 0;
    background: #d70f37;
  }
  72% {left: 15px; top: 30px;}
  76% {left: 15px; top: 60px;}
  80% {left: 15px; top: 75px;}
  90% {left: 15px; top: 75px;background: #d70f37;}
  100% {left: 15px; top: 75px;background: #bbb;}
`;
const block6 = keyframes`
  0% { opacity: 0; }
  79% { opacity: 0; }
  80% {
    opacity: 1;
    left: 45px;
    top: 0;
    background: ${colors.lusciousRed};
  }
  84% {left: 90px; top: 15px;}
  90% {left: 90px; top: 75px;background: ${colors.lusciousRed};}
  100% {left: 90px; top: 75px;background: #bbb;}
`;
const block = (left: number, top: number) => css`
  position: absolute;
  width: 15px;
  height: 15px;
  box-shadow:inset 0 0 0 4px rgba(0, 0, 0, .1);
  left: ${left}px;
  top: ${top}px;
`;

const Loading = () => {
  return (
    <div css={css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}>
      <div css={css`
        position: relative;
        display: block;
        margin: 0 auto;
        width: 105px;
        height: 135px;
        border-left: 1px solid ${colors.lusciousRed};
        border-right: 1px solid ${colors.lusciousRed};
        border-bottom: 1px solid ${colors.lusciousRed};
      `}>
        <div css={css`
          position: absolute;
          left: 45px; top: 0px;
          animation: ${block1} 3s infinite linear;
          & > span {
            background: inherit;
          }
        `}>
          <span css={block(0, 0)} />
          <span css={block(0, 15)} />
          <span css={block(15, 15)} />
          <span css={block(0, 30)} />
        </div>
        <div css={css`
          position: absolute;
          left: 45px; top: 0px;
          animation: ${block2} 3s infinite linear;
          & > span {
            background: inherit;
          }
        `}>
          <span css={block(0, 15)} />
          <span css={block(15, 15)} />
          <span css={block(15, 0)} />
          <span css={block(30, 0)} />
        </div>
        <div css={css`
          position: absolute;
          left: 45px; top: 0px;
          animation: ${block3} 3s infinite linear;
          & > span {
            background: inherit;
          }
        `}>
          <span css={block(0, 15)} />
          <span css={block(15, 15)} />
          <span css={block(30, 15)} />
          <span css={block(15, 0)} />
        </div>
        <div css={css`
          position: absolute;
          left: 45px; top: 0px;
          animation: ${block4} 3s infinite linear;
          & > span {
            background: inherit;
          }
        `}>
          <span css={block(0, 0)} />
          <span css={block(15, 0)} />
          <span css={block(30, 0)} />
          <span css={block(30, 15)} />
        </div>
        <div css={css`
          position: absolute;
          left: 45px; top: 0px;
          animation: ${block5} 3s infinite linear;
          & > span {
            background: inherit;

            &:first-of-type,
            &:last-of-type {
              background: #d70f37;
            }
          }
        `}>
          <span css={block(0, 0)} />
          <span css={block(0, 15)} />
          <span css={block(15, 15)} />
          <span css={block(15, 0)} />
        </div>
        <div css={css`
          position: absolute;
          left: 45px; top: 0px;
          animation: ${block6} 3s infinite linear;
          & > span {
            &:not(:first-of-type) {
              background: inherit;
            }
            &:first-of-type {
              background: ${colors.lusciousRed};
            }
          }
        `}>
          <span css={block(0, 0)} />
          <span css={block(0, 15)} />
          <span css={block(0, 30)} />
          <span css={block(0, 45)} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
