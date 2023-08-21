const { login, getCurrentProfile, logout, getUser   } = require("../Controllers/auth");
const {register, emailVerify} = require("../Controllers/users");
const {adminAuth, userAuth} = require("../Middlewares/auth");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id/verify/:token/", emailVerify);
router
    .route("/logout")
    .get(userAuth, logout);
router
    .route('/profile')
    .get(userAuth, getCurrentProfile);
router
    .route('/adminboard')
    .get(adminAuth, getUser);

module.exports = router;