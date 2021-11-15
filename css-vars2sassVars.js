const util = require("postcss-plugin-utilities");

//  use sass var instead of css var
function varToSass(object, variable) {
  if (!/^--\w/.test(variable)) return variable;
  return "$" + variable.substring(2);
}

module.exports = (
  options = {
    /**
     * this option is used to replace some libraries
     * not inject global vars in the root selector
     * like tailwind injected global vars in "*, :before, :after"
     * so if you using tailwind, set rootSelector = "*, :before, :after"
     */
    rootSelector: "",
  }
) => {
  return {
    postcssPlugin: "css-var-to-scss-var",
    Once(root, { result, Declaration }) {
      /**
       * extract global vars into top of file
       * if injected vars not in :root
       */
      if (options.rootSelector.length > 0) {
        let count = -1;
        root.walkRules(options.rootSelector, (rule) => {
          rule.walkDecls((decl) => {
            if (/^--\w/.test(decl.prop)) {
              if (count === -1) {
                root.prepend(decl);
                count++;
              } else {
                root.nodes[count++].after(decl);
              }
            }
          });
        });
      }

      /**
       * resolve vars depend order
       * resolve this
       * --var1:#fff;
       * --var2:var(--var1,--var3);
       * --var3:#f0f;
       *
       * to this
       * --var1:#fff;
       * --var2:var(#fff,#f0f);
       * --var3:#f0f
       */
      root.walkRules((rule) => {
        let declVarsObj = {};
        rule.walkDecls((decl) => {
          if (/^--\w/.test(decl.prop)) {
            declVarsObj[decl.prop] = decl.value;
            decl.remove();
          }
        });

        const allVarKeys = Object.keys(declVarsObj);
        allVarKeys.map((key) => {
          const res = declVarsObj[key].match(/(--[\w-]+)/g);
          if (res && res.length > 0) {
            res.map((_key) => {
              if (allVarKeys.includes(_key)) {
                declVarsObj[key] = declVarsObj[key]
                  .split(_key)
                  .join(declVarsObj[_key]);
              }
            });
          }
        });

        allVarKeys.map((key) => {
          const decl = new Declaration({
            prop: key,
            value: declVarsObj[key].replace(/\n/g, ""),
          });

          rule.prepend(decl);
        });
      });

      /**
       * extract global vars into top of file
       */
      let count = 0;
      root.walkRules(":root", (rule) => {
        rule.walkDecls((decl) => {
          if (/^--\w/.test(decl.prop)) {
            root.nodes[count++].after(decl);
          }
        });
      });

      root.walkDecls((decl) => {
        if (/^--\w/.test(decl.prop)) {
          decl.prop = "$" + decl.prop.substring(2);
        }
      });

      util.parseFunction(root, "var", varToSass);
    },
  };
};
module.exports.postcss = true;
