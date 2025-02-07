import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchServerStatus } from '@api/serverStatus';
import HomePage from '@pages/Home';
import LoadingPage from '@pages/Loading';
import NotFoundPage from '@pages/NotFound';
import TimeoutPage from '@pages/Timeout';

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
    return <LoadingPage />;
  } else if (!serverStatus) {
    return <TimeoutPage />;
  } else {
    return (
      <Router>
        <Routes>
          <Route exact path={'/'} Component={HomePage} />
          <Route path={'*'} Component={NotFoundPage} />
        </Routes>
      </Router>
    );
  }
}

export default App;
