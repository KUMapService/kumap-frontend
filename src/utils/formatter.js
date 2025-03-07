export const numberFormat = (number) => {
  if (!number) {
    return '없음';
  }
  // 조 단위 포멧팅
  if (Math.floor(number / 1000000000000) !== 0) {
    return Math.floor(number / 1000000000000).toLocaleString('ko-KR') + '조';
  }
  // 억 단위 포멧팅
  else if (Math.floor(number / 100000000) !== 0) {
    return Math.floor(number / 100000000).toLocaleString('ko-KR') + '억';
  }
  // 만 단위 포멧팅
  else if (Math.floor(number / 10000) !== 0) {
    return Math.floor(number / 10000).toLocaleString('ko-KR') + '만';
  }
  // 그 외
  else {
    return Math.floor(number).toLocaleString('ko-KR');
  }
};
