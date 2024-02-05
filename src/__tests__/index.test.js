const { transformFileSync } = require("@babel/core");
const plugin = require("../index");
const path = require("path");

describe("babel-plugin-formatjs-localized-bundle", () => {
  test("transpiles all types of messages", function () {
    expect(
      transformFileSync(
        path.resolve(__dirname, "..", "__fixtures__", "normal", "code.js"),
        {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  node: "14",
                  esmodules: true,
                },
                modules: false,
                useBuiltIns: false,
                ignoreBrowserslistConfig: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            [
              plugin,
              {
                translatedMessages: require(path.resolve(
                  __dirname,
                  "..",
                  "__fixtures__",
                  "normal",
                  "mockMessages.js"
                )),
              },
            ],
          ],
        }
      ).code
    ).toMatchSnapshot();
  });

  test("transpiles all types of messages from messages path", function () {
    expect(
      transformFileSync(
        path.resolve(__dirname, "..", "__fixtures__", "normal", "code.js"),
        {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  node: "14",
                  esmodules: true,
                },
                modules: false,
                useBuiltIns: false,
                ignoreBrowserslistConfig: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            [
              plugin,
              {
                translatedMessages: path.resolve(
                  __dirname,
                  "..",
                  "__fixtures__",
                  "normal",
                  "mockMessages.js"
                ),
              },
            ],
          ],
        }
      ).code
    ).toMatchSnapshot();
  });

  test("exits gracefully when there are no translations", function () {
    expect(
      transformFileSync(
        path.resolve(
          __dirname,
          "..",
          "__fixtures__",
          "no-translations",
          "code.js"
        ),
        {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  node: "14",
                  esmodules: true,
                },
                modules: false,
                useBuiltIns: false,
                ignoreBrowserslistConfig: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [[plugin, {}]],
        }
      ).code
    ).toMatchSnapshot();
  });

  test("transformers code that has been compiled by babel", function () {
    expect(
      transformFileSync(
        path.resolve(
          __dirname,
          "..",
          "__fixtures__",
          "pre-compiled",
          "code.js"
        ),
        {
          plugins: [
            [
              plugin,
              {
                translatedMessages: require(path.resolve(
                  __dirname,
                  "..",
                  "__fixtures__",
                  "pre-compiled",
                  "mockMessages.js"
                )),
              },
            ],
          ],
        }
      ).code
    ).toMatchSnapshot();
  });

  test("Calls callback when there are no translations", function () {
    const onUndefinedMessage = jest.fn();

    transformFileSync(
      path.resolve(
        __dirname,
        "..",
        "__fixtures__",
        "no-translations",
        "code.js"
      ),
      {
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                node: "14",
                esmodules: true,
              },
              modules: false,
              useBuiltIns: false,
              ignoreBrowserslistConfig: true,
            },
          ],
          "@babel/preset-react",
        ],
        plugins: [
          [
            plugin,
            {
              onUndefinedMessage,
              translatedMessages: require(path.resolve(
                __dirname,
                "..",
                "__fixtures__",
                "pre-compiled",
                "mockMessages.js"
              )),
            },
          ],
        ],
      }
    );

    expect(onUndefinedMessage).toHaveBeenCalled();
  });

  test("Compiles when there is no callback and no translations to match the IDs", function () {
    expect(
      transformFileSync(
        path.resolve(
          __dirname,
          "..",
          "__fixtures__",
          "no-translations",
          "code.js"
        ),
        {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  node: "14",
                  esmodules: true,
                },
                modules: false,
                useBuiltIns: false,
                ignoreBrowserslistConfig: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            [
              plugin,
              {
                translatedMessages: require(path.resolve(
                  __dirname,
                  "..",
                  "__fixtures__",
                  "no-translations",
                  "mockMessages.js"
                )),
              },
            ],
          ],
        }
      ).code
    ).toMatchSnapshot();
  });

  test("transformers code that has been compiled by nextjs", function () {
    expect(
      transformFileSync(
        path.resolve(
          __dirname,
          "..",
          "__fixtures__",
          "pre-compiled-nextjs",
          "code.js"
        ),
        {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  node: "14",
                  esmodules: true,
                },
                modules: false,
                useBuiltIns: false,
                ignoreBrowserslistConfig: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            [
              plugin,
              {
                translatedMessages: require(path.resolve(
                  __dirname,
                  "..",
                  "__fixtures__",
                  "pre-compiled-nextjs",
                  "mockMessages.js"
                )),
              },
            ],
          ],
        }
      ).code
    ).toMatchSnapshot();
  });
});
