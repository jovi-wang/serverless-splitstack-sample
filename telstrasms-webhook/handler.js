const request = require('request');
const util = require('util');

const requestPromise = util.promisify(request);

const {
  TELSTRA_SMS_HOST,
  TELSTRA_SMS_CLIENT_ID,
  TELSTRA_SMS_CLIENT_SECRET,
  RECEIVER_MOBILE_NUMBER
} = process.env;

const getToken = async () => {
  try {
    const options = {
      method: 'POST',
      url: `${TELSTRA_SMS_HOST}/v2/oauth/token`,
      headers:
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form:
      {
        client_id: TELSTRA_SMS_CLIENT_ID,
        client_secret: TELSTRA_SMS_CLIENT_SECRET,
        grant_type: 'client_credentials',
        scope: 'NSMS',
      }
    };


    const response = await requestPromise(options);
    return JSON.parse(response.body).access_token;
  } catch (err) {
    console.log('in getToken', err);
  }
};

exports.smsReceiver = async (event) => {
  try {
    const token = await getToken();
    const options =
    {
      method: 'POST',
      url: `${TELSTRA_SMS_HOST}/v2/messages/sms`,
      headers:
      {
        Authorization: `Bearer ${token}`
      },
      body:
      {
        to: RECEIVER_MOBILE_NUMBER,
        validity: '60',
        priority: true,
        body: event.body
      },
      json: true
    };

    await requestPromise(options);
  } catch (err) {
    console.log('in smsReceiver', err);
  }
};
