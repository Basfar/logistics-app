export default {
  get: {
    tags: ["User operations", "Payment operations"], // operation's tag.
    description: "Get Wallet Balance", // operation's desc.
    operationId: "getWalletBalance", // unique operation id
    parameters: [],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Wallet balance", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/WalletBalance",
            },
          },
        },
      },
      401: {
        description: "User not authenticated", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/NotAuth", // error data model
            },
          },
        },
      },
      // response code
      404: {
        description: "Wallet not found", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error", // error data model
            },
          },
        },
      },
    },
  },
};
