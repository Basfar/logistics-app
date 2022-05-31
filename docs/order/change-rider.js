export default {
  post: {
    tags: ["Order operations", "User operations"], // operation's tag.
    description: "Change Rider for Order", // operation's desc.
    operationId: "changeRider", // unique operation id
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
      {
        name: "rider_id", // name of the param
        in: "body", // location of the param
        schema: {
          $ref: "#/components/schemas/_id", // user data model
          example: "6290b8a117bbcaf8b4df5788",
        },
        required: true, // Mandatory param
        description: "Rider _id", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Rider changed", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              message: {
                type: "String",
                example: "rider changed successfully",
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
        description: "Error changing rider", // response desc.
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
