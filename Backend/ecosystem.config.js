module.exports = {
  apps: [
    {
      name: 'server1',
      script: 'server.js',
      env: {
        PORT: 3001
      }
    },
    {
      name: 'server2',
      script: 'server.js',
      env: {
        PORT: 3002
      }
    }
  ]
}
