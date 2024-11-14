const verifyAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to access this resource"
      });
    }
  
    // Proceed to the next middleware or route handler if the user is an admin
    next();
  };
  
  module.exports = verifyAdmin;
  