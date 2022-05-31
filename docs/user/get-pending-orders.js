export default {
  get: {
    tags: ["User operations"], // operation's tag.
    description: "Get Pending Orders", // operation's desc.
    operationId: "getPendingOrders", // unique operation id
    parameters: [],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Orders found", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              type: "Array",
              $ref: "#/components/schemas/Order", // user data model
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
    },
  },
};
