const password = require('secure-random-password');

const result = password.randomPassword({
  length: 16,
});

console.log(result);
