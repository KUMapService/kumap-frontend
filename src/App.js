import { React, useEffect, useState } from 'react';
import { fetchServerStatus } from '@api/serverStatus';
import Home from '@pages/Home';
import Loading from '@pages/Loading';
import NotFound from '@pages/NotFound';
import Timeout from '@pages/Timeout';

import './App.css';

function App() {
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    fetchServerStatus()
      .then(function (response) {
        console.log(response);
        setServerStatus(true);
      })
      .catch(function () {
        setServerStatus(false);
      });
  }, []);

  if (serverStatus === null) {
    // 비동기 요청이 아직 완료되지 않음 (로딩 페이지)
    return <Loading />;
  } else if (!serverStatus) {
    return <Timeout />;
  } else {
    return (
      <Router>
        <Routes>
          <Route exact path={'/'} Component={Home} />
          <Route path={'*'} Component={NotFound} />
        </Routes>
      </Router>
    );
  }
}

export default App;
