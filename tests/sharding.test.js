const shardData = require('../sharding');

test('shardData function is defined', () => {
  expect(typeof shardData).toEqual('function');
});
