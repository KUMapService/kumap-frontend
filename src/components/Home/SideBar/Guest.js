import { useNavigate } from 'react-router-dom';
import * as Styled from '@styles/Home/SideBar.styles';

function Guest() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Styled.LoginButton onClick={() => navigate('/login')}>로그인</Styled.LoginButton>
        <Styled.RegisterButton onClick={() => navigate('/sign-up')}>회원가입</Styled.RegisterButton>
      </div>
      <Styled.BottomPanel>
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
    </>
  );
}

export default Guest;
