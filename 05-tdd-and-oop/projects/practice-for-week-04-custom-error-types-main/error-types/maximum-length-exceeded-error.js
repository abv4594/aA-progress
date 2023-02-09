const ValidationError = require('./validation-error');

class MaximumLengthExceededError extends ValidationError {
  constructor (dif, ...params) {

    super(...params);

   /* if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MaximumLengthExceededError);
    } */

    this.name = 'MaximumLengthExceededError'

    if (dif) {
      this.message = `Maximum length exceeded by ${dif}`
    } else {
      this.message = `Maximum length exceeded`
    }

  }
}

// Your code here

/****************************************************************************/
/******************* DO NOT EDIT CODE BELOW THIS LINE ***********************/

try {
  module.exports = MaximumLengthExceededError;
} catch {
  module.exports = null;
}