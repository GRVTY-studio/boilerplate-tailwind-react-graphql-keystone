const { Text } = require("@keystonejs/fields");

module.exports = (keystone) => {
  keystone.createList("Company", {
    fields: {
      name: { type: Text },
      tradeName: { type: Text },
    },
  });
};
