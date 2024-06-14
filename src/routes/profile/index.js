const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const userInfoController = require("../../controller/user.info.controller");
const { authentication } = require("../../auth/authentication");
const uploader = require("../../config/multer.config");

router.get("/:profileHash", asyncHandler(userInfoController.getUserInfo));

router.use(authentication);

router.patch("", asyncHandler(userInfoController.updateInfo));
router.patch(
  "/avatar",
  uploader.single("image"),
  asyncHandler(userInfoController.changeAvatar)
);
router.patch(
  "/coverPhoto",
  uploader.single("image"),
  asyncHandler(userInfoController.changeCoverPhoto)
);

module.exports = router;
