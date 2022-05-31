export default {
  post: {
    tags: ["Admin operations"], // operation's tag.
    description: "Create New Package", // operation's desc.
    operationId: "createPackage", // unique operation id
    parameters: [
      // expected params.
      {
        name: "description", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "New package description",
        },
        required: true, // Mandatory param
        description: "Description of package admin provided", // param desc.
      },
      {
        name: "quantity", // name of the param
        in: "body", // location of the param
        schema: {
          type: "Number",
          example: "10",
        },
        required: true, // Mandatory param
        description: "quantity of package available", // param desc.
      },
      {
        name: "price", // name of the param
        in: "body", // location of the param
        schema: {
          type: "Number",
          example: "15000",
        },
        required: true, // Mandatory param
        description: "Price of package", // param desc.
      },
      {
        name: "pickup_location", // name of the param
        in: "body", // location of the param
        schema: {
          type: "Object",
          $ref: "#/components/schemas/Location",
        },
        required: true, // Mandatory param
        description: "Location of package", // param desc.
      },
      {
        name: "package_name", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "iPhone X",
        },
        required: true, // Mandatory param
        description: "Name of package", // param desc.
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
              $ref: "#/components/schemas/Package",
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
        description: "Error creating package", // response desc.
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
