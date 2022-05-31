export default {
  post: {
    tags: ["Rider operations"], // operation's tag.
    description: "Rider Logout", // operation's desc.
    operationId: "logoutRider", // unique operation id
    parameters: [],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Logout successful", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              message: {
                type: "String",
                example: "Successfully logged out",
              },
            },
          },
        },
      },
    },
  },
};
