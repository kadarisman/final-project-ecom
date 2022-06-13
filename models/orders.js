const db = require("../services/db");
const tableName = "orders";

async function get(id = 0){
    let query = `select * from ${tableName}`;
    if(id !== 0){
        query += ` where id=${parseInt(id)}`;
    }
    const resultData = await db(query);
    return resultData;
}

async function create(data){
    const query = `insert into ${tableName} (product_id, price, user_id, dilevery_cost, count, status, order_time) values(${data.product_id}, ${data.price}, ${data.user_id}, ${data.dilevery_cost}, ${data.count}, ${data.status}, "${data.order_time}")`;
    const insertData = await db(query);
    //console.log(query);
    return insertData;
}

async function update(data, id){
    const query = `update ${tableName} set product_id=${data.product_id}, price=${data.price}, user_id=${data.user_id}, dilevery_cost=${data.dilevery_cost}, count=${data.count}, status=${data.status}, order_time="${data.order_time}" where id=${parseInt(id)}`;
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