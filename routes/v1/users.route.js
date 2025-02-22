
const express =  require("express");
const router = express.Router();
const {UserRegSchema} = require('../../middlewares/validate')
const getAuthenticated  = require("../../middlewares/auth");
const { viewLeaderBoard, createScore } = require('../../service/Score.service');
const { createUser, refreshUser } = require("../../service/User.service");

const validateCreateUser = (req, res, next) => {
    const { error } = UserRegSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();  // If validation is successful, proceed to the next middleware
};

router.route("/").post(validateCreateUser, createUser)
router.route("/upload-score").post( getAuthenticated, createScore);
router.route('/score').get( viewLeaderBoard);
router.route('/').get(refreshUser)

module.exports = router;