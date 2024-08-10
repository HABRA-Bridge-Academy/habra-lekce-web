var express = require("express");
var router = express.Router();
module.exports = router;
const { body, param, validationResult } = require("express-validator");

const User = require("../models/User");

const idValidation = param("id").isMongoId().withMessage("invalid-id-format");
const emailValidation = body("email").isEmail().withMessage("invalid-email");
const passwordValidation = body("password")
  .isLength({ min: 6 })
  .withMessage("password-too-short");
const firstNameValidation = body("firstName")
  .isLength({ min: 2 })
  .withMessage("first-name-too-short");
const lastNameValidation = body("lastName")
  .isLength({ min: 2 })
  .withMessage("last-name-too-short");

router.get("/:id", idValidation, async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});



/* INDEX */
router.get("/", async function (req, res, next) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/* CREATE */
router.post(
  "/",
  [
    firstNameValidation,
    lastNameValidation,
    emailValidation,
    passwordValidation.optional(),
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newUser = new User(req.body);
      if (req.body.password) {
        await newUser.setPassword(req.body.password);
      }
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

/* UPDATE */
router.put(
  "/:id",
  [
    idValidation,
    firstNameValidation.optional(),
    lastNameValidation.optional(),
    emailValidation.optional(),
    passwordValidation.optional(),
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

/* DELETE */
router.delete("/:id", idValidation, async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
