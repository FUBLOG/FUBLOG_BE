const jwt = require("jsonwebtoken");

const payload = {
  id: "123456",
  email: "1",
};
const token = jwt.sign(payload, "1234", { expiresIn: "10000" });

setTimeout(() => {
  try {
    const decode = jwt.verify(token, "1234");
    console.log(decode);
  } catch (error) {
    console.log(error);
  }
}, 15000);
