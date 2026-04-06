const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");
const twilio = require('twilio');

// EMAIL CONFIG
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

// TWILIO CONFIG
const client = twilio(process.env.ACCSID, process.env.AUTTOK);


// ================= REGISTER =================
exports.userregister = async (req, res) => {
    const { fname, email, number, password } = req.body;

    if (!fname || !email || !number || !password) {
        return res.status(400).json({ error: "Please Enter All Input Data" });
    }

    try {
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = new users({ fname, email, number, password });
        const savedUser = await newUser.save();

        return res.status(200).json(savedUser);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Registration failed" });
    }
};


// ================= SEND OTP =================
exports.userOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Please Enter Your Email" });
    }

    try {
        const user = await users.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const OTP = Math.floor(100000 + Math.random() * 900000);

        const existEmail = await userotp.findOne({ email });

        if (existEmail) {
            await userotp.findByIdAndUpdate(
                existEmail._id,
                { otp: OTP },
                { new: true }
            );
        } else {
            const saveOtpData = new userotp({ email, otp: OTP });
            await saveOtpData.save();
        }

        // ✅ SEND EMAIL (PROMISE)
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "OTP Verification",
            text: `Your OTP is: ${OTP}`
        });

        // // ✅ SEND SMS
        // await client.messages.create({
        //     body: `Your OTP is: ${OTP}`,
        //     to: `+91${user.number}`,
        //     from: process.env.TWINUM,
        // });

        // ✅ SINGLE RESPONSE
        return res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to send OTP" });
    }
};


// ================= VERIFY OTP (LOGIN) =================
exports.userLogin = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: "Please Enter Email and OTP" });
    }

    try {
        const otpData = await userotp.findOne({ email });

        if (!otpData) {
            return res.status(400).json({ error: "OTP not found" });
        }

        if (otpData.otp == otp) {
            const user = await users.findOne({ email });

            const token = await user.generateAuthtoken();

            return res.status(200).json({
                message: "Login successful",
                userToken: token
            });

        } else {
            return res.status(400).json({ error: "Invalid OTP" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Login failed" });
    }
};
// const users = require("../models/userSchema");
// const userotp = require("../models/userOtp");
// const nodemailer = require("nodemailer");
// const twilio = require('twilio'); 

// // email config
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//     }
// })

// const accountSid = process.env.ACCSID;
// const authToken = process.env.AUTTOK;
// const client = twilio(accountSid, authToken);

// // REGISTER
// exports.userregister = async (req, res) => {
//     const { fname, email, number, password } = req.body;

//     if (!fname || !email || !number || !password) {
//         return res.status(400).json({ error: "Please Enter All Input Data" });
//     }

//     try {
//         const existingUser = await users.findOne({ email: email });

//         if (existingUser) {
//             return res.status(400).json({ error: "This User Already Exists" });
//         } else {
//             const userregister = new users({
//                 fname, email, number, password,
//             });

//             const storeData = await userregister.save();
//             return res.status(200).json(storeData);
//         }

//     } catch (error) {
//         return res.status(400).json({ error: "Invalid Details" });
//     }
// };


// // SEND OTP
// exports.userOtpSend = async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ error: "Please Enter Your Email" });
//     }

//     try {
//         const user = await users.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ error: "User not found" });
//         }

//         const OTP = Math.floor(100000 + Math.random() * 900000);

//         const existEmail = await userotp.findOne({ email });

//         if (existEmail) {
//             const updateData = await userotp.findByIdAndUpdate(
//                 { _id: existEmail._id },
//                 { otp: OTP },
//                 { new: true }
//             );

//             await updateData.save();
//         } else {
//             const saveOtpData = new userotp({
//                 email,
//                 otp: OTP
//             });
//             await saveOtpData.save();
//         }

//         // send email
//         const mailOptions = {
//             from: process.env.EMAIL,
//             to: email,
//             subject: "OTP Verification",
//             text: `OTP: ${OTP}`
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log(error);
//                 return res.status(400).json({ error: "Email not sent" });
//             } else {
//                 console.log("Email sent:", info.response);
//             }
//         });

//         // send SMS
//         await client.messages.create({
//             body: `Your OTP is: ${OTP}`,
//             to: `+91${user.number}`,
//             from: process.env.TWINUM,
//         });

//         return res.status(200).json({ message: "OTP sent successfully" });

//     } catch (error) {
//         return res.status(400).json({ error: "Invalid Details" });
//     }
// };


// // LOGIN (VERIFY OTP)
// exports.userLogin = async (req, res) => {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//         return res.status(400).json({ error: "Please Enter Email and OTP" });
//     }

//     try {
//         const otpData = await userotp.findOne({ email });

//         if (!otpData) {
//             return res.status(400).json({ error: "OTP not found" });
//         }

//         if (otpData.otp == otp) {
//             const user = await users.findOne({ email });

//             const token = await user.generateAuthtoken();

//             return res.status(200).json({
//                 message: "Login successful",
//                 userToken: token
//             });

//         } else {
//             return res.status(400).json({ error: "Invalid OTP" });
//         }

//     } catch (error) {
//         return res.status(400).json({ error: "Invalid Details" });
//     }
// };