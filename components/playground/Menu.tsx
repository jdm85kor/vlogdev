import React, { useState, useEffect, useRef, useMemo } from 'react';
import { css } from '@emotion/react';
import { colors, mq } from '@styles/theme';
import Hamberger from '@public/svg/hamberger.svg';
import Link from 'next/link'
import Unfold from '@public/svg/unfold.svg';
import Fold from '@public/svg/fold.svg';

const listItemStyle = css`
  position: relative;
  font-size: 18px;
  padding: 10px 0;
  height: 30px;
`;
const iconStyle = css`
  display: inline-block;
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin: 0 5px;
`;

interface ImportsFiles {
  [folder: string]: {
    list: string[];
    isFold: boolean;
  };
};

const Menu: React.FC = () => {
  const [isFoldMenu, setIsFoldMenu] = useState<boolean>(false);
  const [importsFiles, setImportsFiles] = useState<ImportsFiles>({});

  const isMobile = useMemo(() => typeof window !== 'undefined' ? document.documentElement.clientWidth < 640 : false, []);

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

  useEffect(() => {
    if (isMobile && !isFoldMenu) {
      // overflow:hidden;
      // position:fixed;
      // top:0;
      // bottom: 0;
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
  }, [isFoldMenu, isMobile]);
  
  return (
    <div
      role="navigation"
      css={css`
        ${mq({
          position: [isFoldMenu ? 'fixed' : 'fixed', 'sticky'],
          width: [isFoldMenu ? '50px' : '100vw', isFoldMenu ? '50px' : '320px'],
          transition: ['none', 'all 0.5s ease'],
          height: [isFoldMenu ? '53px' : '100vh', 'calc(100vh - 54px)'],
        })}
        flex: 0 0 ${isFoldMenu? '50px' : '320px'};
        top: 50px;
        bottom: 0;
        left: 0;
        display: inline-block;
        background: #fff;
        border: 1px solid ${colors.hermes};
        overflow-y: auto;

        &::after {
          display: block;
          content: '';
          clear: both;
        }
      `}
    >
      <div css={css`
        height: 50px;
        text-align: right;
      `}>
        <button
          type="button"
          css={css`
            margin: 0;
            padding: 0;
            background: none;
            border: none;
            cursor: pointer;
          `}
          onClick={() => setIsFoldMenu(prev => !prev)}
        >
          <Hamberger
            css={css`
              width: 50px;
              height: 50px;
              & > path {
                fill: ${colors.hermes};
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
          padding: 0 0 180px;
          overflow-y: auto;
        `}>
          {
            Object.entries(importsFiles).map((f, fIdx) => (
              <React.Fragment key={`group-${f[0]}-${fIdx}`}>
                <li
                  key={`${f[0]}-${fIdx}`}
                  css={listItemStyle}
                >
                  <button
                    type="button"
                    css={css`
                      padding: 0;
                      width: 100%;
                      height: 100%;
                      background: inherit;
                      border: none;
                      color: ${colors.hermes};
                      cursor: pointer;
                      font-weight: 800;
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
                    {
                      f[1].isFold ?
                      <Unfold css={iconStyle} />:
                      <Fold css={iconStyle} />
                    }
                  </button>
                </li>
                {
                  f[1].isFold && f[1].list.map((i, iIdx) => (
                    <li
                      key={`${i}-${iIdx}`}
                      css={css`
                        ${listItemStyle}
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
                            color: ${colors.hermes};
                            text-decoration: none;
                            &:hover {
                              background: ${colors.hermes};
                              color: #fff;
                              opacity: 0.5;
                            }
                          `}
                          onClick={() => isMobile && setIsFoldMenu(prev => !prev)}
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
              </React.Fragment>
            ))
          }
        </ul>
      }
    </div>
  );
};

export default Menu;
