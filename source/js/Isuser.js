// ユーザー情報
const User1 = {
    username: "user1",
    password: "123"
  };
  
  const express = require('express');
  const app = express();
  
  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const bodyParser = require('body-parser');
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  
  passport.use(new LocalStrategy(
    {
      // if it is not field name、username, and password.
      usernameField: 'login-id',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      // call back
      if (username !== User1.username) {
        return done(null, false);
      }
      if (password !== User1.password) {
        return done(null, false);
      }
      return done(null, username);
    }
  ));
  
  app.use(passport.initialize());



  app.post('/login', passport.authenticate('local', { successRedirect: 'ok.html',
                                                    failureRedirect: 'login.html',
                                                    session: false,
  }));


  app.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/');
  });


  const session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
  }));

app.use(passport.session());  // <- app.use(passport.initialize()); より後に追加.

{ successRedirect: 'ok.html',
  failureRedirect: 'login.html',
  session: true,
}

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  app.get('/list', (request, response) => {
    response.sendFile(path.join(__dirname, 'public/list.html'));
  });

  app.get('/list', isAuthenticated, (request, response) => {
    // 認証済みの場合の処理.
    response.sendFile(path.join(__dirname, 'public/list.html'));
  });
  
  function isAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
      // 認証済みの場合の処理へ.
      return next();
    }
  
    // 認証していない場合の処理.
    console.warn("not authenticated.");
    response.redirect('/');
  }