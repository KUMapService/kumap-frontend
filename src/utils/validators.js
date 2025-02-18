export const validateName = (name) => {
  return name.match(/^[ㄱ-ㅎ가-힣a-zA-Z]{2,20}$/);
};

export const validateNickname = (nickname) => {
  return nickname.match(/^[ㄱ-ㅎ가-힣a-zA-Z0-9]{1,12}$/);
};

export const validateEmail = (email) => {
  return email
    .toLowerCase()
    .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
};

export const validatePassword = (password) => {
  return password.match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9])(?!.*[<>()'#/\\\s]).{8,}$/);
};

export const validatePhone = (phone) => {
  return phone.match(/^01[0-9]-\d{3,4}-\d{4}$/);
};
