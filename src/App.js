import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Flip } from 'react-toastify';
import { fetchServerStatus } from '@api/serverStatus';
import HomePage from '@pages/HomePage';
import LoadingPage from '@pages/LoadingPage';
import LoginPage from '@pages/LoginPage';
import NotFoundPage from '@pages/NotFoundPage';
import SignUpPage from '@pages/SignUpPage';
import TimeoutPage from '@pages/TimeoutPage';
import { ModalProvider } from '@providers/ModalProvider';
import { StyledToastContainer } from '@styles/Toast.styles';
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
    return <LoadingPage />;
  } else if (!serverStatus) {
    return <TimeoutPage />;
  } else {
    return (
      <>
        <StyledToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          transition={Flip}
        />
        <ModalProvider>
          <Router>
            <Routes>
              <Route exact path={'/'} Component={HomePage} />
              <Route exact path={'/login'} Component={LoginPage} />
              <Route exact path={'/sign-up'} Component={SignUpPage} />
              <Route path={'*'} Component={NotFoundPage} />
            </Routes>
          </Router>
        </ModalProvider>
      </>
    );
  }
}

export default App;
