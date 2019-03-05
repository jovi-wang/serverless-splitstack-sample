//import this incase webpack bundle in wrong sequence
require('../../../config/setting');
const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');
const uuid = require('uuid');
const { errorResponse } = require('../../../helpers/helper');
const { UserSchema } = require('../../../models');
const dbUtil = require('../../../utils/dbUtil');
// const _difference = require('lodash/difference');
// const _dropRight = require('lodash/dropRight');
require('lodash');



module.exports.testHandler = async (event) => {
  try {
    console.log(_difference([2, 1], [2, 3]));
    console.log(_dropRight([1, 2, 3]));
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