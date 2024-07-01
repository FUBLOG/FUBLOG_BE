const bcrypt = require("bcrypt");

async function test() {
  const salt = await bcrypt.hash("123456",10);
  const check = await bcrypt.compare("123456", salt);
}
test();
