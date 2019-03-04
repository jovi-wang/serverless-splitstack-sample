module.exports.post = async (event) => {
  try {
    console.log(event)
    return {
      statusCode: 200,
      body: JSON.stringify({
      }),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 404
    }
  }
};

module.exports.get = async (event) => {
  try {
    console.log(event)
    return {
      statusCode: 200,
      body: JSON.stringify({
      }),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 404
    }
  }
};

module.exports.PostAuthentication= async (event) => {
  try {
    console.log(event);
    console.log ("Authentication successful");
    console.log ("Trigger function =", event.triggerSource);
    console.log ("User pool = ", event.userPoolId);
    console.log ("App client ID = ", event.callerContext.clientId);
    console.log ("User ID = ", event.userName);
    return event;
  } catch (err) {
    console.log(err)
    return {
      statusCode: 404
    }
  }
}