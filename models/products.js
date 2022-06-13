const db = require("../services/db");
const tableName = "products";

async function get(id = 0){
    let query = `select * from ${tableName}`;
    if(id !== 0){
        query += ` where id=${parseInt(id)}`;
    }
    const resultData = await db(query);
    return resultData;
}

async function create(data){
    const query = `insert into ${tableName} (name, price, description, category_id, status, stock, images, store_id) values("${data.name}", ${data.price}, "${data.description}", ${data.category_id}, ${data.status}, ${data.stock}, "${data.images}", ${data.store_id})`;
    const insertData = await db(query);
    return insertData;
}

async function update(data, id){
    const query = `update ${tableName} set name="${data.name}", price=${data.price}, description="${data.description}", category_id=${data.category_id}, status=${data.status}, stock=${data.stock}, images="${data.images}", store_id=${data.store_id} where id=${parseInt(id)}`;
    const updateData = await db(query);
    return updateData;
}

async function remove(id){
    const query = `delete from ${tableName} where id=${parseInt(id)}`;
    const deleteData = await db(query);
    return deleteData;
}

module.exports ={
    get,
    create,
    update,
    remove
}