export default {
  post: {
    tags: ["Order operations", "User operations"], // operation's tag.
    description: "Change Rider for Order", // operation's desc.
    operationId: "changeRider", // unique operation id
    parameters: [
      // expected params.
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ChangeRider",
          },
        },
        // param desc.
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Rider changed", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Success",
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
