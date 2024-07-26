const validateSignupMiddleWare = (req,resp,next) => {
  const { name, email, pass, number, address } = req.body;

  // Validate name (non-empty string)
  if (!name || typeof name !== "string" || name.trim() === "") {
    return resp.send({
        status: 0,
        message: "A valid name is required.",
      });
  }

  // Validate email (basic email regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return resp.send({
        status: 0,
        message: "A valid email is required.",
      });
  }

  // Validate password (at least 8 characters, one uppercase letter, one lowercase letter, and one number)
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!pass || !passRegex.test(pass)) {
    return resp.send({
        status: 0,
        message: "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number.",
      });
  }

  // Validate phone number (basic phone number regex, can be adjusted as needed)
  const phoneRegex = /^\d{10}$/;
  if (!number || !phoneRegex.test(number)) {
    return resp.send({
        status: 0,
        message: "A valid 10-digit phone number is required.",
      });
  }

  // Validate address (non-empty string)
  if (!address || typeof address !== "string" || address.trim() === "") {
    return resp.send({
        status: 0,
        message: "Address is required and should be a non-empty string.",
      });
  }
  next();
};

const validateLoginMiddleware = (req, res, next) => {
  const { email, pass } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.send({
      status: 0,
      message: "A valid email is required.",
    });
  }
  if (!pass) {
    return res.send({
      status: 0,
      message: "Password is required.",
    });
  }
  next();
};

module.exports = { validateLoginMiddleware,validateSignupMiddleWare };
