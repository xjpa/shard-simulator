const shardData = require('../sharding');
const sampleData = require('../data');

test('shardData function is defined', () => {
  expect(typeof shardData).toEqual('function');
});

test('data is sharded evenly', () => {
  const numServers = 2;
  const shardedData = shardData(sampleData, numServers);

  expect(shardedData[0].length).toBeCloseTo(sampleData.length / numServers, 0);
  expect(shardedData[1].length).toBeCloseTo(sampleData.length / numServers, 0);
});
