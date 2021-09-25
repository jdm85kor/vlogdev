import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { colors } from '@styles/theme';
import Hamberger from '@public/svg/hamberger.svg';
import Link from 'next/link'

const Menu: React.FC = () => {
  const [isFoldMenu, setIsFoldMenu] = useState<boolean>(false);
  const [importsFiles, setImportsFiles] = useState<string[]>([]);

  useEffect(() => {
    const imports = [];
    const context = require.context('../../pages/playground', true, /\.tsx$/);

    for (const c of context.keys().filter(name => name.startsWith('./') && name !== './index.tsx')) {
      const splitedName = c.split('/');
      if (splitedName.length === 2) imports.push(splitedName[1].replace('.tsx', ''));
    }
    setImportsFiles(imports);
  }, []);
  
  return (
    <div
      role="navigation"
      css={css`
        position: relative;
        display: inline-block;
        background: ${colors.hermes};
        width: ${isFoldMenu ? '50px' : '320px'};
        height: 100%;
        &::after {
          display: block;
          content: '';
          clear: both;
        }
        transition: all 0.5s ease;
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
          padding: 0;
        `}>
          {
            importsFiles.map((f, idx) => (
              <li
                key={`${f}-${idx}`}
                css={css`
                  position: relative;
                  color: #fff;
                  font-size: 18px;
                  padding: 10px 0;
                  height: 30px;
              `}
              >
                <Link
                  href={`/playground/${f}`}
                  passHref
                >
                  <a
                    css={css`
                      position: absolute;
                      left: 0;
                      right: 0;
                      top: 0;
                      bottom: 0;
                      margin: 0;
                      padding: 0;
                      background: inherit;
                      border: none;
                      cursor: pointer;
                      color: white;
                      text-decoration: none;
                      &:hover {
                        opacity: 0.5;
                      }
                    `}
                  >
                    <span
                      css={css`
                        display: inline-block;
                        position: absolute;
                        top: 50%;
                        left: 10px;
                        transform: translateY(-50%);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        width: 90%;
                        white-space: nowrap;
                      `}
                    >
                      {f.toUpperCase()}
                    </span>
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
      }
    </div>
  );
};

export default Menu;
