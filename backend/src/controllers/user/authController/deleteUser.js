const User = require("../../../models/user");

exports.deleteUser = async (req, res) => {
    try {
        console.log("Deleting user with ID:", req.params.id);
        // await User.findByIdAndDelete(req.params.id);
        // res.status(200).send("User deleted successfully.");
        res.status(200).json({
            status: true,
            message: "User deleted successfully.",
        });
    } catch (error) {
        res.status(500).send("Error deleting user.");
    }
};
