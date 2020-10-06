// external routes
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config').jwtConfig;
const bearerToken = require("express-bearer-token");

//internal routes
const { User } = require('../db/models');


//function to create a user token
getUserToken = (user) => {

  const userData = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(
    { data: userData },
    secret,
    { expiresIn: parseInt(expiresIn, 10) }
  );

  return token;
};

//function to obtain information from token if still authorized
const authRefresh = (req, res, next) => {

  const { token } = req;

  if (!token) {
    return next();
  }

  return jwt.verify( token, secret, null, async (error, jwtPayload) => {
    if (error) {
      error.status = 401;
      return next(error);
    }

    const { id } = jwtPayload.data;

    try {
      req.user = await User.findByPk(id);
    } catch(e) {
      return next(e);
    }

    if (!req.user) {
      return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }

    return next();
  });
};

const authCheck = [bearerToken(), authRefresh]


module.exports = { getUserToken, authCheck };
