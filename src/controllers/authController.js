const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

//REGISTER
module.exports.registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });

    //Save user to DB
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "2h" }
  );
};
module.exports.generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
};
//LOGIN
module.exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Tìm người dùng trong cơ sở dữ liệu dựa trên tên người dùng
    const user = await User.findOne({ username });
    // Kiểm tra xem người dùng có tồn tại hay không
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    // Tạo JWT token
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "2h" }
    );
    res.status(200).json({ accessToken, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports.requestRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json("You're not authenticated");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid");
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      console.log(err);
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    //create new access token, refresh token and send to user
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};
//LOG OUT
module.exports.logOut = async (req, res) => {
  //Clear cookies when user logs out
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.clearCookie("refreshToken");
  res.status(200).json("Logged out successfully!");
};
