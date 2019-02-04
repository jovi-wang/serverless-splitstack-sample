const { REGION, IS_OFFLINE, DB_PREFIX } = require('../config/settings');

const dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
  region: REGION,
});

const offlineTest = IS_OFFLINE === 'true';
if (offlineTest) {
  dynamoose.local('http://localhost:4569');
}

if (process.env.IS_LOCALSTACK === 'true') {
  dynamoose.local('http://localstack:4569');
}

dynamoose.setDefaults({
  create: offlineTest, // Create table in DB, if it does not exist,
  update: offlineTest, // Update remote indexes if they do not match local index structure
  waitForActive: offlineTest, // Wait for table to be created before trying to use it
  waitForActiveTimeout: 10000, // wait for table to activate
  prefix: DB_PREFIX,
});

exports.queryOne = async (modelName, schema, queryParam) => {
  try {
    const model = dynamoose.model(modelName, schema);
    return await model.queryOne(queryParam).exec();
  } catch (err) {
    console.log('error in queryOne', modelName, queryParam, err);
    throw err;
  }
};
exports.queryOneComposite = async (modelName, schema, hashKeyParam, rangeKeyName, rangeKeyValue) => {
  try {
    const model = dynamoose.model(modelName, schema);
    return await model
      .queryOne(hashKeyParam)
      .where(rangeKeyName)
      .eq(rangeKeyValue)
      .exec();
  } catch (err) {
    console.log('error in queryOneComposite', modelName, hashKeyParam, rangeKeyName, rangeKeyValue, err);
    throw err;
  }
};
exports.saveOne = async (modelName, schema, saveParam) => {
  try {
    const Model = dynamoose.model(modelName, schema);
    return await new Model(saveParam).save();
  } catch (err) {
    console.log('error in saveOne', modelName, saveParam, err);
    throw err;
  }
};
// work for both single hashkey and composite key
exports.getOne = async (modelName, schema, keyParam) => {
  try {
    const model = dynamoose.model(modelName, schema);
    return await model.get(keyParam);
  } catch (err) {
    console.log('error in getOne', modelName, keyParam, err);
    throw err;
  }
};

exports.getAll = async (modelName, schema, keyArray) => {
  try {
    const model = dynamoose.model(modelName, schema);
    const chunkSize = 100;
    const arrayLength = keyArray.length;
    if (arrayLength <= chunkSize) {
      return await model.batchGet(keyArray);
    }
    // catering keyArray length larger than 100
    const promiseArray = [];
    for (let index = 0; index < arrayLength; index += chunkSize) {
      const chunkArray = keyArray.slice(index, index + chunkSize);
      promiseArray.push(model.batchGet(chunkArray));
    }
    const tempResult = await Promise.all(promiseArray);
    return [].concat(...tempResult);
  } catch (err) {
    console.log('error in getAll', modelName, keyArray, err);
    throw err;
  }
};
// check lastkey
exports.scanAll = async (modelName, schema, lastKey) => {
  try {
    const model = dynamoose.model(modelName, schema);
    if (lastKey) {
      return await model
        .scan()
        .startAt(lastKey)
        .exec();
    }
    return await model.scan().exec();
  } catch (err) {
    console.log('error in scanAll', modelName, lastKey, err);
    throw err;
  }
};
exports.updateOne = async (modelName, schema, keyParam, updateParams, condition) => {
  try {
    const model = dynamoose.model(modelName, schema);
    return await model.update(keyParam, updateParams, condition);
  } catch (err) {
    console.log('error in updateOne', modelName, keyParam, updateParams, condition, err);
    throw err;
  }
};
exports.removeOne = async (modelName, schema, keyParam) => {
  try {
    const model = dynamoose.model(modelName, schema);
    return await model.delete(keyParam);
  } catch (err) {
    console.log('error in removeOne', modelName, keyParam, err);
    throw err;
  }
};
exports.removeAll = async (modelName, schema, keyArray) => {
  try {
    const model = dynamoose.model(modelName, schema);
    return await model.batchDelete(keyArray);
  } catch (err) {
    console.log('error in removeAll', modelName, keyArray, err);
    throw err;
  }
};
// get all results with the same hashkey but different rangekey
exports.queryAll = async (modelName, schema, keyParam) => {
  try {
    const model = dynamoose.model(modelName, schema);
    return await model.query(keyParam).exec();
  } catch (err) {
    console.log('error in queryAll', modelName, keyParam, err);
    throw err;
  }
};
exports.saveAll = async (modelName, schema, objectArray) => {
  try {
    const model = dynamoose.model(modelName, schema);
    return await model.batchPut(objectArray);
  } catch (err) {
    console.log('error in saveAll', modelName, objectArray);
    throw err;
  }
};
