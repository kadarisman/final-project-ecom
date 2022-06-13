const db = require("../services/db");
const tableName = "stores";

async function get(id = 0){
    let query = `select * from ${tableName}`;
    if(id !== 0){
        query += ` where id=${parseInt(id)}`;
    }
    const result = await db(query);
    return result;
}

async function getByUserid(user_id){
    let query = `select * from ${tableName} where user_id=${parseInt(user_id)}`;
    const result = await db(query);
    return result;
}

async function create(data){
    const query = `insert into ${tableName} (user_id, name, address) values(${data.user_id}, "${data.name}", "${data.address}")`;
    const insert = await db(query);
    return insert;
}

//update by user_id
async function update(data, user_id){
    const query = `update ${tableName} set name="${data.name}", address="${data.address}" where user_id=${parseInt(user_id)}`;
    const updateData = await db(query);
    return updateData;
}

//update by id 
async function updateById(data, id){
    const query = `update ${tableName} set name="${data.name}", address="${data.address}" where id=${parseInt(id)}`;
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
    getByUserid,
    create,
    update,
    remove,
    updateById
}