export default {
  post: {
    tags: ["Order operations"], // operation's tag.
    description: "Create New Order", // operation's desc.
    operationId: "createOrder", // unique operation id
    parameters: [
      // expected params.
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/OrderInput",
          },
        },
        // param desc.
      },
    },
    // expected responses
    responses: {
      // response code
      201: {
        description: "Order created successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Order",
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
      500: {
        description: "Error creating order", // response desc.
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
