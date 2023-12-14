require("dotenv").config();
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017";
require("./src/mongoose").initMongoose(dbUrl);
const debug = require("./src/debug");

const User = require("./models/User");

User.registerUser(
  process.env.ADMIN_EMAIL,
  process.env.ADMIN_PASSWORD,
  "Ad",
  "Min"
)
  .then(() => {
    debug("Admin user created");
    process.exit(0);
  })
  .catch((err) => {
    debug(err);
    process.exit(1);
  });
