import express from "express";
import cookieParser from "cookie-parser";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
// import router from "./routes";
import routes from "./routes/index.js";
import session from "express-session";
import passportLocal from "./config/passport.js";
import passport from "./config/passport.js";
import MongoStore from "connect-mongo";
import db from "./config/mongoose.js";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;
// const MongoStore = new connectMongo(session);

const mongoClientPromise = new Promise((resolve, reject) => {
  mongoose.connection.on("connected", () => {
    const client = mongoose.connection.getClient();
    resolve(client);
  });

  mongoose.connection.on("error", (err) => {
    reject(err);
  });
})
  .then((client) => {
    console.log(`got the client`);
    return client;
  })
  .catch((err) => {
    console.log(`error in getting the client: ${err}`);
    throw err; // re-throw the error to propagate it further if needed
  });

let sessionStore;
const initializeSessionStore = async () => {
  try {
    const client = await mongoClientPromise;
    sessionStore = MongoStore.create({
      client: client,
      dbName: "codial",
      collection: "sessions",
    });

  } catch (error) {
    console.log(`error initializing the session store: ${error}`);
  }
};
initializeSessionStore();



app.use(
  session({
    name: "codial",
    secret: "anything",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 100 * 60,
    },
    store: sessionStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);




// const filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(filename);
app.use(express.urlencoded());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./views"); //path.join(__dirname, "views")

app.use("/", routes);

app.listen(port, (req, res) => {
  console.log(`server is running on port: ${port}`);
});

// "version": "1.0.0",
// "main": "index.js",
// "type": "module",
// "scripts": {
//   "dev": "nodemon index.js",
//   "test": "echo \"Error: no test specified\" && exit 1"
// },
// "author": "karan",
// "license": "ISC",
// "dependencies": {
//   "connect-mongo": "^5.1.0",
//   "cookie-parser": "^1.4.6",
//   "ejs": "^3.1.9",
//   "express": "^4.18.3",
//   "express-session": "^1.18.0",
//   "mongoose": "^8.2.1",
//   "passport": "^0.7.0",
//   "passport-local": "^1.0.0"
// },
// "description": ""
// }
