import React from 'react';
import * as Styled from '@styles/Home/SideWindow.styles';

function SideWindow() {
  return (
    <Styled.SideWindowContainer>
      <Styled.TopMenu>
        <Styled.TopButton ischecked={'true'}>토지 정보</Styled.TopButton>
        <Styled.TopButton ischecked={'false'}>경매 목록</Styled.TopButton>
        <Styled.TopButton ischecked={'false'}>매물 목록</Styled.TopButton>
      </Styled.TopMenu>
    </Styled.SideWindowContainer>
  );
}

export default SideWindow;
