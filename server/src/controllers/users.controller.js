const usersModel = require("@/models/user.model")
const { success } = require("@/utils/response")

exports.getUsers = async (req, res) => {
    const users = await usersModel.getUsers()
    success(res, 200, users);
}

exports.getUser = async (req, res) => {
    const user = await usersModel.getUser()
    success(res, 200, user);
}