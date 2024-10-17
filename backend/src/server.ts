import express from "express";
import payload from "payload";
import path from 'path';
import { initApiDocs } from "./apidoc";

require("dotenv").config();
const app = express();


// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

app.get('/health', (_, res) => {
  res.sendStatus(200);
});

initApiDocs(app);
app.use('/assets', express.static(path.resolve(__dirname, './assets')));


const start = async () => { 

  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: http://localhost:${payload.config.custom?.port}${payload.getAdminURL()}`);
    },
  });

  const port = payload.config.custom.port;
  if (!port) {
    throw new Error("Port not set in config");
  }
  payload.logger.info(`Server is in mode: ${process.env.NODE_ENV}`);
  app.listen(port);
};

start();
