import { Home } from '@components/Home';
import { verifyToken } from '@api/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 유저 토큰 검증
    const verify = async () => {
      try {
        await verifyToken(dispatch);
      } catch (error) {
        toast.error(error);
      }
    };
    verify();
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
};

export default HomePage;
