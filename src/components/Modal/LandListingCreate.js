import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { fetchRegisterListing } from '@api/listing';
import * as Styled from '@styles/Modal/LandListingCreate.styles';
import { addCommas } from '@utils/formatter';
import { toast } from 'react-toastify';

export const LandListingCreate = ({ className, close, data }) => {
  const [activate, setActivate] = useState(false);
  const circleCount = 4;
  const [circleActive, setCircleActice] = useState(1);
  const [landArea, setLandArea] = useState('0');
  const [landPrice, setLandPrice] = useState('0');
  const [landSummary, setLandSummary] = useState('');
  const [landSummaryCount, setLandSummaryCount] = useState(0);

  useEffect(() => {
    setLandArea(data?.detail?.area?.toLocaleString() || '0');
    setLandPrice(data?.detail?.predict_price?.toLocaleString() || '0');
  }, [data]);

  useEffect(() => {
    console.log(data);
    if (circleActive === 2) {
      if (landArea !== 0 && landArea !== '') {
        setActivate(true);
      } else {
        setActivate(false);
      }
    } else if (circleActive === 3) {
      if (landPrice !== 0 && landPrice !== '') {
        setActivate(true);
      } else {
        setActivate(false);
      }
    }
  }, [activate, landArea, landPrice]);

  const HandlerProgressButton = async (type) => {
    if (type === 'next') {
      if (circleActive < 4 && activate) {
        if (circleActive === 1 && (landArea === 0 || landArea === '')) {
          setActivate(false);
        } else if (circleActive === 2 && (landPrice === 0 || landPrice === '')) {
          setActivate(false);
        } else if (circleActive === 3) {
          setActivate(false);
        }
        setCircleActice(circleActive + 1);
      } else if (circleActive === 4) {
        try {
          setActivate(false);
          const response = await fetchRegisterListing({
            pnu: data?.pnu,
            lat: data?.lat,
            lng: data?.lng,
            area: Number(landArea.toString().replaceAll(',', '')),
            price: Number(landPrice.toString().replaceAll(',', '')),
            summary: landSummary,
          });
          toast.success(response.message);
        } catch (err) {
          toast.error(err.message);
        } finally {
          setActivate(true);
          close?.();
        }
      } else {
        if (circleActive > 1) {
          if (circleActive > 2) {
            setActivate(true);
          } else {
            setActivate(false);
          }
          setCircleActice(circleActive - 1);
        }
      }
    }
  };

  const HandlerSummaryInput = (e) => {
    setLandSummary(e.target.value);
    setLandSummaryCount(e.target.value.length);
  };

  const changeLandArea = (e) => {
    const value = e.target.value;
    const removedCommaValue = value.replaceAll(',', '');
    if (!/^\d*$/.test(removedCommaValue)) return; // 숫자가 아니면 함수 종료
    setLandArea(addCommas(removedCommaValue));
  };

  const changeLandPrice = (e) => {
    const value = e.target.value;
    const removedCommaValue = value.replaceAll(',', '');
    if (!/^\d*$/.test(removedCommaValue)) return; // 숫자가 아니면 함수 종료
    setLandPrice(addCommas(removedCommaValue));
  };

  const calcInputSize = (data) => {
    return `${data.replaceAll(',', '').length + Math.floor((data.replaceAll(',', '').length - 1) / 3) * 0.4 + 0.1}ch`;
  };

  const handleClose = () => {
    if (confirm('변경된 내용을 저장하지 않고 나가시겠습니까?')) {
      close?.();
    }
  };

  const ReturnContent = (index) => {
    if (index === 1) {
      return (
        <div>
          <Styled.ContentText>현 위치 토지의 소유자 또는 매매권리를 가지고 있는 분만 등록해주세요.</Styled.ContentText>
          <div style={{ display: 'flex' }}>
            <Styled.Checkbox type="checkbox" onClick={() => setActivate(!activate)} />{' '}
            <Styled.CheckboxText>해당 토지의 소유주인가요?</Styled.CheckboxText>
            <br />
          </div>
        </div>
      );
    } else if (index === 2) {
      return (
        <div>
          <Styled.ContentText>
            토지 면적을 입력해 주세요.
            <br />
            지분 보유일 경우 보유하신 면적을 입력해 주세요.
            <br />
            기본 값은 해당 지번의 전체 면적입니다.
          </Styled.ContentText>
          <div>
            <div style={{ display: 'flex' }}>
              <Styled.LandInput
                id="landArea"
                type="text"
                placeholder="거래 면적 입력"
                value={landArea}
                onChange={changeLandArea}
                style={{ width: calcInputSize(landArea) }}
              />
              <Styled.UnitText>m²</Styled.UnitText>
            </div>
          </div>
        </div>
      );
    } else if (index === 3) {
      return (
        <div>
          <Styled.ContentText>
            토지 매매가를 입력해 주세요.
            <br />
            가격이 높으면 거래가 잘 성사되지 않을 수 있습니다.
            <br />
            공시지가 실거래 정보를 참고해 주십시오.
          </Styled.ContentText>
          <div style={{ display: 'flex' }}>
            <Styled.LandInput
              id="landPrice"
              type="text"
              placeholder="거래 가격 입력"
              defaultValue={landPrice}
              value={landPrice}
              onChange={changeLandPrice}
              style={{ width: calcInputSize(landPrice) }}
            />
            <Styled.UnitText>원</Styled.UnitText>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Styled.ContentText>
            간략하게 매물 소개글을 작성해주세요.
            <br />
            <Styled.LandSummaryInput placeholder="매물 소개" onChange={HandlerSummaryInput} maxLength={100} />
            <Styled.LandSummaryCountText>{landSummaryCount}/100 자</Styled.LandSummaryCountText>
            약관에 동의해 주십시오.
            <br />
            개인정보 수집 및 제3자 제공 동의
            <br />
          </Styled.ContentText>
          <div style={{ display: 'flex' }}>
            <Styled.Checkbox type="checkbox" onClick={() => setActivate(!activate)} />{' '}
            <Styled.CheckboxText>위 약관에 동의합니다.</Styled.CheckboxText>
            <br />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <Styled.Overlay />
      <Styled.Wrapper className={className}>
        <Styled.Inner className="modal-inner">
          <Styled.CloseButton onClick={handleClose}>
            <IoClose size={36} />
          </Styled.CloseButton>
          <Styled.TitleText>현 위치 매물 등록하기</Styled.TitleText>
          <Styled.SubtitleText>현 위치: {data?.address?.fulladdr}</Styled.SubtitleText>
          <Styled.ProgressContainer>
            <Styled.Progress style={{ width: `${((circleActive - 1) / (circleCount - 1)) * 100}%` }} />
            {[...Array(circleCount)].map((_, index) => (
              <Styled.Circle key={index} isActive={index < circleActive ? true : false}>
                {index + 1}
              </Styled.Circle>
            ))}
          </Styled.ProgressContainer>
          {ReturnContent(circleActive)}

          <Styled.ButtonRow>
            <Styled.PrevButton id="prev" isDisable={circleActive === 1} onClick={() => HandlerProgressButton('prev')}>
              이전
            </Styled.PrevButton>
            <Styled.NextButton id="next" isDisable={!activate} onClick={() => HandlerProgressButton('next')}>
              {circleActive === 4 ? '매물 등록' : '다음'}
            </Styled.NextButton>
          </Styled.ButtonRow>
        </Styled.Inner>
      </Styled.Wrapper>
    </>
  );
};

export default LandListingCreate;
