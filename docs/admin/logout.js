export default {
  post: {
    tags: ["Admin operations"], // operation's tag.
    description: "Admin Logout", // operation's desc.
    operationId: "logoutAdmin", // unique operation id
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
