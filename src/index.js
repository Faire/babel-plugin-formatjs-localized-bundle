module.exports = (babel, options) => {
  // If we do not have any messages to replace with, skip this step
  if (!options || !options.translatedMessages) {
    return {};
  }

  const additionalFunctionName = options.additionalFunctionNames || [];
  const additionalComponentNames = options.additionalComponentNames || [];
  const functionNames = ["formatMessage", ...additionalFunctionName];
  const componentNames = ["FormattedMessage", ...additionalComponentNames];

  // Messages are expected to be an object of form {[id: string]: string | AST}
  // translatedMessages can either be an object or a path to an object
  const messages =
    typeof options.translatedMessages === "string"
      ? require(options.translatedMessages)
      : options.translatedMessages;

  const replaceMessageInPath = (path, argPosition) => {
    const args = path.get("arguments");
    if (!args) {
      return;
    }
    const arg = args[argPosition];
    if (!arg) {
      return;
    }
    if (!arg.has("properties")) {
      return;
    }
    const properties = arg.get("properties");
    const defaultMessageProp = properties.find(
      (p) =>
        p.has("key") && p.get("key").isIdentifier({ name: "defaultMessage" })
    );
    if (!defaultMessageProp || !defaultMessageProp.get("value")) {
      return;
    }

    const idMessageProperty = properties.find(
      (p) => p.has("key") && p.get("key").isIdentifier({ name: "id" })
    );

    if (
      !(
        idMessageProperty &&
        idMessageProperty.has("value") &&
        idMessageProperty.get("value").node &&
        idMessageProperty.get("value").node.value
      )
    ) {
      return;
    }

    const messageId = idMessageProperty.get("value").node.value;
    const messageValue = messages[messageId];
    if (!messageValue) {
      if (options.onUndefinedMessage) {
        options.onUndefinedMessage(messageId);
      }
      return;
    }

    defaultMessageProp
      .get("value")
      .replaceWithSourceString(JSON.stringify(messageValue));
  };

  return {
    name: "babel-plugin-formatjs-localized-bundle",
    visitor: {
      CallExpression(path) {
        if (!path) {
          return;
        }

        const { node } = path;
        if (
          !(
            node.callee &&
            (additionalFunctionName.includes(node.callee.name) ||
              (node.callee.property &&
                functionNames.includes(node.callee.property.name)) ||
              // This check handles pre-compiled babel code, used to extract
              // messages from our shared dependencies
              (node.callee.expressions &&
                node.callee.expressions.some(
                  (e) =>
                    e.property &&
                    additionalFunctionName.includes(e.property.name)
                )))
          )
        ) {
          return;
        }

        replaceMessageInPath(path, 0);
      },

      Identifier(path) {
        if (!path) {
          return;
        }

        if (!componentNames.includes(path.node.name)) {
          return;
        }

        const parent = path.findParent((i) => i);
        if (!parent) {
          return;
        }
        replaceMessageInPath(parent, 1);
      },
    },
  };
};
