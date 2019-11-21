console.log('Hey, a cold start is happening for handler1');

exports.coldHandler = async (event, context) => {
  console.log(event);
  /*
  { resource: '/hander',
    path: '/hander',
    httpMethod: 'POST',
    headers: null,
    multiValueHeaders: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: null,
    stageVariables: null,
    requestContext: 
    { path: '/hander',
    accountId: '471402393260',
    resourceId: 'bizjbc',
    stage: 'test-invoke-stage',
    domainPrefix: 'testPrefix',
    requestId: 'f67e8885-576d-11e9-ba94-d3c699931e5d',
    identity: 
    { cognitoIdentityPoolId: null,
    cognitoIdentityId: null,
    apiKey: 'test-invoke-api-key',
    cognitoAuthenticationType: null,
    userArn: 'arn:aws:iam::471402393260:user/jovi.wang@team.telstra.com',
    apiKeyId: 'test-invoke-api-key-id',
    userAgent: 'aws-internal/3 aws-sdk-java/1.11.498 Linux/4.9.137-0.1.ac.218.74.329.metal1.x86_64 OpenJDK_64-Bit_Server_VM/25.202-b08 java/1.8.0_202',
    accountId: '471402393260',
    caller: 'AIDAICEWMG2AMBLPBB532',
    sourceIp: 'test-invoke-source-ip',
    accessKey: 'xxx',
    cognitoAuthenticationProvider: null,
    user: 'AIDAICEWMG2AMBLPBB532' },
    domainName: 'testPrefix.testDomainName',
    resourcePath: '/hander',
    httpMethod: 'POST',
    extendedRequestId: 'XpvQCGw9SwMFpEQ=',
    apiId: 'jiz78judpc' },
    body: null,
    isBase64Encoded: false }
*/
  console.log(context);
  const temp = { resource: '/handler',
  path: '/handler',
  httpMethod: 'GET',
  headers: 
  { Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6,fr;q=0.5,es;q=0.4,zh-TW;q=0.3',
  'cache-control': 'max-age=0',
  'CloudFront-Forwarded-Proto': 'https',
  'CloudFront-Is-Desktop-Viewer': 'true',
  'CloudFront-Is-Mobile-Viewer': 'false',
  'CloudFront-Is-SmartTV-Viewer': 'false',
  'CloudFront-Is-Tablet-Viewer': 'false',
  'CloudFront-Viewer-Country': 'AU',
  Host: 'i258ghqzgh.execute-api.ap-southeast-1.amazonaws.com',
  'upgrade-insecure-requests': '1',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
  Via: '2.0 d398d998fe529d4555e659e3cb967b47.cloudfront.net (CloudFront)',
  'X-Amz-Cf-Id': 'efqtrDzXYnp4zNGz02ewevnU3W46RRLjPXGt1cSXcMNenwE2-hLqvA==',
  'X-Amzn-Trace-Id': 'Root=1-5cc928ba-097088cf2b230c4cf9efc65e',
  'X-Forwarded-For': '1.152.105.248, 54.239.202.82',
  'X-Forwarded-Port': '443',
  'X-Forwarded-Proto': 'https' },
  multiValueHeaders: 
  { Accept: 
  [ 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' ],
  'Accept-Encoding': [ 'gzip, deflate, br' ],
  'Accept-Language': 
  [ 'en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6,fr;q=0.5,es;q=0.4,zh-TW;q=0.3' ],
  'cache-control': [ 'max-age=0' ],
  'CloudFront-Forwarded-Proto': [ 'https' ],
  'CloudFront-Is-Desktop-Viewer': [ 'true' ],
  'CloudFront-Is-Mobile-Viewer': [ 'false' ],
  'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
  'CloudFront-Is-Tablet-Viewer': [ 'false' ],
  'CloudFront-Viewer-Country': [ 'AU' ],
  Host: [ 'i258ghqzgh.execute-api.ap-southeast-1.amazonaws.com' ],
  'upgrade-insecure-requests': [ '1' ],
  'User-Agent': 
  [ 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36' ],
  Via: 
  [ '2.0 d398d998fe529d4555e659e3cb967b47.cloudfront.net (CloudFront)' ],
  'X-Amz-Cf-Id': [ 'efqtrDzXYnp4zNGz02ewevnU3W46RRLjPXGt1cSXcMNenwE2-hLqvA==' ],
  'X-Amzn-Trace-Id': [ 'Root=1-5cc928ba-097088cf2b230c4cf9efc65e' ],
  'X-Forwarded-For': [ '1.152.105.248, 54.239.202.82' ],
  'X-Forwarded-Port': [ '443' ],
  'X-Forwarded-Proto': [ 'https' ] },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: 
  { resourceId: 'sj2bcp',
  resourcePath: '/handler',
  httpMethod: 'GET',
  extendedRequestId: 'Y_NNJG_qyQ0Ftgw=',
  requestTime: '01/May/2019:05:03:54 +0000',
  path: '/dev/handler',
  accountId: '471402393260',
  protocol: 'HTTP/1.1',
  stage: 'dev',
  domainPrefix: 'i258ghqzgh',
  requestTimeEpoch: 1556687034504,
  requestId: '84af8094-6bce-11e9-9d12-d3c5f0fa196c',
  identity: 
  { cognitoIdentityPoolId: null,
  accountId: null,
  cognitoIdentityId: null,
  caller: null,
  sourceIp: '1.152.105.248',
  accessKey: null,
  cognitoAuthenticationType: null,
  cognitoAuthenticationProvider: null,
  userArn: null,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
  user: null },
  domainName: 'i258ghqzgh.execute-api.ap-southeast-1.amazonaws.com',
  apiId: 'i258ghqzgh' },
  body: null,
  isBase64Encoded: false }
  /*
  { callbackWaitsForEmptyEventLoop: [Getter/Setter],
    done: [Function: done],
    succeed: [Function: succeed],
    fail: [Function: fail],
    logGroupName: '/aws/lambda/lambda-warmup-dev-coldHandler1',
    logStreamName: '2019/04/05/[$LATEST]c6c5e3f0e4714af5a611d8a1a38a0442',
    functionName: 'lambda-warmup-dev-coldHandler1',
    memoryLimitInMB: '1024',
    functionVersion: '$LATEST',
    getRemainingTimeInMillis: [Function: getRemainingTimeInMillis],
    invokeid: '8c6bf35b-6353-4f7d-9d5c-761ed1c2ee3e',
    awsRequestId: '8c6bf35b-6353-4f7d-9d5c-761ed1c2ee3e',
    invokedFunctionArn: 'arn:aws:lambda:ap-southeast-2:471402393260:function:lambda-warmup-dev-coldHandler1' }
  */
  if (event.source === 'serverless-plugin-warmup') {
    console.log('WarmUp - Lambda is warm for handler1');
    return;
  }
  let i = 0;
  while(i< 1000000000){
    i+=1;
  }
  return {
    statusCode: 200
  };
};
