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
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
      // env_file: "backend/.env"  // <-- PM2 will load environment variables from .env
    }
  ]
};

