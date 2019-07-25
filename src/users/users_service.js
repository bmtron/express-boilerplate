const UsersService = {
    getAllUsers(db) {
        return db.select('*').from('theater_users')
    },
    addNewUser(db, newUser) {
        return db.insert(newUser).into('theater_users').returning('*')
                .then(rows => {
                    return rows[0]
                })
    },
    getUserById(db, id) {
        return db.from('theater_users')
            .select('*')
            .where('id', id)
            .first()
    },
    deleteUser(db, id) {
        return db('theater_users')
            .where({id})
            .delete()
    }
}

module.exports = UsersService