export default {
  post: {
    tags: ["Admin operations"], // operation's tag.
    description: "Remove Rider", // operation's desc.
    operationId: "removeRider", // unique operation id
    parameters: [
      // expected params.
      {
        name: "rider_id", // name of the param
        in: "body", // location of the param
        schema: {
          $ref: "#/components/schemas/_id",
        },
        required: true, // Mandatory param
        description: "_id of rider selected by admin to be removed", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Rider removed successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              message: {
                type: "String",
                example: "Rider removed successfully",
              },
            },
          },
        },
      },
      401: {
        description: "Admin not authenticated", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/NotAuth", // error data model
            },
          },
        },
      },
      404: {
        description: "Rider not found", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error", // error data model
            },
          },
        },
      },
      // response code
      500: {
        description: "Error removing rider", // response desc.
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
