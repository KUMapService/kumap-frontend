import { Home } from '@components/Home';
import { verifyToken } from '@api/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 유저 토큰 검증
    verifyToken(dispatch);
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
};

export default HomePage;
