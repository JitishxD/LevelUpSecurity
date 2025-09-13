import jwt from "jsonwebtoken";

export const AuthApi = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // If no token is found in cookies
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized: No token provided." 
      });
    }

    // Verify the token
    const decodedTokenData = jwt.verify(token, process.env.TOKEN_SECRET);

    // Attach the user's ID to the request object for the next function to use
    req.userid = decodedTokenData.id;

    // If verification is successful, proceed to the next function (the controller)
    next();
  } catch (error) {
    // This catches errors from jwt.verify (e.g., invalid signature, expired token)
    console.log(error);
    return res.status(401).json({ 
      success: false, 
      message: "Unauthorized: Invalid or expired token." 
    });
  }
};