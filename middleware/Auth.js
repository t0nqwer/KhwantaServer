import pkg from "jsonwebtoken";
const { verify, sign } = pkg;

export const verifyData = (req, res, next) => {
  const { authorization, username } = req.headers;
  // console.log(req.headers);
  if (!username) {
    console.log(2);
    return res.status(401).json({ error: "Request timeout" });
  }
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const decoded = verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
