const fs = require('fs');
const path = require('path');

// .env 파일 로드
require('dotenv').config();

// public/index.html 파일 경로
const indexPath = path.join(__dirname, '../public/index.html');

// index.html 파일 읽기
fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.html:', err);
    process.exit(1);
  }

  // 환경 변수 주입
  const result = data.replace(/%REACT_APP_KAKAO_MAP_API_KEY%/g, process.env.REACT_APP_KAKAO_MAP_API_KEY);

  // 수정된 내용을 index.html에 쓰기
  fs.writeFile(indexPath, result, 'utf8', (err) => {
    if (err) {
      console.error('Error writing index.html:', err);
      process.exit(1);
    }
    console.log('Environment variables injected into index.html');
  });
});
