/* eslint-disable */
const NamingStrategy = require('typeorm-model-generator/dist/src/NamingStrategy');

// https://github.com/Kononnable/typeorm-model-generator/issues/171
NamingStrategy.entityName = function (entityName, entity) {
  // console.log(entityName, entity.database);
  return entityName;
};

// https://github.com/Kononnable/typeorm-model-generator/issues/236
NamingStrategy.fileName = function (fileName) {
  // https://docs.nestjs.com/openapi/cli-plugin
  // Add entity suffix for analysed in swagger plugin
  let camel = fileName.replace(/([-_]\w)/g, (g) => g[1].toUpperCase())
  camel = camel.charAt(0).toUpperCase() + camel.slice(1)
  return `${camel}.entity`
};

module.exports = {
  ...NamingStrategy,
};