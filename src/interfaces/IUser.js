class IUser {
    /*
        Crear un nuevo usuario
        @param {string} email -> correo del usuario
        @param {string} password -> password del usuario
        @returns {Promise<User>}
        @trhows {error} sis hay un error en la creacion
    */ 
    static async createUser (email, password) {}
    static async findByEmail(email) {}
    async verifyPassword(password) {}
} 

module.exports = IUser