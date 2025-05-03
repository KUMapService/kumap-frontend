import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { BiLike } from 'react-icons/bi';
import { BiSolidLike } from 'react-icons/bi';
import { RiRoadsterFill } from 'react-icons/ri';

import { getCadastralMap } from '@api/geo';
import { patchLikeStatus } from '@api/user';
import { Loading } from '@components/Loading';
import LandDetail from '@components/Home/SideWindow/LandInfo/LandDetail';
import LandListing from '@components/Home/SideWindow/LandInfo/LandListing';
import palette from '@constants/styles';
import { useModal } from '@providers/ModalProvider';
import * as Styled from '@styles/Home/LandInfo.styles';
import { addCommas } from '@utils/formatter';

const LandInfo = ({ data }) => {
  //const dispatch = useDispatch();
  const isUserLogin = useSelector((state) => state.auth.isUserLogin);
  //const currentUser = useSelector((state) => state.auth.currentUser);
  const currentLandAddress = useSelector((state) => state.land.currentLandAddress);
  const [isInvalidData, setInvalidData] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [highValueLand, setHighValueLand] = useState(false);
  const [isLandLike, setLandLike] = useState(false);
  const [isRoadView, setRoadView] = useState(false);
  const latestData = useRef(null);
  const modal = useModal();

  useEffect(() => {
    const setSideWindowCadastral = (pnu) => {
      const interval = setInterval(async () => {
        const iframe = document.getElementsByClassName('side-window-map')[0];
        if (iframe?.contentWindow) {
          try {
            const response = await getCadastralMap({ pnu });
            iframe.contentWindow.postMessage({ polygons: response?.polygons, pnu: pnu }, '*');
            setLoading(false);
            setInvalidData(false);
          } catch (error) {
            toast.error(error);
            setInvalidData(true);
          } finally {
            clearInterval(interval);
          }
        } else {
          console.log('⏳ iframe not ready, waiting...');
        }
      }, 100); // 100ms 간격으로 체크
    };

    const handleMessage = (e) => {
      if (e.data?.type === 'ready') {
        // 사이드 윈도우 지도 설정
        setSideWindowCadastral(latestData.current?.pnu);
      }
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
    latestData.current = data;
  }, [data]);

  useEffect(() => {
    if (!data) return;

    if (currentLandAddress.pnu !== data?.pnu) {
      setLoading(true);
      // 좋아요 상태 설정
      setLandLike(data?.like);
      // 로드뷰 상태 설정
      setRoadView(false);
    } else {
      setLoading(false);
    }
    if (data?.predicted_price / data?.detail?.official_price > 1) {
      setHighValueLand(true);
    } else {
      setHighValueLand(false);
    }
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
          <Styled.RegisterButton
            onClick={() => modal.landListingCreate({ data: data })}
            disabled={data?.listing === null ? false : true}
            style={
              data?.listing === null
                ? { backgroundColor: palette.white500, color: palette.gray500 }
                : { backgroundColor: palette.gray500, color: palette.white500 }
            }
          >
            {data?.listing === null ? '매물 등록' : data?.listing?.nickname + '님의 토지'}
          </Styled.RegisterButton>
          <Styled.LikeCountText>{data?.like_count}명이 이 토지를 좋아합니다.</Styled.LikeCountText>
          {/* 경매일 경우 타경 표시 */}
          {/* {bidData !== null && (
					<Styled.BidCaseCdTxt>
						{bidCourtInCharge} {transCaseCd(bidCaseCd)}
					</Styled.BidCaseCdTxt>
					)} */}
          {/* 토지 주소 영역 */}
          <Styled.AddressText>{data?.address?.fulladdr}</Styled.AddressText>

          {/* 토지 매물 정보 영역 */}
          <LandListing data={data} />

          {/* 토지 예측가 영역 */}
          <Styled.DivLine />
          {data?.predicted_price !== null ? (
            <Styled.LandPriceBox>
              <Styled.MiniText>토지 예측가({data?.last_predicted_date} 기준)</Styled.MiniText>
              <Styled.LandPriceText style={highValueLand ? { color: palette.red500 } : { color: palette.blue500 }}>
                {Math.floor(data?.predicted_price * data?.detail?.land_area).toLocaleString('ko-KR')}원
              </Styled.LandPriceText>
              <Styled.LandPricePerText style={highValueLand ? { color: palette.red500 } : { color: palette.blue500 }}>
                {addCommas(data?.predicted_price)}원/m²당
              </Styled.LandPricePerText>
              <>
                <Styled.MiniText>
                  공시지가의{' '}
                  <Styled.MiniText style={highValueLand ? { color: palette.red500 } : { color: palette.blue500 }}>
                    {parseInt((data?.predicted_price / data?.detail?.official_price) * 100)}%
                  </Styled.MiniText>
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
          {/* TODO: 토지 경매 정보 영역 */}
          {/* 토지 특성 정보 영역 */}
          <LandDetail data={data} />
          <div style={{ marginBottom: '150px' }} />
        </Styled.Content>
      </Styled.Container>
    );
  }
};

export default LandInfo;
