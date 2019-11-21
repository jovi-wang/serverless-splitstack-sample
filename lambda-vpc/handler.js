
const AWS = require('aws-sdk');
const axios = require('axios');

AWS.config.update({
  region: process.env.AWS_REGION,
});
const docClient = new AWS.DynamoDB.DocumentClient();

const table = 'Movies';

const year = 2015;
const title = 'The Big New Movie';

const dynamodbParams = {
    TableName: table,
    Item: {
        year,
        title,
        info: {
            plot: 'Nothing happens at all.',
            rating: 0
        }
    }
};

const iotdata = new AWS.IotData({
  endpoint: process.env.MQTT_ENDPOINT,
  apiVersion: '2015-05-28',
  region: process.env.AWS_REGION // pull region from lambda's env variable, not defined in serverless.yml
});

exports.testHandler = async (event, context) => {
  console.log('Adding a new item...', event, context);
  console.log(1, new Date());
  const result = await docClient.put(dynamodbParams).promise();
  console.log('dynamodb', result);
  console.log(2, new Date());
  const postResult = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
  console.log('axios', postResult);
  console.log(3, new Date());
  const iotParams = {
    topic: process.env.TOPIC,
    payload: context.awsRequestId,
    qos: 0
  };
  await iotdata.publish(iotParams).promise();
  console.log(4, new Date());
  return ({
    statusCode: 200
  });
}
;
