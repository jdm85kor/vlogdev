import Template from '@components/playground/Template';
import Menu from '@components/playground/Menu';
import { css } from '@emotion/react';

const ReactFetch: React.FC = () => {
  return (
    <div css={css`
      width: 100vw;
      height: 100vh;
    `}>
      <Menu />
      <Template>
        <div>
          react fetch
        </div>
    </Template>
    </div>
  );
};

export default ReactFetch;
