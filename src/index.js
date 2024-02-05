module.exports = (babel, options) => {
  // If we do not have any messages to replace with, skip this step
  if (!options || !options.translatedMessages) {
    return {};
  }

  // Messages are expected to be an object of form {[id: string]: string | AST}
  // translatedMessages can either be an object or a path to an object
  const messages =
    typeof options.translatedMessages === "string"
      ? require(options.translatedMessages)
      : options.translatedMessages;

  const replaceMessageInPath = (path) => {
    const properties = path.get("properties");
    const defaultMessageProp = properties?.find(
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
      Identifier(path) {
        if (!path) {
          return;
        }

        const { node } = path;
        if (node.name !== "defaultMessage") {
          return;
        }

        const parent = path.findParent((i) => i)?.findParent((i) => i);
        if (!parent) {
          return;
        }
        replaceMessageInPath(parent);
      },
    },
  };
};
