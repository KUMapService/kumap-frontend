import { toast } from 'react-toastify';

const defaultToastOption = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  draggable: true,
  pauseOnHover: false,
  closeButton: false,
};

export const Toast = {
  info: (message, options = {}) => {
    toast.info(message, { ...defaultToastOption, icon: <Icon name="cart" stroke={white} />, ...options });
  },
  success: (message, options = {}) => {
    toast.success(message, { ...defaultToastOption, icon: <Icon name="check-circle" stroke={white} />, ...options });
  },
  error: (message, options = {}) => {
    toast.error(message, { ...defaultToastOption, icon: <Icon name="alert-triangle" stroke={white} />, ...options });
  },
};
