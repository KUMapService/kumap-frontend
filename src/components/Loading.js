import React from 'react';
import { MoonLoader } from 'react-spinners';
import palette from '@constants/styles';
import * as Styled from '@styles/Loading.styles';

export const Loading = ({ type = 'big' }) => {
  if (type === 'big') {
    return (
      <Styled.Background>
        <MoonLoader color={palette.blue500} loading={true} size={100} />
        <Styled.LoadingText>잠시만 기다려 주세요...</Styled.LoadingText>
      </Styled.Background>
    );
  } else if (type === 'medium') {
    return (
      <Styled.Background>
        <MoonLoader color={palette.blue500} loading={true} size={60} />
        <Styled.LoadingText style={{ fontSize: '24px' }}>잠시만 기다려 주세요...</Styled.LoadingText>
      </Styled.Background>
    );
  } else if (type === 'small') {
    return (
      <Styled.Background>
        <MoonLoader color={palette.blue500} loading={true} size={40} />
        <Styled.LoadingText style={{ fontSize: '18px' }}>잠시만 기다려 주세요...</Styled.LoadingText>
      </Styled.Background>
    );
  }
};
