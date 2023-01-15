const User = require("../../models/User")


const fetch_user_details = async (req, res,) => {
    const {user_id} = req

    const find_user = await User.findById(user_id).select(['-password'])

    res.json({success:true,data:find_user})
}


module.exports = {fetch_user_details}