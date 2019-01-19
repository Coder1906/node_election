const rules = {
  username: /^[a-zA-Z0-9_]{5,32}$/,
  name: /^[a-zA-Z0-9\u4E00-\u9FA5_]{1,32}$/,
  uint: /^[0-9]+$/,
  token: /^[a-z0-9]{32}$/,
  email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  password: /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).{6,}|(?:(?=.*[A-Z])(?=.*[a-z])|(?=.*[A-Z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])|(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[0-9])(?=.*[^A-Za-z0-9])|).{6,18}$/,
	datetime: /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/,
}
exports.RegEx = {
  checkUserName (val) {
      return val && rules.username.test(val);
  },
  checkName (val) {
    return val && rules.name.test(val);
},
  checkToken (token) {
      return token && rules.token.test(token);
  },
  checkEmail (email) {
      return email && rules.email.test(email);
  },
  checkPassword (pwd) {
      return pwd && rules.password.test(pwd);
  },
  checkUint (val) {
    return typeof val != 'undefined' && rules.uint.test(val);
	},
	checkDateTime (val) {
		return typeof val != 'undefined' && rules.datetime.test(val);
	}
}