export default {
  post: {
    tags: ["Rider operations"], // operation's tag.
    description: "Add Rider Bike Details", // operation's desc.
    operationId: "addBikeDetails", // unique operation id
    parameters: [
      // expected params.
      {
        name: "vehicle_type", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "bike",
        },
        required: true, // Mandatory param
        description: "Vehicle type provided", // param desc.
      },
      {
        name: "plate_number", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "aaa-en39ej",
        },
        required: true, // Mandatory param
        description: "Plate number provided", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Bike Details added successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              message: {
                type: "String",
                example: "Bike details added successfully",
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
        description: "Error adding bike details", // response desc.
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
