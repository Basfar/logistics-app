export default {
  post: {
    tags: ["Admin operations"], // operation's tag.
    description: "Increase Package Quantity", // operation's desc.
    operationId: "incPackageQuantity", // unique operation id
    parameters: [
      // expected params.
      {
        name: "quantity", // name of the param
        in: "body", // location of the param
        schema: {
          type: "Number",
          example: "10",
        },
        required: true, // Mandatory param
        description: "amount to increase quantity of package available", // param desc.
      },
      {
        name: "package_id", // name of the param
        in: "body", // location of the param
        schema: {
          $ref: "#/components/schemas/_id",
        },
        required: true, // Mandatory param
        description: "package _id", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      201: {
        description: "Package created successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              quantity: {
                type: "Number",
                example: "20",
              },
              message: {
                type: "String",
                example: "successful",
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
      // response code
      500: {
        description: "Error increasing package quantity", // response desc.
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
