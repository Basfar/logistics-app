export default {
  get: {
    tags: ["Order operations"], // operation's tag.
    description: "Get Package", // operation's desc.
    operationId: "getPackage", // unique operation id
    parameters: [
      // expected params.
      {
        name: "package_id", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "g3d4y5yur7",
        },
        required: true, // Mandatory param
        description: "Package id", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Package found", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Package", // user data model
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
        description: "Package not found", // response desc.
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
