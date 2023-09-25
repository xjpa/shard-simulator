function shardData(data, numServers) {
  const servers = Array.from({ length: numServers }, () => []);

  for (let i = 0; i < data.length; i++) {
    const serverIndex = i % numServers;
    servers[serverIndex].push(data[i]);
  }

  return servers;
}

module.exports = shardData;
