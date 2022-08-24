const res = require("express/lib/response");
const ordersModels = require("../models/orders");

async function get(){
    try {
        const orderData = await ordersModels.get();
        const response = {
            data : orderData
        }
        return response
    } catch (error) {
        return {message : error}
    }
}

async function getById(id){
    try {
        const orderById = await ordersModels.get(id);
        if(!orderById[0]){
            return {message : `Order with id ${id} not fount`}
        }
        const response = {
            data : orderById
        }
        return response;
    } catch (error) {
        return {message : error}
    }
}

async function create(data){
    try {
        //console.log(data);
        const orderData = await ordersModels.create(data);
        //console.log(data);
        const response = {
            id : orderData.insertId,
            product_id : data.product_id,
            price : data.price,
            user_id : data.user_id,
            dilevery_cost : data.dilevery_cost,
            count : data.count,
            status : data.status,
            order_time : data.order_time            
        } 
        return response;
    } catch (error) {
        //console.log(error);
        return {message : error}
    }
}

async function update(data, id){
    try {
        const orderById = await ordersModels.get(id);
        if(!orderById[0]){
            return {message : `Order with id ${id} not found`}
        }
        const orderUpdate = await ordersModels.update(data, id);
        const newData = await ordersModels.get(id);
        const response ={
            data : newData[0]
        }
        return response
    } catch (error) {
        return {message : error}
    }
}

async function remove(id){
    try {
        const orderById = await ordersModels.get(id);
        if(!orderById[0]){
            return {message : `Order with id ${id} not found`}
        }
        const orderDelete = await ordersModels.remove(id);
        return {message : `Order with id ${id} hasbeen deleted`}
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