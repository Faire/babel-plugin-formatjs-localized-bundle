const x = (
  <div>
    <LocalMsg id="AST" defaultMessage="Default message 1" />
    <LocalMsg id="FIRST_ID" defaultMessage="Default message 1" />
    <LocalMsg
      id="NEXT_ID"
      defaultMessage="Default message {variable} 2"
      values={{ variable: "22" }}
    />
    <LocalMsg
      values={{ variable: "33" }}
      defaultMessage="Default message {variable} 3"
    />
    <FormattedMessage defaultMessage="Default message 1" />
    <FormattedMessage
      defaultMessage="Default message {variable} 2"
      values={{ variable: "22" }}
    />
    <FormattedMessage
      id="FIRST_ID_FORMATTED"
      values={{ variable: "33" }}
      defaultMessage="Default message {variable} 3"
    />

    {localize({ defaultMessage: "Default message 4", id: "FIRST_ID_LOCALIZE" })}
    {localize(
      {
        defaultMessage: "Default message {variable} 5",
        id: "NEXT_ID_LOCALIZE",
      },
      { variable: "55" }
    )}
    {localize(
      { defaultMessage: "Default message {variable} 6", description: "A" },
      { variable: "66" }
    )}
    {localize(
      { description: "B", defaultMessage: "Default message {variable} 7" },
      { variable: "77" }
    )}
    {LocalizationStore.get().intl.formatMessage(
      {
        description: "B",
        defaultMessage: "Default message {variable} 7",
        id: "FIRST_ID_INTL",
      },
      { variable: "77" }
    )}
  </div>
);
