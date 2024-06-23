import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../modules/user.js";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });

        if (!user || user.password != password) {
          console.log(`invalid username/password`);
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        console.log(`error in finding user: ${error}`);
        return done(error);
      }
    }
  )
);

// serialize the user to decide which key is to kept in the cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialize the user from the key to the cookie

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
    
  } catch (error) {
    console.log(`error in deserializeUser in passport.js: ${error}`);
    return done(null, false);
  }
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in , then pass on the request to the next function in controller action
  if (req.isAuthenticated()) {
    return next();
  }

  //if the user is not signed in
  return res.redirect("/user/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed-in user from the session cookie and we are just sending this to the views
    res.locals.user = req.user;
  }
  next();
};

export default passport;
