const bcrypt = require("bcrypt");
const userModels = require("../models/users");
const userStatus = require("../enums/userStatus");
const storeModels = require("../models/stores");
//const res = require("express/lib/response");


async function get(){
    try {
        const usersData = await userModels.get();
        const response = {
            data : usersData.map(item => {
                const userStatusMapped = userStatus[item.status]
                return{
                    ...item,
                    status: userStatusMapped
                }
            })
        }
        if(usersData.length !== 0){
            return response
        }else{
            return {data : []}
        }      
    } catch (error) {
        return {message: error}
    }   
} 


async function getById(id){
    try {
        const userById = await userModels.get(id);
        const response = {
            data : userById.map(item => {
                const userStatusMapped = userStatus[item.status]
                return{
                    ...item,
                    status: userStatusMapped
                }
            })
        }
        if(userById.length !== 0){
            return response
        }else{
            return {data : []}
        }
    } catch (error) {
        return {message: error}
    }
}

async function create(data){
    try {
        const saltRound = 10;
        const salt = bcrypt.genSaltSync(saltRound);
        
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;

        const insertData = await userModels.create(data);
        const response = {
            user_id : insertData.insertId,
            name : data.name,
            email : data.email,
            address : data.address,
            status : userStatus[data.status]
        }
        if(data.status === 1){
            const dataStore = {
                name : data.name,
                address : data.address,
                user_id : insertData.insertId
            }
            const insertUserToStore = await storeModels.create(dataStore);
            response.store = {
                store_id : insertUserToStore.insertId,
                name : dataStore.name,
                address : dataStore.address
            }
        }
        return response;
    } catch (error) {
        //console.log(error);
        return {message : error}
    }
}

async function update(data, id){
    try {
        const userById = await userModels.get(id);
        const storeByidUser = await storeModels.get(userById[0].user_id);      
        //console.log(userById[0].status);  process.exit();
        if(!userById){
            return {data : []}
            process.exit();
        }
        const updateData = await userModels.update(data, id);       
        if(storeByidUser){
                const dataStore = {
                name : data.name,
                address : data.address
            }
            //console.log(userById[0].user_id); process.exit();
            const updateStore = await storeModels.update(dataStore, userById[0].user_id);
        }
        const newData = await userModels.get(id);
        const response = {
            user_id : newData[0].user_id,
            name : newData[0].name,
            email : newData[0].email,
            address : newData[0].address,
            status : userStatus[newData[0].status]
        }
        if(newData[0].status == 1){
            //console.log(newData[0].user_id); process.exit();
            const newDataStore = await storeModels.getByUserid(newData[0].user_id);
            response.store = {
                store_id : newDataStore[0].id,
                name : newDataStore[0].name,
                address : newDataStore[0].address
            }
        }
        return response;
        
    } catch (error) {
        //console.log(error);
        return {message : error}
    }
}

async function remove(id){
    try {
        const userById = await userModels.get(id);
        if(!userById){
            return {message : `User with id ${id} not found`};
            process.exit();
        }
        if(userById[0].status == 1){
            const storeByidUser = await storeModels.getByUserid(userById[0].user_id);
            const storeId = storeByidUser[0].id;
            const removeStore = await storeModels.remove(storeId);
            const deletUser = await userModels.remove(id);
            return {message : `User with id ${id} and store with id ${storeId} hasbeen deleted`}
        }else{
            const deletUser = await userModels.remove(id);
            return {message : `User with id ${id} hasbeen deleted`}
        }
    } catch (error) {
        return {message : error}
    }
}


module.exports = {
    get,
    getById,
    create,
    update,
    remove
}