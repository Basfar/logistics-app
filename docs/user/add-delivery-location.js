export default {
  post: {
    tags: ["User operations"], // operation's tag.
    description: "Add User Delivery Location", // operation's desc.
    operationId: "addPDeliveryLocation", // unique operation id
    parameters: [
      // expected params.
      {
        name: "location_id", // name of the param
        in: "body", // location of the param
        "application/json": {
          schema: {
            type: "String",
            example: "home",
          },
        },
        required: true, // Mandatory param
        description: "Location id created by user Type String Example: home", // param desc.
      },
      {
        name: "location_name", // name of the param
        in: "body", // location of the param
        "application/json": {
          schema: {
            type: "String",
            example: "Home",
          },
        },
        required: true, // Mandatory param
        description: "Location name created by user", // param desc.
      },
      {
        name: "longitude", // name of the param
        in: "body", // location of the param
        "application/json": {
          schema: {
            type: "Double",
            example: "3.209383",
          },
        },
        required: true, // Mandatory param
        description: "Location longitude", // param desc.
      },
      {
        name: "latitude", // name of the param
        in: "body", // location of the param
        "application/json": {
          schema: {
            type: "Double",
            example: "6.104283",
          },
        },
        required: true, // Mandatory param
        description: "Location latitude", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Delivery Location added successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              message: {
                type: "String",
                example: "Delivery Location added successfully",
              },
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
        description: "Error adding delivery location", // response desc.
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
