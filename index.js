const KsCryp = require("./src/KsCryp");
const KsDriver = require("./src/KsDriver");
const lib = new KsCryp();
lib.KsDriver = KsDriver;
module.exports = lib;