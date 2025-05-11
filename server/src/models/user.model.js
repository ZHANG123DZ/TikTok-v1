const db = require("@/configs/db")

exports.getUsers = async () => {
    const [users, filed] = await db.query('select * from users'); // select: lấy ra
    return users;
}

// exports.getUser = async (id) => {
//     const [users, filed] = await db.query(`select * from users where id = ${id}
// `);
// }