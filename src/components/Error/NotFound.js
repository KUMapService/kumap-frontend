import React from 'react';
import * as Styled from '@styles/Error.styles';

export const NotFoundPage = () => {
  return (
    <Styled.Background>
      <Styled.ErrorText>404 Not Found</Styled.ErrorText>
      <Styled.Content>요청하신 페이지를 찾을 수 없습니다.</Styled.Content>
    </Styled.Background>
  );
};
