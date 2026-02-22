const express = require("express");
const router = express.Router();
const { 
    createStaffAccount, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require("../controllers/userController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.use(protect);
router.use(authorize('Admin'));

// 1. Static/Base routes first
router.route("/")
    .post(createStaffAccount)
    .get(getAllUsers);

// 2. Dynamic parameter routes LAST
router.route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;