const rules = {
  username: /^[a-zA-Z0-9_]{5,32}$/,
  number: /^[0-9]*$/,
  token: /^[a-z0-9]{16}$/,
  email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  password: /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).{6,}|(?:(?=.*[A-Z])(?=.*[a-z])|(?=.*[A-Z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])|(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[0-9])(?=.*[^A-Za-z0-9])|).{6,18}$/,
}
exports.RegEx = {
  checkUserName (val) {
      return val && rules.username.test(val)
  },
  checkToken (token) {
      return token && rules.token.test(token)
  },
  checkEmail (email) {
      return email &&  rules.email.test(email)
  },
  checkPassword (pwd) {
      return pwd &&  rules.password.test(pwd)
  },
  checkNumber (n, min) {
      n = parseInt(n);
      min = min || 0
      return Number.isInteger(n) && n >= min;
  }
}