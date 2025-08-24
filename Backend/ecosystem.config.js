// module.exports = {
//   apps: [
//     {
//       name: 'server1',
//       script: 'server.js',
//       env: {
//         PORT: 3001
//       }
//     },
//     {
//       name: 'server2',
//       script: 'server.js',
//       env: {
//         PORT: 3002
//       }
//     }
//   ]
// }


// New one 

module.exports = {
  apps: [
    {
      name: "backend",
      script: "backend/server.js",
      instances: 2,
      exec_mode: "cluster"
    }
  ]
};
