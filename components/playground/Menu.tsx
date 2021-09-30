import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { colors } from '@styles/theme';
import Hamberger from '@public/svg/hamberger.svg';
import Link from 'next/link'

interface ImportsFiles {
  [folder: string]: {
    list: string[];
    isFold: boolean;
  };
};

const Menu: React.FC = () => {
  const [isFoldMenu, setIsFoldMenu] = useState<boolean>(false);
  const [importsFiles, setImportsFiles] = useState<ImportsFiles>({});

  useEffect(() => {
    const imports: ImportsFiles = {};
    const context = require.context('../../pages/playground', true, /\.tsx$/);

    for (const c of context
      .keys()
      .filter(name => name.startsWith('./') && name !== './index.tsx')
    ) {
      const splitedName: string[] = c.split('/');
      splitedName[1] = splitedName[1].toUpperCase();

      const fileName = splitedName[2].replace('.tsx', '');
      if (splitedName.length === 3) {
        if (imports[splitedName[1]]) {
          imports[splitedName[1]].list.push(fileName);
        } else {
          imports[splitedName[1]] = {
            list: [fileName],
            isFold: true,
          };
        }
      }
    }
    setImportsFiles(imports);
  }, []);
  
  return (
    <div
      role="navigation"
      css={css`
        position: relative;
        display: inline-block;
        background: #bfaea1;
        width: ${isFoldMenu ? '50px' : '320px'};
        height: 100%;
        transition: all 0.5s ease;
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
          padding: 0;
        `}>
          {
            Object.entries(importsFiles).map((f, fIdx) => (
              <>
                <li
                  key={`${f[0]}-${fIdx}`}
                  css={css`
                    position: relative;
                    color: #fff;
                    font-size: 18px;
                    padding: 10px 0;
                    height: 30px;
                `}
                >
                  <button
                    type="button"
                    css={css`
                      width: 100%;
                      height: 100%;
                      background: #784d42;
                      border: none;
                      color: #aaa;
                      cursor: pointer;
                    `}
                    onClick={() => setImportsFiles(prev => ({
                      ...prev,
                      [f[0]]: {
                        ...f[1],
                        isFold: !f[1].isFold,
                      }
                    }))}
                  >
                    {f[0]}
                  </button>
                </li>
                {
                  f[1].isFold && f[1].list.map((i, iIdx) => (
                    <li
                      key={iIdx}
                      css={css`
                        position: relative;
                        color: #fff;
                        font-size: 18px;
                        padding: 10px 0;
                        height: 30px;
                        text-align: right;
                    `}>
                      <Link
                        href={`/playground/${f[0].toLowerCase()}/${i}`}
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
                            {i}
                          </span>
                        </a>
                      </Link>
                    </li>
                  ))
                }
              </>
            ))
          }
        </ul>
      }
    </div>
  );
};

export default Menu;
