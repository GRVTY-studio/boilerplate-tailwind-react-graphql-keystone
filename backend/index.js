// Load .env config for development environments
require("dotenv").config();

const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");

const googleAuth = require("./helpers/googleAuth");
const passwordAuth = require("./helpers/passwordAuth");

const initialiseData = require("./initial-data");

const createUserSchema = require("./lists/User");
const createCompanySchema = require("./lists/Company");

const PROJECT_NAME = "boilerplate-tailwind-react-graphql-keystone";
const adapterConfig = {};

// Boot up Keystone
const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret: process.env.COOKIE_SECRET,
  onConnect: process.env.CREATE_TABLES !== "true" && initialiseData,
});

// Setup models
createUserSchema(keystone);
createCompanySchema(keystone);

// Enable Google Auth
googleAuth(keystone);

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy: passwordAuth(keystone),
    }),
  ],
};
