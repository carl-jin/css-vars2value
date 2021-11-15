const vars2value = require("../index");
const path = require("path");

vars2value({
  input: path.resolve(__dirname, "./index.css"),
  output: path.resolve(__dirname, "./output.css"),
  rootSelector: "*, :before, :after",
});
