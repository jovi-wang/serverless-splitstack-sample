let coldStart = true;
console.log('Hey, a cold start is happening in handler2');

exports.coldHandler = async (event, context) => {
  if (coldStart) {
    coldStart = false;
    console.log('first time handler2 execute');
  }
  // TODO implement
  const {time, uuid} = event.queryStringParameters;
  console.log(uuid, time);
  console.log('time difference', Date.now()- Number(time))
  return {
    statusCode: 200,
    body: JSON.stringify({
      requestId: context.awsRequestId,
      logGroupId: context.logStreamName,
      difference: Date.now()- Number(time)
    })
  };
};