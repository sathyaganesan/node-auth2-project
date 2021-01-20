const { innerJoin } = require("../data/dbConfig");
const db = require("../data/dbConfig");

async function add(user) {
    const [id] = await db("users").insert(user)
    return findById(id);
}

function find() {
    return db("users")
        .innerJoin("roles", "roles.id", "users.role_id")
    .select("users.id", "users.username as User", "roles.role as Role")
}

function findById(id) {
    return db("users")
        .innerJoin("roles", "roles.id", "users.role_id")
        .where("users.id", id)
        .first("users.id", "users.username as User", "roles.role as Role")
}

function findByUsername(username) {
    console.log(username);
    return db("users")
        .select("users.id", "users.username as User", "users.password", "roles.role as Role")
        .where("users.username", username)
        .innerJoin("roles", "users.role_id", "roles.id")
}

// function findByUsername() {
//     return db("users")
//         .select( "username")
// }

// function findUser() {
//     return db("users")
//     .select("i")
// }

module.exports = {
    add,
    find,
    findById,
    findByUsername,
}