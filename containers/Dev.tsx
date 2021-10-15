/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import { mq, colors } from '@styles/theme';

const anchorStyle = css`
  text-decoration: none;
  color: ${colors.hermes};
`;

const Dev: React.FC = () => {

  return (
    <main css={css`
      position: relative;
      margin: 0 auto;
      max-width: 1920px;
    `}>
      <div css={css`
        margin: 50px auto;
        ${mq({
          padding: ['0 30px 30px', '0 50px', '0 50px'],
        })}
        max-width: 1024px;
        word-break: break-word;
        box-sizing: border-box;
      `}>
        <ul css={css`
          margin: 0;
          padding: 0 0 0 25px;
          list-style: none;
          & > li {
            margin: 10px auto 90px;
            font-size: 20px;
          }
          & > li::marker {
            content: "🧡 ";
          }
        `}>
          <li>
            <Link href="https://dongmin-jang.medium.com/reactjs-setstate-%EC%99%9C-%EB%B9%84%EB%8F%99%EA%B8%B0%EB%A1%9C-%EC%B2%98%EB%A6%AC%EB%90%98%EB%8A%94%EA%B0%80-8197d707ca6a" passHref>
              <a target="_blank" css={anchorStyle}>[Reactjs] setState() 왜 비동기로 처리되는가?</a>
            </Link>
          </li>
          <li>
            <Link href="https://dongmin-jang.medium.com/vue-%EA%B0%84%EB%8B%A8%ED%95%9C-virtual-scroll-%EB%A7%8C%EB%93%A4%EA%B8%B0-e440aa77b4e9" passHref>
              <a target="_blank" css={anchorStyle}>[Vue] 간단한 virtual scroll 만들기</a>
            </Link>
          </li>
          <li>
            <Link href="https://dongmin-jang.medium.com/javascript-nested-array%EB%A5%BC-flatten-array%EB%A1%9C-%EB%B0%94%EA%BE%B8%EB%8A%94-%EB%B0%A9%EB%B2%95-42c5cf9b0018" passHref>
              <a target="_blank" css={anchorStyle}>[Javascript] nested array를 flatten array로 바꾸는 방법</a>
            </Link>
          </li>
          <li>
            <Link href="https://dongmin-jang.medium.com/javascript-array-%EC%A4%91%EB%B3%B5-%EC%A0%9C%EA%B1%B0%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-es6-b5b9075361f9" passHref>
              <a target="_blank" css={anchorStyle}>[Javascript] array 중복 제거하는 방법(ES6)</a>
            </Link>
          </li>
          <li>
            <Link href="https://dongmin-jang.medium.com/javascript-15%EA%B0%80%EC%A7%80-%EC%9C%A0%EC%9A%A9%ED%95%9C-map-reduce-filter-bfbc74f0debd" passHref>
              <a target="_blank" css={anchorStyle}>[Javascript] 15가지 유용한 map, reduce, filter</a>
            </Link>
          </li>
          <li>
            <Link href="https://dongmin-jang.medium.com/css-stacking-context-172f9bd1af8b" passHref>
              <a target="_blank" css={anchorStyle}>[CSS] Stacking context</a>
            </Link>
          </li>
          <li>
            <Link href="https://dongmin-jang.medium.com/vuejs-%EC%88%A8%EA%B2%A8%EC%A7%84-vue-%ED%8C%A8%ED%84%B4%EB%93%A4-1ea3adc585ac" passHref>
              <a target="_blank" css={anchorStyle}>[Vuejs] 숨겨진 Vue 패턴들</a>
            </Link>
          </li>
          <li>
            <Link href="https://dongmin-jang.medium.com/javascript-15%EA%B0%80%EC%A7%80-%EC%9C%A0%EC%9A%A9%ED%95%9C-map-reduce-filter-bfbc74f0debd" passHref>
              <a target="_blank" css={anchorStyle}>[Javascript] 15가지 유용한 map, reduce, filter</a>
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Dev;
