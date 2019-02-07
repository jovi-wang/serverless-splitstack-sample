//import this incase webpack bundle in wrong sequence
require('../../../config/setting');
const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');
const uuid = require('uuid');
const { errorResponse } = require('../../../helpers/helper');
const { UserSchema } = require('../../../models');
const dbUtil = require('../../../utils/dbUtil');




module.exports.testHandler = async (event) => {
  try {
    const dbResults = await dbUtil.getOne('User', UserSchema, {email:'abc@test.com', sub: 'sub-abc'});
    console.log(dbResults)
    return {
      statusCode: 200,
      body: JSON.stringify({
        dbResults
      }),
    }
  } catch (err) {
    console.log(err);
    return errorResponse('unknown user');
  }
};