const db = require("../services/db");
const tableName = "categories";

async function get( id =0){
    let query = `select * from ${tableName}`;
    if(id !== 0){
        query += ` where id=${parseInt(id)}`;
    }
    const resultData = await db(query);
    return resultData;
}

async function create(data){
    const query = `insert into ${tableName} (name) values("${data.name}")`;
    const insertData = await db(query);
    return insertData;
}

async function update(data, id){
    const query = `update ${tableName} set name="${data.name}" where id=${parseInt(id)}`;
    const updateData = await db(query);
    return updateData;
}

async function remove(id){
    const query = `delete from ${tableName} where id=${parseInt(id)}`;
    const deleteData = await db(query);
    return deleteData;
}

module.exports={
    get,
    create,
    update,
    remove
}