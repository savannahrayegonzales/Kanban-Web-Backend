/**
 * Validated that the data is in the proper format to minimize errors
 * @author Ruben Ruiz
 */

/**
 * Checks if the data entered in data is an email
 * @param {String} data 
 * @returns true if it is an email and false if it is anything else
 */
 function checkEmail(data) {

     isNull         = data == null;
     isAString      = typeof data == typeof "test";
     emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(isNull || !isAString) return false;
     return data.match(emailValidator);

 }

 // Exports
 module.exports.checkEmail = checkEmail;