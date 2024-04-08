const { createClient } = require("redis");

let client = null;
try {
  client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });
} catch (error) {
  console.log(error);
}

module.exports = client;
