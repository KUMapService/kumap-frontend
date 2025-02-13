import * as Styled from '@styles/Home/SideBar.styles';

function User({ setCurrentPage }) {
  return (
    <Styled.BottomPanel>
      <Styled.CategoryText>마이페이지</Styled.CategoryText>
      <Styled.CategoryButton onClick={() => setCurrentPage('my-favorite')}>나의 관심 목록</Styled.CategoryButton>
      <Styled.CategoryButton onClick={() => setCurrentPage('my-sales')}>나의 매물</Styled.CategoryButton>
      <br />
      <br />
      <Styled.CategoryText>문의</Styled.CategoryText>
      <Styled.CategoryButton>고객센터</Styled.CategoryButton>
      <br />
      <br />
      <Styled.CategoryText>약관</Styled.CategoryText>
      <Styled.CategoryButton>개인정보처리방침</Styled.CategoryButton>
      <Styled.CategoryButton>이용약관</Styled.CategoryButton>
      <br />
      <br />
      <Styled.CategoryText>기타</Styled.CategoryText>
      <Styled.CategoryButton>DB 정보</Styled.CategoryButton>
    </Styled.BottomPanel>
  );
}

export default User;
