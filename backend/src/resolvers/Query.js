// Here db calls could be inserted e.g. from another REST API

const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
};

module.exports = Query;
