users=[]
async function insert(user){
    console.log(`savingbusers to db`,user)
    //make a mongoose call to save user in DB
    users.push(user)
    return user 
}
module.exports={
    insert
};