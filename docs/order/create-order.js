export default {
  post: {
    tags: ["Order operations"], // operation's tag.
    description: "Create New Order", // operation's desc.
    operationId: "createOrder", // unique operation id
    parameters: [
      // expected params.
      {
        name: "description", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "New order description",
        },
        required: true, // Mandatory param
        description: "Description of order user provided", // param desc.
      },
      {
        name: "rider_id", // name of the param
        in: "body", // location of the param
        schema: {
          $ref: "#/components/schemas/_id",
        },
        required: true, // Mandatory param
        description: "_id of rider selected by user to deliver order", // param desc.
      },
      {
        name: "price", // name of the param
        in: "body", // location of the param
        schema: {
          type: "Number",
          example: "15000",
        },
        required: true, // Mandatory param
        description: "Price of order calculated by frontend", // param desc.
      },
      {
        name: "packages", // name of the param
        in: "body", // location of the param
        schema: {
          type: "Array",
          $ref: "#/components/schemas/_id",
        },
        required: true, // Mandatory param
        description: "Array of package _id, ordered by user", // param desc.
      },
      {
        name: "delivery_location", // name of the param
        in: "body", // location of the param
        schema: {
          type: "Object",
          $ref: "#/components/schemas/Location",
        },
        required: true, // Mandatory param
        description:
          "Delivery Location provided by user, if not provided use current location of user", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      201: {
        description: "Order created successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Order",
              message: {
                type: "String",
                example: "successful",
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
        description: "Error creating order", // response desc.
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
