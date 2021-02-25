const { Text, Checkbox, Password } = require("@keystonejs/fields");
const { updateItem } = require("@keystonejs/server-side-graphql-client");
const { v4: uuidv4 } = require("uuid");

const access = require("../helpers/access");

module.exports = (keystone) => {
  const userList = keystone.createList("User", {
    fields: {
      name: { type: Text },
      email: {
        type: Text,
        isUnique: true,
      },
      googleId: { type: Text },
      isAdmin: {
        type: Checkbox,
        // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
        access: {
          update: access.userIsAdmin,
        },
      },
      password: {
        type: Password,
      },
      resetPassToken: {
        type: Text,
        access: () => false,
      },
    },
    // List-level access controls
    access: {
      read: access.userIsAdminOrOwner,
      update: access.userIsAdminOrOwner,
      delete: access.userIsAdmin,
      auth: true,
    },
  });

  keystone.extendGraphQLSchema({
    types: [
      {
        type: "type ResetPasswordOutput { success: Boolean }",
      },
    ],
    mutations: [
      {
        schema: "requestResetPassword(email: String!): ResetPasswordOutput",
        resolver: async (_, { email }) => {
          const { adapter } = userList;
          const user = await adapter.findOne({ email });

          if (user) {
            await adapter.update(user.id, { resetPassToken: uuidv4() });

            return { success: true };
          }

          return { success: false };
        },
      },
      {
        schema:
          "resetPassword(token: String!, password: String): ResetPasswordOutput",
        resolver: async (_, { token, password }) => {
          const { adapter } = userList;
          const user = await adapter.findOne({ resetPassToken: token });

          if (user) {
            await updateItem({
              keystone,
              listKey: "User",
              item: {
                id: user.id,
                data: {
                  password,
                  resetPassToken: null,
                },
              },
              returnFields: "id",
            });

            return { success: true };
          }

          return { success: false };
        },
      },
    ],
  });
};
