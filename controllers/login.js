const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModels = require('../models/users');
const userStatus = require('../enums/userStatus');

async function login(data){
    try {
        const isUserExist = await userModels.getUserByEmail(data)
        //console.log(isUserExist);
        if(isUserExist.length > 0){
            const isPasswordTrue = bcrypt.compareSync(
                data.password,
                isUserExist[0].password
            );
            if(isPasswordTrue){
                const token = jwt.sign(
                    {
                        id : isUserExist[0].id,
                        name : isUserExist[0].name,
                        email : isUserExist[0].email,
                        status : userStatus[isUserExist[0].status]
                    },
                    "392839djqwdj"
                );
                return {
                    status : 200,
                    token,
                };
            }
            return {
                status : 400,
                message : "Password is wrong",
            };
        }
        return {
            status : 400,
            message : "User not found"
        }
    } catch (error) {
        return { message : error}
    }
}

module.exports = {
    login
}