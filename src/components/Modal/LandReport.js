import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { IoClose } from 'react-icons/io5';
import { ScaleLoader } from 'react-spinners';

import { getLandReport } from '@api/land';
import palette from '@constants/styles';
import * as Styled from '@styles/Modal/LandReport.styles';
import style from '@styles/MarkdownStyles.module.css';

export const LandReport = ({ className, close, data }) => {
  const isUserLogin = useSelector((state) => state.auth.isUserLogin);
  const [report, setReport] = useState('');

  useEffect(() => {
    const fetchLandReport = async (pnu) => {
      const response = await getLandReport({ pnu: pnu });
      console.log(response);
      setReport(response.content);
    };
    fetchLandReport(data.pnu);
  }, []);
  return (
    <>
      <Styled.Overlay />
      <Styled.Wrapper className={className} tabIndex="-1">
        <Styled.Inner tapIndex="0" className="modal-inner">
          <Styled.MainText>AI 토지 분석서 ({data?.address?.fulladdr})</Styled.MainText>
          <Styled.CloseButton onClick={close}>
            <IoClose size={30} style={{ marginTop: '-8px', marginLeft: '16px' }} />
          </Styled.CloseButton>
          <Styled.Content>
            {!isUserLogin && (
              <Styled.GuestPanel>
                <Styled.LoginButton onClick={() => (window.location.href = '/login')}>
                  로그인 후 열람하기
                </Styled.LoginButton>
              </Styled.GuestPanel>
            )}
            {report === '' ? (
              <div style={{ paddingTop: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ScaleLoader color={palette.blue500} />
                <Styled.NoticeText>
                  토지 분석서를 생성하는 중입니다. 이 작업에는 약 1분의 시간이 소요됩니다.
                </Styled.NoticeText>
              </div>
            ) : (
              <div className={style.ReactMarkdown}>
                <ReactMarkdown remarkPlugins={[remarkBreaks]} children={report} breaks={true} />
              </div>
            )}
          </Styled.Content>
          <Styled.NoticeText>
            * 본 토지 분석서는 예측 모델을 기반으로 실제 토지의 데이터와 다를 수 있습니다.
          </Styled.NoticeText>
        </Styled.Inner>
      </Styled.Wrapper>
    </>
  );
};

export default LandReport;
