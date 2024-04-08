const redisClient = require("./utils/redis");
const hashFn = require("./utils/hash");

const redisMiddleware = async (req, res, next) => {
  //check if redis is already running
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("redis connected");
  }

  // hash the url to make a key
  const hash = hashFn(req.url);

  // check for cache hit
  const cache = await redisClient.get(hash);
  if (cache) {
    console.log("cache hit");
    return res.send(JSON.parse(cache));
  }

  // if cache misses move to controller
  req.hash = hash;
  console.log("cache miss");
  next();
};

const setRedisCache = (key, value, expiry) => {
  redisClient.set(key, JSON.stringify(value), { EX: expiry * 60 });
  console.log("cache set");
};

module.exports = { redisMiddleware, setRedisCache };
