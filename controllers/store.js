const storeModels = require("../models/stores");

async function get(){
    try {
        const storeData = await storeModels.get();
        const response = {
            data : storeData
        }
        return response;
    } catch (error) {
        return {message :error}
    }
}

async function getById(id){
    try {
        const storeById = await storeModels.get(id);
        if(!storeById[0]){
            return {message : `Store with id ${id} not found`};
            process.exit();
        }
        const response = {
            data : storeById
        }
        return response
    } catch (error) {
        return {message : error}
    }
}

async function update(data, id){
    try {
        const storeById = await storeModels.get(id);
        if(!storeById[0]){
            return {message : `Store with id ${id} not found`}
            process.exit();
        }
        const storeUpdate = {
            name : data.name,
            address : data.address
        }
        const update = await storeModels.updateById(storeUpdate, id);
        const newData = await storeModels.get(id);
        const response = {
            id : newData[0],id,
            user_id : newData[0].user_id,
            name : newData[0].name,
            address : newData[0].address
        }
        return response
    } catch (error) {
        return {message : error}
    }
}

module.exports = {
    get,
    update,
    get,
    getById
}