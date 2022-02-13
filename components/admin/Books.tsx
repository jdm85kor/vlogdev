import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { colors } from '@styles/theme';
import { apiCall } from '@utils/apis';

interface Props {
  user: any;
};

const Books = ({ user }: Props) => {

  return (
    <>
      <h2>Books</h2>
      <form>
        <div>
          <div css={css`
            display: inline-block;
          `}>
            <input name="type" type="radio" id="new" />
            <label htmlFor="new">신규</label>
          </div>
          <div css={css`
            display: inline-block;
          `}>
            <input name="type" type="radio" id="existing" />
            <label htmlFor="existing">기존</label>
          </div>
        </div>
        <div>
          <label>책 제목</label>
          <input value={'abc'}/>
        </div>
        <div>
          <label>독서량</label>
          <input type="number" />
        </div>
        <div>
          <label>책 이미지</label>
          <input type="file" />
        </div>
      </form>
    </>
  );  
};

export default Books;
