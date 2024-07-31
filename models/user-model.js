const bcrypt = require("bcrypt");
const knex = require("../knex/knex");
const jwt = require("jsonwebtoken");

const register = async (userType, data) => {
    if (userType === "trainer") {
        const trainer = await knex("trainers")
            .where("email", data.email)
            .select("uid");
        if (trainer.length > 0) return null;
        else {
            const hashPass = bcrypt.hashSync(data.pass, 10);
            return knex("trainers").insert({
                f_name: data.f_name,
                l_name: data.l_name,
                dob: data.dob,
                email: data.email,
                bio: data.bio,
                phone: data.phone,
                hashed_pass: hashPass,
            });
        }
    } else {
        const client = await knex("clients")
            .where("email", data.email)
            .select("uid");
        if (client.length > 0) return null;
        else {
            const hashPass = bcrypt.hashSync(data.pass, 10);
            return knex("clients").insert({
                f_name: data.f_name,
                l_name: data.l_name,
                dob: data.dob,
                email: data.email,
                phone: data.phone,
                hashed_pass: hashPass,
            });
        }
    }
};

const login = async (data) => {
    const user = await knex
        .select("*")
        .where("email", data.email)
        .from("users");
    if (!user) {
        return null;
    } else {
        if (!bcrypt.compare(data.pass, user[0].pass)) return null;
        else
            return {
                token: jwt.sign({ email: user.email, id: user.id }, "word"),
            };
    }
};

module.exports = { register, login };
