const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const uploadMiddleware = require("../../middlewares/upload");

const { schemas } = require("../../models/user");

router.post( "/register", validateBody(schemas.registerSchema),ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionListSchema),
  ctrl.updateSubscription
);
router.patch(
  "/avatar",
   authenticate,
  uploadMiddleware.single("avatar"),
  ctrl.updateAvatar
);


module.exports = router;