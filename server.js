const {
  app: { port },
} = require("./src/config/config.mongodb");
const { server } = require("./src/config/socket.config");
const app = require("./src/app");
server.listen(port, () => {
  console.log("start");
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("stop");
    process.exit(0);
  });
});
