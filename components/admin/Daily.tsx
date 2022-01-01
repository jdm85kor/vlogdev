import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { colors } from '@styles/theme';
import { apiCall } from '@utils/apis';

interface Props {
  user: any;
};

const Daily = ({ user }: Props) => {

  return (
    <>
      <h2>Daily</h2>
      <p>
        editor가 붙을 예정입니다.
      </p>
    </>
  );  
};

export default Daily;
