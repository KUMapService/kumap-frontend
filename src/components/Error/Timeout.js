import React from 'react';
import * as Styled from '@styles/Error.styles';

export const TimeoutPage = () => {
  return (
    <Styled.Background>
      <Styled.ErrorText>서버가 일시적으로 중단되었습니다.</Styled.ErrorText>
      <Styled.Content>
        해당 오류가 지속된다면 아래 메일로 연락 부탁드립니다.
        <br />
        Email: ehghks021203@gmail.com
      </Styled.Content>
    </Styled.Background>
  );
};
