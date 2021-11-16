const varConvert = require("./css-vars2sassVars");
const postcss = require("postcss");
const fs = require("fs");
const sass = require("node-sass");

/**
 * css-vars2value
 *
 * default options
 * @param rootSelector string  -          global vars inject selector
 * @param data string  - css              text
 * @param input string  - input           css file path
 * @param output string  - output         path
 * @params defaultVars - object           set default global vars
 * @params sassRenderOptions - object     send options to sass render
 */
module.exports = (opt) => {
  const options = Object.assign(
    {
      rootSelector: undefined,
      data: undefined,
      input: undefined,
      output: undefined,
      defaultVars: {
        "tw-empty": "none",
      },
      sassRenderOptions: {},
    },
    opt
  );
  const cssContent = options.data
    ? options.data
    : fs.readFileSync(options.input, "utf-8");

  if (!cssContent)
    throw new Error(
      "css-vars2value: cannot resolve css content, pls make sure provide data or input args"
    );

  let defaultValuesString = "";
  Object.keys(options.defaultVars).map((key) => {
    defaultValuesString += `$${key}:${options.defaultVars[key]};`;
  });

  const sassContent = postcss([
    varConvert({ rootSelector: options.rootSelector }),
  ]).process(cssContent).css;

  // fs.writeFileSync('./output.scss',sassContent)

  const result = sass.renderSync(
    Object.assign(options.sassRenderOptions, {
      data: `${defaultValuesString}${sassContent}`,
    })
  );

  return options.output
    ? fs.writeFileSync(options.output, result.css, "utf-8")
    : result.css;
};
