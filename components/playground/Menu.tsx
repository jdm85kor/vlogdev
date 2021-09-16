import { useState } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { colors } from '@styles/theme';
import Hamberger from '@public/svg/hamberger.svg';
import { useRouter } from 'next/router'

const Menu: React.FC = () => {
  const [isFoldMenu, setIsFoldMenu] = useState(true);
  const router = useRouter();
  return (
    <div
      role="navigation"
      css={css`
        position: relative;
        display: inline-block;
        background: ${colors.hermes};
        width: ${isFoldMenu ? '50px' : '320px'};
        height: 100%;
        flex: 0 0 320px;
        &::after {
          display: block;
          content: '';
          clear: both;
        }
      `}
    >
      <div css={css`
        height: 50px;
      `}>
        <button
          type="button"
          css={css`
            margin: 0;
            padding: 0;
            background: none;
            border: none;
            cursor: pointer;
            float: right;
          `}
          onClick={() => setIsFoldMenu(prev => !prev)}
        >
          <Hamberger
            css={css`
              width: 50px;
              heigth: 50px;
              & > path {
                fill: #fff;
              }
            `
            }
          />
        </button>
      </div>
      {
        !isFoldMenu &&
        <ul css={css`
          list-style: none;
          margin: 0;
          padding: 0 0 0 20px;
        `}>
          <li css={css`
            position: relative;
            color: #fff;
            font-size: 18px;
            padding: 10px;
            &::before {
              content: '';
              display: inline-block;
              position: absolute;
              top: 50%;
              left: 0;
              background: #fff;
              width: 2px;
              height: 2px;
              border-radius: 100%;
            }
          `}
          >
            <button
              type="button"
              onClick={() => {
                router.push('/playground/react-fetch');
              }}
              css={css`
                maring: 0;
                padding: 0;
                background: inherit;
                border: none;
                cursor: pointer;
                color: white;
                &:hover {
                  opacity: 0.5;
                }
              `}
            >
              react-fetch
            </button>
          </li>
        </ul>
      }
    </div>
  );
};

export default Menu;
