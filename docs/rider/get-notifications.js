export default {
  get: {
    tags: ["Rider operations"], // operation's tag.
    description: "Get Notifications", // operation's desc.
    operationId: "getNotifications", // unique operation id
    parameters: [],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Notifications found", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              type: "Array",
              $ref: "#/components/schemas/NotificationRider", // user data model
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
    },
  },
};
