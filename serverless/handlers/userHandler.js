const jsonwebtoken = require('jsonwebtoken');
const AWS = require('aws-sdk');
const crypto = require('crypto');
const uuid = require('uuid');
const { errorResponse } = require('../helpers/helper');
const dbUtil = require('../utils/dbUtil');
const { UserSchema } = require('../models');

module.exports.token = async event => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    return errorResponse(400, 'bad body');
  }
  if (!body.userId || !body.password) {
    return errorResponse(400, 'missing userId or password');
  }
  const dc = new AWS.DynamoDB.DocumentClient();
  const result = await dc.get({
    TableName: process.env.USERS_TABLE,
    Key: {
      userId: body.userId,
    },
  }).promise();
  if (!result.Item) {
    return errorResponse('unknown user');
  }
  const { salt, password } = result.Item.secret;
  const verify = crypto.pbkdf2Sync(body.password, salt, 100000, 64, 'sha512');
  if (verify.equals(password)) {
    const token = jsonwebtoken.sign({ sub: body.userId }, process.env.SECRET, { expiresIn: '7 days' });
    return {
      statusCode: 200,
      body: JSON.stringify({
        token
      }),
    }
  } else {
    return errorResponse(401, 'bad password');
  }

};

module.exports.userCreate = async event => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const userId = uuid.v4();
  const body = JSON.parse(event.body);

  const salt = crypto.randomBytes(16);
  const password = crypto.pbkdf2Sync(body.password, salt, 100000, 64, 'sha512')
  const item = Object.assign({}, {
    userId,
    name: body.name || 'Test User',
    secret: {
      password,
      salt,
    }
  });
  const result = await dynamo.put({
    Item: item,
    TableName: process.env.USERS_TABLE,
  }).promise();
  delete item.secret;
  return {
    statusCode: 200,
    body: JSON.stringify(item),
  }
};

module.exports.testHandler = async (event) => {
  try {
    console.log(UserSchema)
    const dbResults = await dbUtil.scanAll('devUser', UserSchema);
    console.log(dbResults)
    return {
      statusCode: 200,
      body: JSON.stringify({
        dbResults
      }),
    }
  } catch (err) {
    console.log(err);
  }
};