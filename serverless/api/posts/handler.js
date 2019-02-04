const AWS = require('aws-sdk');

const uuid = require('uuid');
const { errorResponse } = require('../../helpers/helper');
const models = require('../../models')

module.exports.postsByUser = async event => {
    console.log(models.UserSchema);
  const dc = new AWS.DynamoDB.DocumentClient();
  let nextToken;
  let items = [];
  do {
    const result = await dc.query({
      TableName: process.env.POSTS_TABLE,
      ExclusiveStartKey: nextToken,
      IndexName: 'userId',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': event.requestContext.authorizer.principalId,
      },
    }).promise();
    nextToken = result.LastEvaluatedKey;
    const retrieved = result.Items.map(item => ({
      postId: item.postId,
      text: item.text,
    }));
    items = items.concat(retrieved);
  } while (nextToken);

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};

module.exports.postsCreate = async event => {
  let body;
  try {
    body = JSON.parse(event.body)
  } catch (err) { return errorResponse(400, 'bad body'); }

  if (!body.text) {
    return errorResponse(400, 'expected text')
  }

  const item = {
    postId: uuid.v4(),
    userId: event.requestContext.authorizer.principalId,
    text: body.text,
  };

  const dc = new AWS.DynamoDB.DocumentClient();
  await dc.put({
    Item: item,
    TableName: process.env.POSTS_TABLE,
  }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(item),
  }
};


module.exports.postsList = async event => {
    const dc = new AWS.DynamoDB.DocumentClient();
    let nextToken;
    let items = [];
    do {
      const result = await dc.scan({
        TableName: process.env.POSTS_TABLE,
        ExclusiveStartKey: nextToken,
      }).promise();
      nextToken = result.LastEvaluatedKey;
      const retrieved = result.Items.map(item => ({
        postId: item.postId,
        text: item.text,
      }));
      items = items.concat(retrieved);
    } while (nextToken);
  
    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  };
  