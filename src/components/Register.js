import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { fetchDupCheck, fetchRegister } from '@api/auth';
import * as Styled from '@styles/Register.styles';
// import palette from '@constants/styles';
import { validateName, validateEmail, validatePassword } from '@utils/validators';
import { toast } from 'react-toastify';
import { validateNickname } from 'utils/validators';

export const Register = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [confirmedNickname, setConfirmedNickname] = useState('');
  const [isNicknameButtonDisabled, setIsNicknameButtonDisabled] = useState(true);
  const [confirmedEmail, setConfirmedEmail] = useState('');
  const [isEmailButtonDisabled, setIsEmailButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState({
    type: 'password',
    autoComplete: 'current-password',
  });
  const [allCheck, setAllCheck] = useState('');
  const [ageCheck, setAgeCheck] = useState('');
  const [useCheck, setUseCheck] = useState('');
  const [marketingCheck, setMarketingCheck] = useState('');
  //const [touModalOpen, setTOUModalOpen] = useState(false);
  //const [mcModalOpen, setMCModalOpen] = useState(false);

  // error message
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // check validate
  const isNameValid = validateName(name);
  const isNicknameValid = validateNickname(nickname);
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  // on change
  const onChangeName = useCallback((e) => {
    const currentName = e.target.value;
    if (!validateName(currentName)) {
      setErrorMessage((prev) => ({
        ...prev,
        name: '이름 형식이 잘못되었습니다.',
      }));
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        name: '',
      }));
    }
    setName(currentName);
  }, []);
  const onChangeNickname = useCallback((e) => {
    const currentNickname = e.target.value;
    if (!validateNickname(currentNickname)) {
      setIsNicknameButtonDisabled(true);
      setErrorMessage((prev) => ({
        ...prev,
        nickname: '닉네임은 한글, 영문, 숫자 12자까지 입력 가능합니다.',
      }));
    } else {
      if (confirmedNickname === currentNickname) {
        setIsNicknameButtonDisabled(true);
      } else {
        setIsNicknameButtonDisabled(false);
      }
      setErrorMessage((prev) => ({
        ...prev,
        nickname: '',
      }));
    }
    setNickname(currentNickname);
  }, []);
  const onChangeEmail = useCallback(async (e) => {
    const currentEmail = e.target.value;
    if (!validateEmail(currentEmail)) {
      setIsEmailButtonDisabled(true);
      setErrorMessage((prev) => ({
        ...prev,
        email: '올바른 이메일을 입력해주세요.',
      }));
    } else {
      if (confirmedEmail === currentEmail) {
        setIsEmailButtonDisabled(true);
      } else {
        setIsEmailButtonDisabled(false);
      }
      setErrorMessage((prev) => ({
        ...prev,
        email: '',
      }));
    }
    setEmail(currentEmail);
  }, []);
  const onChangePassword = useCallback((e) => {
    const currentPassword = e.target.value;
    if (!validatePassword(currentPassword)) {
      setErrorMessage((prev) => ({
        ...prev,
        password: "영문, 숫자, 특수문자를 조합하여 8자 이상으로 설정해 주세요. (<>()'#/\\는 사용불가)",
      }));
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        password: '',
      }));
    }
    setPassword(currentPassword);
  }, []);
  const onChangePasswordCheck = useCallback((e) => {
    const currentPasswordCheck = e.target.value;
    setPasswordCheck(currentPasswordCheck);
  }, []);

  useEffect(() => {
    if (showPassword === false) {
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
    if (e.key == 'Enter') {
      handleRegister();
    }
  };

  // check box
  const allButtonEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    }
  };
  const ageButtonEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };
  const useButtonEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };
  const marketingButtonEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };
  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck]);

  // handler
  const handlerTOUModalClick = () => {
    //setTOUModalOpen(true);
  };

  const handlerMCModalClick = () => {
    //setMCModalOpen(true);
  };

  const handlerNicknameDuplicateCheck = useCallback(async () => {
    try {
      const response = await fetchDupCheck({ nickname: nickname });
      toast.success(response.message);
      setConfirmedNickname(nickname);
      setIsNicknameButtonDisabled(true);
    } catch (error) {
      toast.error(error.message);
      setIsNicknameButtonDisabled(false);
    }
  }, [nickname, isNicknameValid]);
  const handlerEmailDuplicateCheck = useCallback(async () => {
    try {
      const response = await fetchDupCheck({ email: email });
      toast.success(response.message);
      setConfirmedEmail(email);
      setIsEmailButtonDisabled(true);
    } catch (error) {
      toast.error(error.message);
      setIsEmailButtonDisabled(false);
    }
  }, [email, isEmailValid]);

  const handleRegister = useCallback(async () => {
    if (name === '') {
      toast.error('이름을 입력해주세요.');
      return;
    } else if (!isNameValid) {
      toast.error('이름이 올바르지 않습니다.');
      return;
    } else if (!isNicknameButtonDisabled || confirmedNickname === '') {
      toast.error('닉네임 중복확인을 해주세요.');
      return;
    } else if (!isEmailButtonDisabled || confirmedEmail === '') {
      toast.error('이메일 중복확인을 해주세요.');
      return;
    } else if (!isPasswordValid) {
      toast.error('비밀번호를 양식에 맞게 작성해주세요.');
    } else if (passwordCheck !== password) {
      toast.error('입력하신 비밀번호가 일치하지 않습니다.');
    } else if (ageCheck !== true || useCheck !== true) {
      toast.error('약관에 동의해주세요.');
    } else {
      const confirmed = window.confirm('입력하신 정보로 회원가입 하시겠습니까?');
      if (confirmed) {
        try {
          await fetchRegister({ name: name, nickname: nickname, email: email, password: password });
          toast.success('회원가입이 완료되었습니다.');
        } catch (error) {
          toast.error('회원가입 도중 문제가 발생했습니다. 다시 시도해주세요.');
        }
        navigate('/');
      }
    }
  }, [name, nickname, email, password, passwordCheck, isNameValid, isPasswordValid, ageCheck, useCheck, navigate]);

  return (
    <>
      <Styled.Container>
        <Styled.Header>KUMap</Styled.Header>
        <Styled.Template>
          <Styled.MainText>일반회원 가입</Styled.MainText>

          <Styled.InputBox
            type="text"
            name="name"
            placeholder="이름"
            onChange={onChangeName}
            value={name}
            onKeyDown={(e) => onKeyDownFunc(e)}
          />
          <Styled.ErrorMessage>{errorMessage.name}</Styled.ErrorMessage>

          <Styled.InputRow>
            <Styled.InputBox
              type="text"
              name="nickname"
              placeholder="닉네임"
              onChange={onChangeNickname}
              value={nickname}
              onKeyDown={(e) => onKeyDownFunc(e)}
            />
            <Styled.ConfirmButton onClick={() => handlerNicknameDuplicateCheck()} disabled={isNicknameButtonDisabled}>
              중복확인
            </Styled.ConfirmButton>
          </Styled.InputRow>
          <Styled.ErrorMessage>{errorMessage.nickname}</Styled.ErrorMessage>

          <Styled.InputRow>
            <Styled.InputBox
              type="text"
              name="email"
              placeholder="이메일"
              onChange={onChangeEmail}
              value={email}
              onKeyDown={(e) => onKeyDownFunc(e)}
              style={{ paddingRight: '60px' }}
            />
            <Styled.ConfirmButton onClick={() => handlerEmailDuplicateCheck()} disabled={isEmailButtonDisabled}>
              중복확인
            </Styled.ConfirmButton>
          </Styled.InputRow>
          <Styled.ErrorMessage>{errorMessage.email}</Styled.ErrorMessage>

          <Styled.InputRow>
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
          </Styled.InputRow>
          <Styled.ErrorMessage>{errorMessage.password}</Styled.ErrorMessage>

          <Styled.PasswordInputBox
            type={passwordInputType.type}
            name="password-check"
            placeholder="비밀번호 확인"
            onChange={onChangePasswordCheck}
            value={passwordCheck}
            onKeyDown={(e) => onKeyDownFunc(e)}
            autoComplete={passwordInputType.autoComplete}
          />

          <Styled.TermsForm>
            <Styled.TermsTitleText>약관에 동의해주세요.</Styled.TermsTitleText>
            <hr></hr>
            <div>
              <div>
                <input type="checkbox" id="all-check" checked={allCheck} onChange={allButtonEvent} />
                <Styled.TermsCheckboxText for="all-check">전체동의</Styled.TermsCheckboxText>
              </div>
              <div>
                <input type="checkbox" id="check1" checked={ageCheck} onChange={ageButtonEvent} />
                <Styled.TermsCheckboxText for="check1">
                  만 14세 이상입니다. <span>[필수]</span>
                </Styled.TermsCheckboxText>
              </div>
              <div>
                <input type="checkbox" id="check2" checked={useCheck} onChange={useButtonEvent} />
                <Styled.TermsCheckboxText for="check2">
                  이용약관 <span>[필수]</span>
                  <Styled.TermSummaryButton onClick={handlerTOUModalClick}>내용 보기</Styled.TermSummaryButton>
                </Styled.TermsCheckboxText>
              </div>
              <div>
                <input type="checkbox" id="check3" checked={marketingCheck} onChange={marketingButtonEvent} />
                <Styled.TermsCheckboxText for="check3">
                  마케팅 동의 <span>[선택]</span>
                  <Styled.TermSummaryButton onClick={handlerMCModalClick}>내용 보기</Styled.TermSummaryButton>
                </Styled.TermsCheckboxText>
              </div>
            </div>
          </Styled.TermsForm>
          <Styled.RegisterButton onClick={handleRegister}>회원가입</Styled.RegisterButton>
        </Styled.Template>
      </Styled.Container>
    </>
  );
};
