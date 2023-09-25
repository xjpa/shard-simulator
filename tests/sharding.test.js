const { shardData, rebalanceData } = require('../sharding');
const sampleData = require('../data');

test('shardData function is defined', () => {
  expect(typeof shardData).toEqual('function');
});

test('data is sharded based on keys', () => {
  const numServers = 3;
  const shardedData = shardData(sampleData, numServers, (item) =>
    item.id.toString()
  );

  shardedData.forEach((shard, index) => {
    shard.forEach((item) => {
      // Verify the item's sharded correctly based on its key
      expect(index).toEqual(item.id % numServers);
    });
  });
});

test('data is sharded reasonably evenly', () => {
  const numServers = 2;
  const shardedData = shardData(sampleData, numServers, (item) =>
    item.id.toString()
  );

  // Allow for +/- 1 item difference between shards
  const maxAllowedDifference = 1;
  const difference = Math.abs(shardedData[0].length - shardedData[1].length);

  expect(difference).toBeLessThanOrEqual(maxAllowedDifference);
});

test('data is rebalanced correctly when increasing servers', () => {
  const initialServers = shardData(sampleData, 2, (item) => item.id.toString());
  const rebalancedServers = rebalanceData(initialServers, 4, (item) =>
    item.id.toString()
  );

  expect(rebalancedServers.length).toEqual(4);
  expect(rebalancedServers.flat().length).toEqual(sampleData.length);
});

test('data is rebalanced correctly when decreasing servers', () => {
  const initialServers = shardData(sampleData, 4, (item) => item.id.toString());
  const rebalancedServers = rebalanceData(initialServers, 2, (item) =>
    item.id.toString()
  );

  expect(rebalancedServers.length).toEqual(2);
  expect(rebalancedServers.flat().length).toEqual(sampleData.length);
});
