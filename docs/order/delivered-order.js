export default {
  post: {
    tags: ["Order operations", "Rider operations"], // operation's tag.
    description: "Deliver New Order", // operation's desc.
    operationId: "deliverOrder", // unique operation id
    parameters: [
      // expected params.
      {
        name: "order_id", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "OO-27253",
        },
        required: true, // Mandatory param
        description: "Order id", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Order delivered", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              message: {
                type: "String",
                example: "order delivered",
              },
            },
          },
        },
      },
      401: {
        description: "Rider not authenticated", // response desc.
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
        description: "Error", // response desc.
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
