export default {
  get: {
    tags: ["Order operations", "User operations", "Rider operations"], // operation's tag.
    description: "Get Location", // operation's desc.
    operationId: "getLocation", // unique operation id
    parameters: [
      // expected params.
      {
        name: "location_id", // name of the param
        in: "query", // location of the param
        schema: {
          $ref: "#/components/schemas/_id", // user data model
          example: "6290b8a117bbcaf8b4df5788",
        },
        required: true, // Mandatory param
        description: "Location id", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Location found", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Location", // user data model
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
        description: "Location not found", // response desc.
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
