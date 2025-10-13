export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "Avoid direct import of @playwright/test. Use fixtures instead.",
    },
    messages: {
      avoidDirectImport:
        "Do not import '@playwright/test' directly. Use fixtures instead.",
    },
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === "@playwright/test") {
          context.report({
            node,
            messageId: "avoidDirectImport",
          });
        }
      },
    };
  },
};
