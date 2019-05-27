const passport = require(`passport`),
    LocalStrategy = require(`passport-local`).Strategy,
    User = require(`../models/user`);


passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) => {
        done(null, user);
    })
    .catch((err) => {
        console.log(`Error deserializing user: ${err}`);
        done(err);
    });
});

const strategyOptions = {
    usernameField: `email`,
    passwordField: `password`,
    passReqToCallback: true
};

passport.use(`local-signup`,
    new LocalStrategy(strategyOptions,
    (req, email, password, done) => {
        User.findOne({email: email})
        .then(async (user) => {
            if(user){
                return done(null, false, {message: `E-mail already in use!`});
            }

            let newUser = new User();
            newUser.email = email;
            newUser.password = newUser.hashPassword(password);
            newUser.f_name = req.body.f_name;
            newUser.l_name = req.body.l_name;

            return await newUser.save();
        })
        .then((newUser) => {
            done(null, newUser, {message: `Hurray! Welcome to the family ${newUser.f_name}!`});
        })
        .catch((err) => {
            console.log(`Error checking user in DB. ${err}`);
            return done(err);
        });
}));

passport.use(`local-signin`,
    new LocalStrategy(strategyOptions,
    (req, email, password, done) => {
        User.findOne({email: email})
        .then((user) => {
            if(!user) return done(null, false, {message: `You do not have an Anarchy Futurism account yet! Click the link below to create an account.`});

            if(!user.verifyPassword(password)) return done(null, false, `You entered an incorrect password`);

            return done(null, user, {message: `Welcome! Glad to have you back ${user.f_name}!`});
        })
        .catch((err) => {
            console.log(`Error while trying to find user in DB. ${err}`);
        });
}));