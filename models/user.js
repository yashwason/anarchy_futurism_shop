const mongoose = require(`mongoose`),
    bcrypt = require(`bcrypt`);

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    f_name: {type: String, required: true},
    l_name: {type: String, required: true}
});

UserSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, 10);
}

UserSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model(`User`, UserSchema);