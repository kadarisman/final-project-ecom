const db = require("../services/db");
const tableName = "users";

async function get (id = 0){
    let query = `select id as user_id, name, email, address, status from ${tableName}`;
    if(id !== 0){
        query += ` where id=${parseInt(id)}`;
    }
    const resultData = await db(query);
    return resultData;
}

async function create(data){
    const query = `insert into ${tableName} (name, email, password, address, status) values("${data.name}", "${data.email}", "${data.password}", "${data.address}", ${data.status})`;
    const insertData = await db(query);
    return insertData;
}

async function update(data, id){
    const query = `update ${tableName} set name="${data.name}", email="${data.email}", address="${data.address}" where id=${parseInt(id)}`;
    const updateData = await db(query);
    return updateData;
}

async function remove(id){
    const query = `delete from ${tableName} where id=${parseInt(id)}`;
    const deleteData = await db(query);
    return deleteData;
} 

async function getUserByEmail(data){
    const query = `select * from ${tableName} where email = "${data.email}"`;
    const users = await db(query);
    return users;
}

module.exports ={
    get,
    create,
    update,
    remove,
    getUserByEmail
}