import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { fetchLogin } from '@api/auth';
import { useModal } from '@providers/ModalProvider';
import * as Styled from '@styles/Login.styles';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState({
    type: 'password',
    autoComplete: 'current-password',
  });
  const [capsLockFlag, setCapsLockFlag] = useState(false);
  const modal = useModal();
  const navigate = useNavigate();

  const onChangeEmail = useCallback(async (e) => {
    const currentEmail = e.target.value;
    setErrorMessage('');
    setEmail(currentEmail);
  }, []);

  const onChangePassword = useCallback(async (e) => {
    const currentPassword = e.target.value;
    setErrorMessage('');
    setPassword(currentPassword);
  }, []);

  useEffect(() => {
    if (showPassword == false) {
      setPasswordInputType({
        type: 'password',
        autoComplete: 'current-password',
      });
    } else {
      setPasswordInputType({
        type: 'text',
        autoComplete: 'off',
      });
    }
  }, [showPassword]);

  const onKeyDownFunc = (e) => {
    let capsLock = e.getModifierState('CapsLock');
    setCapsLockFlag(capsLock);
    if (e.key == 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (email === '') {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    } else if (password === '') {
      setErrorMessage('비밀번호를 입력해주세요.');
    } else {
      try {
        const response = await fetchLogin({ email, password });
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        navigate('/');
      } catch (error) {
        setErrorMessage(error.response.data.detail);
      }
    }
  };

  return (
    <>
      <Styled.Container>
        <div>
          <Styled.Header>KUMap</Styled.Header>
          <Styled.Template>
            <div>
              <Styled.MainText>일반회원 로그인</Styled.MainText>
            </div>
            <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
            <Styled.EmailInputBox
              type="text"
              name="email"
              placeholder="이메일"
              onChange={onChangeEmail}
              value={email}
              onKeyDown={(e) => onKeyDownFunc(e)}
            />
            <Styled.PasswordInputBox
              type={passwordInputType.type}
              name="password"
              placeholder="비밀번호"
              onChange={onChangePassword}
              value={password}
              onKeyDown={(e) => onKeyDownFunc(e)}
              autoComplete={passwordInputType.autoComplete}
            />
            <Styled.ShowPasswordButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </Styled.ShowPasswordButton>
            <Styled.ErrorMessage>{capsLockFlag && 'Caps Lock이 켜져 있습니다.'}</Styled.ErrorMessage>
            <Styled.LoginButton onClick={handleLogin}>로그인</Styled.LoginButton>
            <Styled.TextButtonContainer>
              <div style={{ width: 91 }}>
                <Styled.TextButton onClick={() => modal.passwordReset()}>비밀번호 찾기</Styled.TextButton>
              </div>
              <Styled.DivLine />
              <div style={{ width: 91 }}>
                <Styled.TextButton onClick={() => navigate('/register')}>회원가입</Styled.TextButton>
              </div>
            </Styled.TextButtonContainer>
          </Styled.Template>
        </div>
        <Styled.Footer>
          <Styled.FooterButtonRow>
            <Styled.FooterTextButton>이용약관</Styled.FooterTextButton>
            <Styled.DivLine />
            <Styled.FooterTextButton>개인정보처리방침</Styled.FooterTextButton>
            <Styled.DivLine />
            <Styled.FooterTextButton>고객센터</Styled.FooterTextButton>
          </Styled.FooterButtonRow>
          <Styled.FooterText>KUMap Copyright © AheadOne Inc. All Rights Reserved.</Styled.FooterText>
        </Styled.Footer>
      </Styled.Container>
    </>
  );
};
