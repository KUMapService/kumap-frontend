import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BsFillPersonBadgeFill } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
//import { fetchResetPassword } from '@api/auth';
import * as Styled from '@styles/Modal/ModifyUserInfo.styles';
import { useSelector } from 'react-redux';
import { validateName, validateNickname, validatePassword } from 'utils/validators';
import { toast } from 'react-toastify';
import { fetchDupCheck, verifyToken } from 'api/auth';
import { patchUserInfo, patchUserPassword } from 'api/user';

export const ModifyUserInfo = ({ className, close }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  // edit user
  const [page, setPage] = useState('editUser');
  const [prevPage, setPrevPage] = useState('editUser');
  const [userImage, setUserImage] = useState(currentUser.image);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [name, setName] = useState(currentUser.name);
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [confirmedNickname, setConfirmedNickname] = useState('');
  const [isNicknameButtonDisabled, setIsNicknameButtonDisabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phone);
  // change password
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    changePassword: '',
    changePasswordReenter: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    changePassword: false,
    changePasswordReenter: false,
  });
  const [errorBoxIndex, setErrorBoxIndex] = useState(0);
  // set permission
  const [permissions, setPermissions] = useState({
    mailSend: false,
    mailSend2: false,
  });

  const isNameValid = validateName(name);
  const isNicknameValid = validateNickname(nickname);
  const isPasswordValid = validatePassword(passwords.changePassword);

  // onChange handler
  const onChangeName = useCallback((e) => setName(e.target.value), []);
  const onChangeNickname = useCallback(
    (e) => {
      if (e.target.value !== currentUser.nickname && e.target.value !== confirmedNickname && e.target.value !== '') {
        setIsNicknameButtonDisabled(false);
      } else {
        setIsNicknameButtonDisabled(true);
      }
      setNickname(e.target.value);
    },
    [currentUser, confirmedNickname],
  );
  const onChangePhoneNumber = useCallback((e) => {
    if (e.target.value.length > 11) {
      e.target.value = e.target.value.substr(0, 11);
    }
    setPhoneNumber(e.target.value);
  }, []);
  const onChangeUserImage = useCallback((e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageDataURL = event.target?.result;
        setUploadedFile(file);
        setUserImage(imageDataURL);
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  }, []);
  const onChangePassword = useCallback(
    (field) => (e) => {
      setPasswords((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    },
    [],
  );
  const onToggleShowPassword = useCallback(
    (field) => () => {
      setShowPasswords((prev) => ({
        ...prev,
        [field]: !prev[field],
      }));
    },
    [],
  );
  const onTogglePermission = useCallback(
    (field) => () => {
      setPermissions((prev) => ({
        ...prev,
        [field]: !prev[field],
      }));
    },
    [],
  );

  const handleChangePage = (p) => {
    if (
      name !== currentUser.name ||
      nickname !== currentUser.nickname ||
      phoneNumber !== currentUser.phone ||
      userImage !== currentUser.image
    ) {
      if (confirm('변경된 내용을 저장하지 않고 넘어가시겠습니까?')) {
        setUserImage(currentUser.image);
        setName(currentUser.name);
        setNickname(currentUser.nickname);
        setPhoneNumber(currentUser.phone);
        setPage(p);
      }
    } else {
      setPasswords({ currentPassword: '', changePassword: '', changePasswordReenter: '' });
      setPage(p);
    }
  };

  const handleDuplicateCheckButton = async () => {
    try {
      setIsNicknameButtonDisabled(true);
      if (!isNicknameValid) {
        toast.error('닉네임은 한글, 영문, 숫자 12자까지 입력 가능합니다.');
        setIsNicknameButtonDisabled(false);
      } else {
        await fetchDupCheck({ nickname: nickname });
        setConfirmedNickname(nickname);
        toast.success('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      setIsNicknameButtonDisabled(false);
      toast.error('이미 존재하는 닉네임입니다.');
    }
  };

  const handlePhoneNumberAuth = () => {
    toast.error('현재 인증을 사용할 수 없습니다.');
  };

  const handleSaveButton = async () => {
    if (page === 'editUser') {
      if (
        name !== currentUser.name ||
        nickname !== currentUser.nickname ||
        phoneNumber !== currentUser.phone ||
        uploadedFile
      ) {
        if (name === '') {
          toast.error('이름을 입력해주세요.');
        } else if (!isNameValid) {
          toast.error('이름 형식이 잘못되었습니다.');
        } else if (nickname === '') {
          toast.error('닉네임을 입력해주세요.');
        } else if (!isNicknameButtonDisabled) {
          toast.error('닉네임 중복 확인을 해주세요.');
        } else {
          await patchUserInfo({ image: uploadedFile, name: name, nickname: nickname, phone: phoneNumber });
          toast.success('저장되었습니다.');
          verifyToken(dispatch);
        }
      } else {
        toast.warn('변경된 내용이 없습니다.');
      }
    } else if (page === 'changePassword') {
      if (!isPasswordValid) {
        setErrorBoxIndex(5);
        toast.error('영문, 숫자, 특수문자를 조합하여 8자 이상으로 설정해 주세요.');
      } else if (passwords.changePassword !== passwords.changePasswordReenter) {
        setErrorBoxIndex(6);
        toast.error('비밀번호가 일치하지 않습니다.');
      } else {
        try {
          await patchUserPassword({
            currentPassword: passwords.currentPassword,
            changePassword: passwords.changePassword,
          });
          toast.apply('비밀번호가 변경되었습니다.');
          verifyToken(dispatch);
          setErrorBoxIndex(0);
          close?.();
        } catch (error) {
          setErrorBoxIndex(4);
          toast.error(error.message);
        }
      }
    }
  };

  const handleUserDeleteButton = () => {
    setPrevPage(page);
    setPage('deleteUser');
  };

  const handleClose = () => {
    if (
      name !== currentUser.name ||
      nickname !== currentUser.nickname ||
      phoneNumber !== currentUser.phone ||
      userImage !== currentUser.image
    ) {
      if (confirm('변경된 내용을 저장하지 않고 나가시겠습니까?')) {
        close?.();
      }
    } else {
      close?.();
    }
  };

  const handleUserDeleteNo = () => {
    setPage(prevPage);
  };

  const handleUserDeleteYes = () => {
    toast.error('현재 이용할 수 없는 기능입니다.');
  };

  if (page !== 'deleteUser') {
    return (
      <>
        <Styled.Overlay />
        <Styled.Wrapper className={className} tabIndex="-1">
          <Styled.Inner className="modal-inner">
            <Styled.MainText>회원정보 수정</Styled.MainText>
            <Styled.InputRow>
              <Styled.UserImage src={userImage} />
              {page === 'editUser' && (
                <Styled.UserImageButtonContainer>
                  <Styled.UserImageEditButton onClick={() => document.getElementById('fileInput').click()}>
                    <MdEdit size={13} style={{ marginLeft: '2px', marginTop: '1px' }} />
                    <input
                      id="fileInput"
                      style={{ display: 'none' }}
                      accept="image/png, image/jpeg"
                      type="file"
                      onChange={onChangeUserImage}
                    />
                  </Styled.UserImageEditButton>
                  <Styled.UserImageDeleteButton>
                    <RiDeleteBin6Line size={13} style={{ marginRight: '1px', marginTop: '1px' }} />
                  </Styled.UserImageDeleteButton>
                </Styled.UserImageButtonContainer>
              )}

              <Styled.ButtonContainer>
                {page !== 'editUser' && (
                  <Styled.TopButton onClick={() => handleChangePage('editUser')}>기본정보 수정</Styled.TopButton>
                )}
                {page !== 'changePassword' && (
                  <Styled.TopButton onClick={() => handleChangePage('changePassword')}>비밀번호 변경</Styled.TopButton>
                )}
                {page !== 'setPermission' && (
                  <Styled.TopButton onClick={() => handleChangePage('setPermission')}>권한 설정</Styled.TopButton>
                )}
              </Styled.ButtonContainer>
            </Styled.InputRow>
            <Styled.NoticeContainer isVerified={currentUser.phoneVerified}>
              <BsFillPersonBadgeFill size={18} />

              <Styled.NoticeText>
                {currentUser.phoneVerified ? '전화번호 인증이 완료된 계정입니다.' : '전화번호 인증이 되지 않았습니다.'}
              </Styled.NoticeText>
            </Styled.NoticeContainer>

            {page === 'editUser' && (
              <>
                <Styled.DivLine />
                <Styled.InputRow>
                  <Styled.SubText>이메일</Styled.SubText>
                  <Styled.InputBox value={currentUser.email} disabled />
                </Styled.InputRow>

                <Styled.DivLine />
                <Styled.InputRow>
                  <Styled.SubText>이름</Styled.SubText>
                  <Styled.InputBox
                    placeholder="이름 입력"
                    onChange={onChangeName}
                    value={name}
                    errorCaused={errorBoxIndex === 1}
                  />
                </Styled.InputRow>

                <Styled.DivLine />
                <Styled.InputRow>
                  <Styled.SubText>닉네임</Styled.SubText>
                  <Styled.InputBox
                    placeholder="닉네임 입력"
                    onChange={onChangeNickname}
                    value={nickname}
                    errorCaused={errorBoxIndex === 2}
                  />
                  <Styled.ConfirmButton onClick={handleDuplicateCheckButton} disabled={isNicknameButtonDisabled}>
                    중복
                    <br />
                    확인
                  </Styled.ConfirmButton>
                </Styled.InputRow>

                <Styled.DivLine />
                <Styled.InputRow>
                  <Styled.SubText>전화번호</Styled.SubText>
                  <Styled.InputBox
                    type="number"
                    placeholder="전화번호 입력"
                    onChange={onChangePhoneNumber}
                    value={phoneNumber}
                    errorCaused={errorBoxIndex === 3}
                  />
                  <Styled.ConfirmButton onClick={handlePhoneNumberAuth}>인증</Styled.ConfirmButton>
                </Styled.InputRow>
              </>
            )}

            {page === 'changePassword' && (
              <>
                <Styled.DivLine />
                <Styled.InputRow>
                  <Styled.SubText>현재 비밀번호</Styled.SubText>
                  <Styled.PasswordInputBox
                    type={showPasswords.currentPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="비밀번호"
                    onChange={onChangePassword('currentPassword')}
                    value={passwords.currentPassword}
                    autoComplete={showPasswords.currentPassword ? 'on' : 'off'}
                    errorCaused={errorBoxIndex === 4}
                  />
                  <Styled.ShowPasswordButton onClick={onToggleShowPassword('currentPassword')}>
                    {showPasswords.currentPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </Styled.ShowPasswordButton>
                </Styled.InputRow>

                <Styled.DivLine />
                <Styled.InputRow>
                  <Styled.SubText>변경할 비밀번호</Styled.SubText>
                  <Styled.PasswordInputBox
                    type={showPasswords.changePassword ? 'text' : 'password'}
                    name="password"
                    placeholder="변경할 비밀번호"
                    onChange={onChangePassword('changePassword')}
                    value={passwords.changePassword}
                    autoComplete={showPasswords.changePassword ? 'on' : 'off'}
                    errorCaused={errorBoxIndex === 5}
                  />
                  <Styled.ShowPasswordButton onClick={onToggleShowPassword('changePassword')}>
                    {showPasswords.changePassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </Styled.ShowPasswordButton>
                </Styled.InputRow>

                <Styled.DivLine hide={true} />
                <Styled.InputRow>
                  <Styled.SubText></Styled.SubText>
                  <Styled.PasswordInputBox
                    type={showPasswords.changePasswordReenter ? 'text' : 'password'}
                    name="password"
                    placeholder="변경할 비밀번호 재입력"
                    onChange={onChangePassword('changePasswordReenter')}
                    value={passwords.changePasswordReenter}
                    autoComplete={showPasswords.changePasswordReenter ? 'on' : 'off'}
                    errorCaused={errorBoxIndex === 6}
                  />
                  <Styled.ShowPasswordButton onClick={onToggleShowPassword('changePasswordReenter')}>
                    {showPasswords.changePasswordReenter ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </Styled.ShowPasswordButton>
                </Styled.InputRow>
              </>
            )}

            {page === 'setPermission' && (
              <>
                <Styled.DivLine />
                <Styled.InputRow>
                  <Styled.SubText>권한</Styled.SubText>
                  <Styled.PermissionContainer>
                    <Styled.PermissionRow>
                      <Styled.ToggleButton isActive={permissions.mailSend} onClick={onTogglePermission('mailSend')} />
                      <Styled.PermissionContext>
                        <Styled.PermissionTitle>메일 수신 동의</Styled.PermissionTitle>
                        <Styled.PermissionSummary>관련 설명</Styled.PermissionSummary>
                      </Styled.PermissionContext>
                    </Styled.PermissionRow>
                    <Styled.PermissionRow>
                      <Styled.ToggleButton isActive={permissions.mailSend2} onClick={onTogglePermission('mailSend2')} />
                      <Styled.PermissionContext>
                        <Styled.PermissionTitle>마케팅 정보 수집 및 이용 동의</Styled.PermissionTitle>
                        <Styled.PermissionSummary>관련 설명</Styled.PermissionSummary>
                      </Styled.PermissionContext>
                    </Styled.PermissionRow>
                  </Styled.PermissionContainer>
                </Styled.InputRow>
              </>
            )}

            <Styled.DivLine />
            <Styled.InputRow>
              <Styled.UserDeleteButton onClick={handleUserDeleteButton}>회원탈퇴</Styled.UserDeleteButton>
              <Styled.ButtonContainer>
                <Styled.BottomButton onClick={handleClose}>닫기</Styled.BottomButton>
                <Styled.SaveButton onClick={handleSaveButton}>저장</Styled.SaveButton>
              </Styled.ButtonContainer>
            </Styled.InputRow>
          </Styled.Inner>
        </Styled.Wrapper>
      </>
    );
  } else {
    return (
      <>
        <Styled.Overlay />
        <Styled.Wrapper className={className} tabIndex="-1">
          <Styled.Inner className="modal-inner">
            <Styled.MainText>회원 탈퇴</Styled.MainText>
            <Styled.NoticeText>정말로 탈퇴하시겠습니까?</Styled.NoticeText>

            <Styled.InputRow style={{ marginTop: '10px' }}>
              <div />
              <Styled.ButtonContainer>
                <Styled.BottomButton onClick={handleUserDeleteNo}>아니오</Styled.BottomButton>
                <Styled.DeleteButton onClick={handleUserDeleteYes}>네</Styled.DeleteButton>
              </Styled.ButtonContainer>
            </Styled.InputRow>
          </Styled.Inner>
        </Styled.Wrapper>
      </>
    );
  }
};

export default ModifyUserInfo;
