import { css, keyframes } from '@emotion/react';

const colors = keyframes`
  0% {background: #af298a;}
  7% {background: #af298a;}
  14% {background: #e35b02;}
  21% {background: #e35b02;}
  28% {background: #59b101;}
  35% {background: #59b101;}
  42% {background: #e39f02;}
  49% {background: #e39f02;}
  56% {background: #d70f37;}
  63% {background: #d70f37;}
  70% {background: #2141c6;}
  77% {background: #2141c6;}
  84% {background: #0f9bd7;}
  91% {background: #0f9bd7;}
  100% {background: #af298a;}
`;

const block1 = keyframes`
  0% {left: 8px; top: 0;}
  24% {left: 8px; top: 0;}
  28% {left: 24px; top: 0;}
  35% {left: 24px; top: 0;}
  42% {left: 16px; top: 0;}
  49% {left: 16px; top: 0;}
  56% {left: 8px; top: 0;}
  77% {left: 8px; top: 0;}
  81% {left: 0; top: 0;}
  84% {left: 0; top: 8px;}
  91% {left: 0; top: 8px;}
  95% {left: 0; top: 0;}
  100% {left: 8px; top: 0;}
`;
const block2 = keyframes`
  0% {left: 24px; top: 0;}
  21% {left: 24px; top: 0;}
  25% {left: 24px; top: 16px;}
  35% {left: 24px; top: 16px;}
  42% {left: 32px; top: 16px;}
  49% {left: 32px; top: 16px;}
  56% {left: 40px; top: 16px;}
  77% {left: 40px; top: 16px;}
  81% {left: 48px; top: 16px;}
  84% {left: 48px; top: 8px;}
  91% {left: 48px; top: 8px;}
  95% {left: 48px; top: 0;}
  100% {left: 40px; top: 0;}
`;
const block3 = keyframes`
  0% {left: 40px; top: 0;}
  35% {left: 40px; top: 0;}
  42% {left: 32px; top: 0;}
  49% {left: 32px; top: 0;}
  56% {left: 24px; top: 0;}
  66% {left: 24px; top: 0;}
  70% {left: 24px; top: 16px;}
  77% {left: 24px; top: 16px;}
  81% {left: 32px; top: 16px;}
  84% {left: 32px; top: 8px;}
  91% {left: 32px; top: 8px;}
  95% {left: 32px; top: 16px;}
  100% {left: 24px; top: 16px;}
`;
const block4 = keyframes`
  0% {left: 24px; top: 16px;}
  7% {left: 24px; top: 16px;}
  14% {left: 8px; top: 16px;}
  35% {left: 8px; top: 16px;}
  42% {left: 16px; top: 16px;}
  49% {left: 16px; top: 16px;}
  56% {left: 24px; top: 16px;}
  63% {left: 24px; top: 16px;}
  67% {left: 8px; top: 16px;}
  77% {left: 8px; top: 16px;}
  81% {left: 16px; top: 16px;}
  84% {left: 16px; top: 8px;}
  91% {left: 16px; top: 8px;}
  95% {left: 16px; top: 0;}
  100% {left: 24px; top: 0;}
`;
const block = css`
  position: absolute;
  width: 15px;
  height: 15px;
  background: #af298a;
  box-shadow:inset 0 0 0 4px rgba(0, 0, 0, .1);
  &::before {
    content: "";
    display:block;
    position: absolute;
    top: 1px;
    left: 1px;
    width: 2px;
    height: 3px;
    background: rgba(255, 255, 255, .5);
  }
`;

const Loading = () => {
  return (
    <div css={css`
      position: relative;
      display:block;
      margin: 0 auto;
      width: 64px;
      height: 32px;
    `}>
      <div css={css`
        ${block};
        left: 8px; top: 0;
        animation: ${block1} 5s infinite linear, colors 5s infinite linear;
      `} />
      <div css={css`
        ${block};
        left: 24px; top: 0; 
        animation: ${block2} 5s infinite linear, colors 5s infinite linear;
      `} />
      <div css={css`
        ${block};
        left: 40px; top: 0;
        animation: ${block3} 5s infinite linear, colors 5s infinite linear;
      `} />
      <div css={css`
        ${block};
        left: 24px; top: 16px;
        animation: ${block4} 5s infinite linear, colors 5s infinite linear;
      `} />
    </div>
  );
};

export default Loading;
