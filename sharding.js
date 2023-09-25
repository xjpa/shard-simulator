function shardData(data, numServers) {
  const servers = Array.from({ length: numServers }, () => []);

  for (let i = 0; i < data.length; i++) {
    const serverIndex = i % numServers;
    servers[serverIndex].push(data[i]);
  }

  return servers;
}

function rebalanceData(currentServers, newNumServers) {
  const allData = currentServers.flat();
  return shardData(allData, newNumServers);
}

module.exports = {
  shardData,
  rebalanceData,
};
