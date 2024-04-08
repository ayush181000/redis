const { createHash } = require("crypto");

const hash = (value) => {
  return createHash("sha256").update(value).digest("base64");
};

module.exports = hash;
