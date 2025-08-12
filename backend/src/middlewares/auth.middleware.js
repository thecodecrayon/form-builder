import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  let accessToken = null;
  if(typeof req.headers["authorization"] !== "undefined") {
    accessToken = req.headers["authorization"]?.replace("Bearer ", "");
  } else if (typeof req.headers["cookie"] !== "undefined") {
    accessToken = req.headers["cookie"]?.replace("accessToken=", "");
  } else {
    accessToken = req.cookies["accessToken"];
  }

  if(!accessToken)
    return res.status(400)?.json({
      success: false,
      msg: "No access token found. You cannot access this route!"
    });
  
  let decoded = jwt.verify(accessToken, process.env.JSON_TOKEN_KEY);

  if(!decoded)
    return res.status(401)?.json({
      success: false,
      msg: "Invalid access token. You are unauthorized to access this route!"
    });

  const { id, email, name } = decoded;

  req.user = {
    id, 
    email, 
    name
  };
  next();
}

export { 
  checkAuth
}