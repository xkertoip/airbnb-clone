const { login, getUserProfile, logout, getUser,  } = require("../Controllers/auth");
const {register, emailVerify} = require("../Controllers/users");
const {adminAuth, protect} = require("../Middlewares/auth");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/:id/verify/:token/", emailVerify);
router
    .route('/profile')
    .get(protect, getUserProfile);
router
    .route('/adminboard')
    .get(adminAuth, getUser);

module.exports = router;