function shardData(data, numShards, keyFunc) {
  const shards = Array.from({ length: numShards }, () => []);

  data.forEach((item) => {
    const key = keyFunc(item);
    const shardIndex = hash(key) % numShards;
    shards[shardIndex].push(item);
  });

  return shards;
}

function hash(key) {
  return parseInt(key, 10);
}

function rebalanceData(currentServers, newNumServers, keyFunc) {
  const allData = currentServers.flat();
  return shardData(allData, newNumServers, keyFunc);
}

module.exports = {
  shardData,
  rebalanceData,
};
