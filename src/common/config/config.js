/* 
 * Configuration File
 */

//URL from api to test api resources
var API_URL = 'http://apitest.mequedouno.com/shops';

//Send custom header in your request and response headers
//Used for example to send auth-cookies in headers
var USE_CUSTOM_HEADER = false;
var CUSTOM_HEADER = 'Accept-Language';


//To test login with facebook you need to setup krangular.com as your local virtualhost
//to obtain login responses , try it!
var LOGIN_FACEBOOK_REDIRECT_URI = "http://develjitsu.com:9000/auth/facebook/";
var LOGIN_FACEBOOK_CLIENT_ID    = "1601939936740503";
var LOGIN_FACEBOOK_SCOPE        = ["email"];
