const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/AuthSchema");

const signUpController = async (req, res) => {
    try {
        const body = req.body;
        const { fullName, email, password } = body;
        if (!fullName || !email || !password) {
            res.json({
                status: false,
                message: "Required Fields Are Missing!",
                data: null,
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const objToSend = {
            full_name: fullName,
            email,
            password: hashPassword
        }
        console.log(objToSend);

        const emailExist = await UserModel.findOne({ email });
        if (emailExist) {
            res.json({
                status: false,
                message: "This Email Address Has Been Already Exists Please Try Again",
                data: null,
            });
            return;
        }

        const userSave = await UserModel.create(objToSend);

        res.json({
            status: true,
            message: "User successfully Created",
            data: userSave,
        });


    } catch (error) {
        res.json({
            status: false,
            message: error.message,
            data: null,
        });
    }
}

const LoginController = async (req, res) => {
    try {
        const body = req.body;
        const { email, password } = body;

        if (!email || !password) {
            res.json({
                status: false,
                message: "Required Fields Are Missing!",
                data: null,
            });
            return;
        }

        const emailExist = await UserModel.findOne({ email });

        if (!email) {
            res.json({
                message: "Invalid Credential!",
                status: false,
                data: null,
            });
            return;
        }

        const comparePassword = await bcrypt.compare(password, emailExist.password);

        if (comparePassword) {
            var token = jwt.sign({ email: emailExist.email }, "PRIVATE KEY");

            res.json({
                message: "Login successful",
                status: true,
                data: emailExist,
                isVerify: true,
                token,
            });
            return;
        }
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
            data: null,
        });
    }
};

module.exports = {
    signUpController,
    LoginController,
};