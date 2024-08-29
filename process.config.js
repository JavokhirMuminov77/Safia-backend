const { watch } = require("fs-extra");

module.exports = {
  apps: [
    {
      name: "Safia",
      cwd: "./",
      script: "./dist/server.js",
      watch: false,
      env_production: {
       MONGO: 'mongodb+srv://javokhirmuminovdev:Javokhir7755@cluster0.mongodb.net/Obkeber-food?retryWrites=true&w=majority',
        
      },
      env_development: {
        NODE_ENV:'mongodb+srv://javokhirmuminovdev:Javokhir7755@cluster0.mongodb.net/Obkeber-food?retryWrites=true&w=majority',
      },
      instances: 1,
      exec_mode: "cluster",
    },
  ],
};


