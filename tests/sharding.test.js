const { shardData, rebalanceData } = require('../sharding');
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

test('data is rebalanced correctly when increasing servers', () => {
  const initialServers = shardData(sampleData, 2);
  const rebalancedServers = rebalanceData(initialServers, 4);

  expect(rebalancedServers.length).toEqual(4);
  expect(rebalancedServers.flat().length).toEqual(sampleData.length);
});

test('data is rebalanced correctly when decreasing servers', () => {
  const initialServers = shardData(sampleData, 4);
  const rebalancedServers = rebalanceData(initialServers, 2);

  expect(rebalancedServers.length).toEqual(2);
  expect(rebalancedServers.flat().length).toEqual(sampleData.length);
});
