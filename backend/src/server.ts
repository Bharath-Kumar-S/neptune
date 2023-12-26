import express, { Request } from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import {
  middleware,
  errorHandler,
  SessionRequest,
} from "supertokens-node/framework/express";
import { getWebsiteDomain, SuperTokensConfig } from "../config";
import Multitenancy from "supertokens-node/recipe/multitenancy";
import userModal from "./modals/users.modal";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

supertokens.init(SuperTokensConfig);

const app = express();
const PORT = process.env.PORT;
const appServer = app.listen(PORT, () => {
  console.log(
    `⚡️⚡️⚡️[server]: Server is running at https://localhost:${PORT} ⚡️⚡️⚡️`
  );
  try {
    console.log("app is started");
    if (!(process.env.NODE_ENV === "test")) {
      mongoose.connect(`${process.env.DBSTRING}`);
      const db = mongoose.connection;
      db.on("error", (err) => {
        console.error(err);
        // logEvents(
        //   `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        //   "mongoErrLog.log"
        // );
      });
      db.on("open", () => console.log("Connected to DB!!!!"));
    }
  } catch (err) {
    console.log(err);
  }
});

app.use(express.json());

app.use(
  cors({
    origin: getWebsiteDomain(),
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

// This exposes all the APIs from SuperTokens to the client.
app.use(middleware());

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
  let session = req.session;
  res.send({
    sessionHandle: session!.getHandle(),
    userId: session!.getUserId(),
    accessTokenPayload: session!.getAccessTokenPayload(),
  });
});

// This API is used by the frontend to create the tenants drop down when the app loads.
// Depending on your UX, you can remove this API.
app.get("/tenants", async (req, res) => {
  let tenants = await Multitenancy.listAllTenants();
  res.send(tenants);
});

app.post("/user", async (req: Request, res, Response) => {
  console.log(req.body);
  let { userEmail, userId } = req.body;
  console.log(req.body);
  const user = await userModal.create({ userEmail, userId });
  return res.status(200).json({
    message: "user created",
  });
  //   res.status(200).json({
  //     message: "user created",
  //   });
});

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());

app.listen(3001, () => console.log(`API Server listening on port 3001`));
