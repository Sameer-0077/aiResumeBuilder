const validateAuthUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required." });
  }

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be atleast 6 characters." });
  }
  next();
};

module.exports = validateAuthUser;

// const { body, validationResult } = require("express-validator");

// exports.validateAuthUser = [
//   body("email")
//     .trim()
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Invalid email format"),

//   body("password")
//     .notEmpty()
//     .withMessage("Password is required")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long"),

//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
// ];
