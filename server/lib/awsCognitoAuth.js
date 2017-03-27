var AWS = require('aws-sdk');
var cognitoidentity = new AWS.CognitoIdentity({
  region: 'us-east-1'
});
var Promise = require('bluebird');
var getOpenIdTokenForDeveloperIdentity = Promise.promisify(cognitoidentity.getOpenIdTokenForDeveloperIdentity).bind(cognitoidentity);
var localVars = require('./localvars.js');


exports.getCognitoToken = function(userId) {
  var params = {
    IdentityPoolId: localVars.IDENTITY_POOL_ID,
    Logins: {
      'passport.reactivity': userId.toString() 
    },
    // Token valid for 24 hours:
    TokenDuration: 86400
  };
  return getOpenIdTokenForDeveloperIdentity(params);
};
