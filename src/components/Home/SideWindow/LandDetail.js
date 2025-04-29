import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { BiLike } from 'react-icons/bi';
import { BiSolidLike } from 'react-icons/bi';
import { RiRoadsterFill } from 'react-icons/ri';
import { getCadastralMap } from '@api/geo';
import { patchLikeStatus } from '@api/user';
import { Loading } from '@components/Loading';
import palette from '@constants/styles';
import { useModal } from '@providers/ModalProvider';
import * as Styled from '@styles/Home/LandDetail.styles';
import { addCommas } from '@utils/formatter';

const LandDetail = ({ data }) => {
  //const dispatch = useDispatch();
  const isUserLogin = useSelector((state) => state.auth.isUserLogin);
  //const currentUser = useSelector((state) => state.auth.currentUser);
  const currentLandAddress = useSelector((state) => state.land.currentLandAddress);
  const [isInvalidData, setInvalidData] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [highValueLand, setHighValueLand] = useState(false);
  const [isLandLike, setLandLike] = useState(false);
  const [isRoadView, setRoadView] = useState(false);
  const modal = useModal();

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.type === 'error') {
        toast.error(e.data.message);
        setRoadView(false);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!data) return;

    if (currentLandAddress.pnu !== data?.pnu) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    const setSideWindowCadastral = async (pnu) => {
      try {
        const iframe = document.getElementsByClassName('side-window-map')[0];
        if (iframe) {
          const response = await getCadastralMap({ pnu: pnu });

          // 로드 이벤트를 먼저 추가
          const handleLoad = () => {
            iframe.contentWindow.postMessage(JSON.parse(JSON.stringify(response)), '*');
            setLoading(false); // 로드 완료 상태 설정
          };

          // 이벤트 핸들러를 먼저 추가
          iframe.addEventListener('load', handleLoad, true);

          // iframe이 이미 로드된 상태라면 바로 실행
          if (iframe.complete) {
            handleLoad();
          }

          setInvalidData(false);
        }
      } catch (error) {
        toast.error(error);
        setInvalidData(true);
      }
    };

    // 사이드 윈도우 지도 설정
    setSideWindowCadastral(data?.pnu);

    if (data?.detail?.predict_price / data?.detail?.predict_price > 1) {
      setHighValueLand(true);
    } else {
      setHighValueLand(false);
    }

    // 좋아요 상태 설정
    setLandLike(data?.like);
    // 로드뷰 상태 설정
    setRoadView(false);
  }, [currentLandAddress, data]);

  const handleLandLike = async (data) => {
    if (!isUserLogin) {
      toast.error('먼저 로그인을 해주세요.');
      return;
    }
    try {
      const response = await patchLikeStatus({ pnu: data?.pnu });
      toast.success(response.message);
      setLandLike(response.like);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRoadView = (data) => {
    var iframe = document.getElementsByClassName('side-window-map')[0];
    if (iframe !== undefined) {
      var returnValue = {
        position: {
          lat: data?.lat,
          lng: data?.lng,
        },
        isOpen: !isRoadView,
        result: 'success',
      };
      console.log(returnValue);
      document
        .getElementsByClassName('side-window-map')[0]
        .contentWindow.postMessage(JSON.parse(JSON.stringify(returnValue)), '*');
      setRoadView(!isRoadView);
    }
  };

  const handleLandReport = (data) => {
    modal.landReport({ data: data });
  };

  if (!data || isInvalidData) {
    return (
      <Styled.Container>
        <Styled.Content></Styled.Content>
      </Styled.Container>
    );
  } else if (isLoading) {
    return <Loading type="medium" />;
  } else {
    return (
      <Styled.Container>
        <Styled.Content>
          {/* 상단 지도 */}
          <Styled.Map className="side-window-map" src="https://api.landprice.info/map/kakaomap" />
          <Styled.RoadViewButton isRoadView={isRoadView} onClick={() => handleRoadView(data)}>
            <RiRoadsterFill size={20} style={{ marginTop: '2px' }} />
          </Styled.RoadViewButton>
          <Styled.LikeButton isLike={isLandLike} onClick={() => handleLandLike(data)}>
            {isLandLike ? (
              <BiSolidLike size={20} style={{ marginTop: '2px' }} />
            ) : (
              <BiLike size={20} style={{ marginTop: '2px' }} />
            )}
          </Styled.LikeButton>
          <Styled.RegisterButton onClick={() => modal.landListingCreate({ data: data })}>
            매물 등록
          </Styled.RegisterButton>
          <Styled.LikeCountText>{data?.total_like}명이 이 토지를 좋아합니다.</Styled.LikeCountText>
          {/* 경매일 경우 타경 표시 */}
          {/* {bidData !== null && (
            <Styled.BidCaseCdTxt>
              {bidCourtInCharge} {transCaseCd(bidCaseCd)}
            </Styled.BidCaseCdTxt>
          )} */}
          {/* 토지 주소 및 예측가 영역 */}
          <Styled.AddressText>{data?.address?.fulladdr}</Styled.AddressText>
          <Styled.DivLine />
          {data?.detail?.predict_price !== null ? (
            <Styled.LandPriceBox>
              <Styled.MiniText>토지 예측가({data?.last_predict_date} 기준)</Styled.MiniText>
              <Styled.LandPriceText style={highValueLand ? { color: palette.red500 } : { color: palette.blue500 }}>
                {Math.floor(data?.detail?.predict_price * data?.detail?.area).toLocaleString('ko-KR')}원
              </Styled.LandPriceText>
              <Styled.LandPricePerText style={highValueLand ? { color: palette.red500 } : { color: palette.blue500 }}>
                {addCommas(data?.detail?.predict_price)}원/m²당
              </Styled.LandPricePerText>
              <>
                <Styled.MiniText>공시지가의 </Styled.MiniText>
                <Styled.MiniText style={highValueLand ? { color: palette.red500 } : { color: palette.blue500 }}>
                  {parseInt((data?.detail?.predict_price / data?.detail?.official_price) * 100)}%
                </Styled.MiniText>
              </>
              <Styled.ViewLandReportButton onClick={() => handleLandReport(data)}>
                AI 토지 분석서 확인하기
              </Styled.ViewLandReportButton>
            </Styled.LandPriceBox>
          ) : (
            <Styled.LandPriceBox>
              <Styled.MiniText>토지 예측가</Styled.MiniText>
              <br />
              <BeatLoader color={palette.blue500} />
              <br />
              <Styled.MiniText>토지 가격을 예측하는 중입니다...</Styled.MiniText>
            </Styled.LandPriceBox>
          )}
          <Styled.DivLine />
          {/* 토지 특성 정보 영역 */}
          <Styled.TitleText>토지 기본 정보 (기준년도: {data?.land_feature_stdr_year}년)</Styled.TitleText>
          <Styled.FeatureRow>
            <Styled.FeatureBox>
              <Styled.SubTitleText>지목</Styled.SubTitleText>
              <Styled.FeatureText>{data?.detail?.land_cls}</Styled.FeatureText>
            </Styled.FeatureBox>
            <Styled.FeatureBox>
              <Styled.SubTitleText>이용상황</Styled.SubTitleText>
              <Styled.FeatureText>{data?.detail?.land_usage}</Styled.FeatureText>
            </Styled.FeatureBox>
          </Styled.FeatureRow>
          <Styled.FeatureRow>
            <Styled.FeatureBox>
              <Styled.SubTitleText>용도지역</Styled.SubTitleText>
              <Styled.FeatureText>{data?.detail?.land_zoning}</Styled.FeatureText>
            </Styled.FeatureBox>
            <Styled.FeatureBox>
              <Styled.SubTitleText>면적</Styled.SubTitleText>
              <Styled.FeatureText>{Math.floor(data?.detail?.area).toLocaleString('ko-KR')}m²</Styled.FeatureText>
            </Styled.FeatureBox>
          </Styled.FeatureRow>
          <Styled.FeatureRow>
            <Styled.FeatureBox>
              <Styled.SubTitleText>형상</Styled.SubTitleText>
              <Styled.FeatureText>{data?.detail?.form}</Styled.FeatureText>
            </Styled.FeatureBox>
            <Styled.FeatureBox>
              <Styled.SubTitleText>지세</Styled.SubTitleText>
              <Styled.FeatureText>{data?.detail?.height}</Styled.FeatureText>
            </Styled.FeatureBox>
          </Styled.FeatureRow>
          <Styled.FeatureRow>
            <Styled.FeatureBox>
              <Styled.SubTitleText>도로접면</Styled.SubTitleText>
              <Styled.FeatureText>{data?.detail?.road_side}</Styled.FeatureText>
            </Styled.FeatureBox>
            <Styled.FeatureBox>
              <Styled.SubTitleText>공시지가</Styled.SubTitleText>
              <Styled.FeatureText>
                {Math.floor(data?.detail?.official_price).toLocaleString('ko-KR')}원
              </Styled.FeatureText>
            </Styled.FeatureBox>
          </Styled.FeatureRow>
          <Styled.FeatureRow>
            <Styled.FeatureBox>
              <Styled.SubTitleText>토지 이용 계획</Styled.SubTitleText>
              <Styled.FeatureText>{data?.detail?.use_plan.replaceAll('/', ', ')}</Styled.FeatureText>
            </Styled.FeatureBox>
          </Styled.FeatureRow>
          <Styled.DivLine />
          {/* 토지 매매 내역 리스트 */}
          <Styled.TitleText>토지 실거래 내역</Styled.TitleText>
          {data?.land_trade_list.length === 0 ? (
            <Styled.FeatureText style={{ marginTop: '80px', width: '450px', fontSize: '15px', textAlign: 'center' }}>
              주변 지역의 실거래 내역이 없습니다.
            </Styled.FeatureText>
          ) : (
            <Styled.DealList>
              <thead>
                <tr>
                  <Styled.DealListTH style={{ width: '80px' }}>거래일자</Styled.DealListTH>
                  <Styled.DealListTH>거래유형</Styled.DealListTH>
                  <Styled.DealListTH>거래금액 (원)</Styled.DealListTH>
                  <Styled.DealListTH>거래면적 (㎥)</Styled.DealListTH>
                  <Styled.DealListTH>단가</Styled.DealListTH>
                </tr>
              </thead>
              <tbody>
                {data?.land_trade_list.map((deal, index) => {
                  return (
                    <tr key={index}>
                      <Styled.DealListTD>{deal.deal_year + deal.deal_month.padStart(2, '0')}</Styled.DealListTD>
                      <Styled.DealListTD>{deal.deal_type}</Styled.DealListTD>
                      <Styled.DealListTD>
                        {Math.floor(deal.land_real_price).toLocaleString('ko-KR')}원
                      </Styled.DealListTD>
                      <Styled.DealListTD>{Math.floor(deal.deal_area).toLocaleString('ko-KR')}m²</Styled.DealListTD>
                      <Styled.DealListTD>
                        {parseInt(deal.land_real_price / deal.deal_area).toLocaleString('ko-KR') + '원/m²'}
                      </Styled.DealListTD>
                    </tr>
                  );
                })}
              </tbody>
            </Styled.DealList>
          )}
          <div style={{ marginBottom: '150px' }} />
        </Styled.Content>
      </Styled.Container>
    );
  }
};

export default LandDetail;
