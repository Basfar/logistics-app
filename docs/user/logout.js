export default {
  post: {
    tags: ["User operations"], // operation's tag.
    description: "User Logout", // operation's desc.
    operationId: "logoutUser", // unique operation id
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
              $ref: "#/components/schemas/LogoutResponse",
            },
          },
        },
      },
    },
  },
};
