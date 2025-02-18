import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import palette from '@constants/styles';

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    padding-right: 25px;
    background-color: ${palette.white500};
    color: ${palette.black500};
    font-family: 'kumap-medium';
    font-size: 15px;
  }
`;
