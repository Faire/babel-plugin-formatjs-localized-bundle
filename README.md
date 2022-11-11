[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

# babel-plugin-formatjs-localized-bundle

A babel plugin to inline translations into compiled formatjs code.

<details open="open">
  <summary>Table of Contents</summary>
   <ul>
      <li><a href="#getting-started">Getting Started</a></li>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#options">Options</a></li>
      </ul>
      <li><a href="#building-multiple-languages">Building multiple languages</a></li>
   </ul>
</details>

## Getting Started

### Prerequisites

`@faire/babel-plugin-formatjs-localized-bundle` is hosted on :octocat:[GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package). To configure npm to download @faire packages from GitHub Packages registry you need to

1. Create a [personal access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) with the `read:packages` scope
2. Use the command below to add the personal access token to ~/.npmrc
   ```
   echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc
   ```
3. Use the command below to configure npm to download @faire packages from GitHub Packages registry
   ```
   npm config set @faire:registry https://npm.pkg.github.com
   ```

### Usage

Note: your babel configuration will need to be in a [Javascript configuration file](https://babeljs.io/docs/en/configuration#javascript-configuration-files)

To configure the plugin, add it as a babel plugin like the following:

```js
// Example of how you might load translations for a given locale
// translatedMessages could be an object or a path to an object ex. path.resolve(__dirname, `lang/{process.env.BUILD_LOCALE}.json`)
const translatedMessages = getTranslatedMessagesForLanguage(
  process.env.BUILD_LOCALE
);

module.exports = {
  plugins: [
    "@faire/babel-plugin-formatjs-localized-bundle",
    { translatedMessages }, // Options
  ],
};
```

### Options

#### translatedMessages (Required)

An object or string path to an object of key value pairs where the key represents a string ID and the value represents the translated message.

It is recommended to provide a path to a string that can be loaded by the plugin because it is more performant.

Translated messages can be either strings or compiled formatjs AST.

The values of this object should all be a single language.

Ex.

```json
{
  "welcome.message": "Hello",
  "button.cta": "Click me"
}
```

#### additionalFunctionNames (Optional)

Similar to [@formatjs/ts-transformer](https://formatjs.io/docs/tooling/ts-transformer#additionalfunctionnames), this allows you to specify additional function names to check besides `formatMessage`.

#### additionalComponentNames (Optional)

Similar to [@formatjs/ts-transformer](https://formatjs.io/docs/tooling/ts-transformer#additionalcomponentnames), this allows you to specify additional component names to check besides `FormatMessage`.

#### onUndefinedMessage (Optional)

Callback function for when an string ID is encountered without a corresponding entry in the translatedMessages object. In this scenario the plugin falls back to the source language.

## Building multiple languages

This plugin is intended to inline the translations of a single language into the bundle at a time.

If you are building a project that supports many languages, you can run multiple builds of your application with differing locale configurations (ex. differing environment variables).

An advantage of doing this in multiple builds is the ability to parallelize this work.

## Contributing

Issues and PRs are welcome!

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automate version management and package publishing, so make sure to follow the [commit message conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format) when contributing.
