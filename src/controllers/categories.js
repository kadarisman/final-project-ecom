const { response } = require('express');
const categoriesModels = require('../models/categories');

async function get(){
    try {
        const data = await categoriesModels.get();
        const response = {
            data : data
        }
        return response
    } catch (error) {
        return {message : error}
    }
}

async function getById(id){
    try {
        const dataById = await categoriesModels.get(id);
        if(!dataById[0]){
            return {message : `Categories with id ${id} not found`}
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
        const dataInsert = await categoriesModels.create(data);
        const response = {
            id : dataInsert.insertId,
            name : data.name
        }
        return response
    } catch (error) {
        return {message : error}
    }
}

async function update(data, id){
    try {
        const dataById = await categoriesModels.get(id);
        if(!dataById[0]){
            return {message : `Categories with id ${id} not found`}
        }
        const dataUpdate = await categoriesModels.update(data, id);
        const newData = await categoriesModels.get(id);
        const response = {
            data : newData
        }
        return response
    } catch (error) {
        //console.log(error);
        return {message : error}
    }
}

async function remove(id){
    try {
        const dataById = await categoriesModels.get(id);
        if(!dataById[0]){
            return {message : `Categories with id ${id} not found`}
        }
        const dataDelete = await categoriesModels.remove(id);
        return {message : `Categories with id ${id} hasbeen deleted`}
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