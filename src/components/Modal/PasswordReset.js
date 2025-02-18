import React, { useCallback, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { fetchResetPassword } from '@api/auth';
import * as Styled from '@styles/Modal/PasswordReset.styles';

const PasswordReset = ({ className, close }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const onChangeEmail = useCallback(async (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
  }, []);

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
  };

  const isEmailValid = validateEmail(email);

  const handleSendEmail = async () => {
    if (!isEmailValid) {
      setErrorMessage('이메일 형식이 올바르지 않습니다.');
    } else {
      try {
        const response = await fetchResetPassword({ email });
        alert('이메일이 확인되었습니다. 메일로 임시비밀번호 발송하였습니다');
        console.log(response);
      } catch (error) {
        setErrorMessage(error.response.data.detail);
      }
    }
  };

  const handleClose = () => {
    close?.();
  };

  return (
    <>
      <Styled.Overlay />
      <Styled.Wrapper className={className} tabIndex="-1">
        <Styled.Inner tapIndex="0" className="modal-inner">
          <Styled.MainText>비밀번호 재설정</Styled.MainText>
          <Styled.CloseButton onClick={handleClose}>
            <IoClose size={30} style={{ marginTop: '-8px', marginLeft: '16px' }} />
          </Styled.CloseButton>
          <Styled.EmailInputBox placeholder="E-mail 주소 입력" onChange={onChangeEmail} value={email} />
          <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
          <Styled.SendEmailButton onClick={handleSendEmail}>메일 전송하기</Styled.SendEmailButton>
        </Styled.Inner>
      </Styled.Wrapper>
    </>
  );
};

export default PasswordReset;
