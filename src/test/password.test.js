const bcrypt = require("bcrypt");

async function test() {
  const salt = await bcrypt.hash("123456",10);
  console.log(salt);
  const check = await bcrypt.compare("123456", salt);
  console.log(check);
}
test();
