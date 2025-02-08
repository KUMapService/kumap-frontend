import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { fetchDupCheck } from 'api/auth';

export const Register = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDupNickname, setIsDupNickname] = useState(true);
  const [dupNicknameMessage, setDupNicknameMessage] = useState('');
  const [isDupEmail, setIsDupEmail] = useState(true);
  const [dupEmailMessage, setDupEmailMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState({
    type: 'password',
    autoComplete: 'current-password',
  });
  const [capsLockFlag, setCapsLockFlag] = useState(false);
  const [allCheck, setAllCheck] = useState('');
  const [ageCheck, setAgeCheck] = useState('');
  const [useCheck, setUseCheck] = useState('');
  const [marketingCheck, setMarketingCheck] = useState('');
  const [touModalOpen, setTOUModalOpen] = useState(false);
  const [mcModalOpen, setMCModalOpen] = useState(false);
  const navigate = useNavigate();

  const validateName = (name) => {
    return name.toLowerCase().match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,8}$/);
  };

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
  };

  const validatePassword = (password) => {
    return password.toLowerCase().match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/);
  };

  const isNameValid = validateName(name);
  const isNicknameValid = validateName(nickname);
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  const onChangeName = useCallback((e) => {
    const currentName = e.target.value;
    setErrMsg('');
    setName(currentName);
  }, []);

  const onChangeNickname = useCallback((e) => {
    const currentNickname = e.target.value;
    setErrorMessage('');
    setIsDupNickname(true);
    setDupNicknameMessage('');
    setNickname(currentNickname);
  }, []);

  const onChangeEmail = useCallback(async (e) => {
    const currentEmail = e.target.value;
    setErrorMessage('');
    setIsDupEmail(true);
    setDupEmailMessage('');
    setEmail(currentEmail);
  }, []);

  const onChangePassword = useCallback((e) => {
    const currentPassword = e.target.value;
    setErrMsg('');
    setPassword(currentPassword);
  }, []);

  const onChangePasswordCheck = useCallback((e) => {
    const currentPasswordCheck = e.target.value;
    setErrorMessage('');
    setPasswordCheck(currentPasswordCheck);
  }, []);
  // 비밀번호 보이기
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
  }, [pwOpt]);

  // Caps Lock 체크 및 엔터 시 로그인
  const onKeyDownFunc = (e) => {
    let capsLock = e.getModifierState('CapsLock');
    setCapsLockFlag(capsLock);
    if (e.key == 'Enter') {
      handleRegister();
    }
  };

  // 전체동의 체크박스 이벤트
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

  // 만 14세 이상입니다 체크박스 이벤트
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

  const handlerTOUModalClick = () => {
    setTOUModalOpen(true);
  };

  const handlerMCModalClick = () => {
    setMCModalOpen(true);
  };

  const handlerNicknameDupCheck = useCallback(async () => {
    if (nickname === '') {
      setIsDupNickname(true);
      setDupNicknameMessage('닉네임을 입력해주세요.');
    } else if (!isNicknameValid) {
      setIsDupNickname(true);
      setDupNicknameMessage('닉네임을 1글자 이상 9글자 미만으로 입력해주세요.');
    } else {
      try {
        const response = await fetchDupCheck({ nickname: nickname });
        setIsDupNickname(false);
        setDupNicknameMessage('사용 가능한 닉네임입니다.');
      } catch (error) {
        setIsDupNickname(true);
        setDupNicknameMessage('사용 불가능한 닉네임입니다.');
      }
    }
  }, [nickname, isNicknameValid]);

  /// TODO
  const handlerEmailDupCheck = useCallback(() => {
    if (email === '') {
      setIsDupEmail(true);
      setDupEmailMsg('이메일을 입력해주세요.');
    } else if (!isEmailValid) {
      setIsDupEmail(true);
      setDupEmailMsg('이메일 형식이 올바르지 않습니다.');
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/dup_check`, {
          email: email,
        })
        .then(function (response) {
          setIsDupEmail(false);
          setDupEmailMsg('사용 가능한 이메일입니다.');
        })
        .catch(function (error) {
          if (error.response) {
            setIsDupEmail(true);
            setDupEmailMsg('사용 불가능한 이메일입니다.');
          }
        });
    }
  }, [email, isEmailValid]);

  const handleRegister = useCallback(() => {
    if (!isNameValid) {
      setErrMsg('이름이 올바르지 않습니다.');
      return;
    } else if (isDupNickname) {
      setErrMsg('닉네임 중복확인을 해주세요.');
      return;
    } else if (isDupEmail) {
      setErrMsg('이메일 중복확인을 해주세요.');
      return;
    } else if (!isPasswordValid) {
      setErrMsg('비밀번호는 영문, 숫자, 특수기호 조합으로 10자리 이상 입력해주세요.');
    } else if (passwordCheck !== password) {
      setErrMsg('입력하신 비밀번호가 일치하지 않습니다.');
    } else if (ageCheck !== true || useCheck !== true) {
      setErrMsg('약관에 동의해주세요.');
    } else {
      const confirmed = window.confirm('입력하신 정보로 회원가입 하시겠습니까?');
      if (confirmed) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            name: name,
            nickname: nickname,
            email: email,
            password: password,
          })
          .then(function (response) {
            alert('회원가입이 완료되었습니다.');
          })
          .catch(function (error) {
            alert('회원가입 도중 문제가 발생했습니다. 다시 시도해주세요.');
          });
        navigate('/');
      }
    }
  }, [name, nickname, email, password, passwordCheck, isNameValid, isPasswordValid, ageCheck, useCheck, navigate]);
};
