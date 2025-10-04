const roles = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      const userRole = req.user.role;
      
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Insufficient permissions.',
          requiredRoles: allowedRoles,
          userRole: userRole
        });
      }

      next();
    } catch (error) {
      console.error('Roles middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during authorization'
      });
    }
  };
};

module.exports = roles;
