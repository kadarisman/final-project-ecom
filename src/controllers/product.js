const productsModels = require("../models/products");

async function get(){
    try {
        const data = await productsModels.get();
        const response = {
            data : data
        }
        return response;
    } catch (error) {
        return {message : error}
    }
}

async function getById(id){
    try {
        const dataById = await productsModels.get(id);
        if(!dataById[0]){
            return {message : `Product with id ${id} not found`}
        }
        const response = {
            data : dataById
        }
        return response
    } catch (error) {
        return {message : error}
    }
}

async function create(data){
    try {
        const insertData = await productsModels.create(data);
        const response = {
            id : insertData.insertId,
            name : data.name,
            store_id : data.store_id,
            price : data.price,
            description : data.description,
            category_id : data.category_id,
            status : data.status,
            stock : data.stock,
            images : data.images
        }
        return response;
    } catch (error) {
        console.log(error);
        return {message : error}
    }
}

async function update(data, id){
    try {
        const productsById = await productsModels.get(id);
        //console.log(productsById);
        if(!productsById[0]){
            return {message : `Product with id ${id} not found`}
        }
        const productUpdate = await productsModels.update(data, id);
        const newData = await productsModels.get(id);
        const response = {
            data : newData[0]
        }
        return response;
    } catch (error) {
        return {message : error}
    }
}

async function remove(id){
    try {
        const productsById = await productsModels.get(id);
        if(!productsById[0]){
            return {message : `Product with id ${id} not found`}
        }
        const productDelete = await productsModels.remove(id);
        return {message : `Product with id ${id} hasbeen deleted`}
    } catch (error) {
        return {message : error}
    }
}

module.exports ={
    get,
    getById,
    create,
    update,
    remove
}