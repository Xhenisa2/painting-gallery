const mongoose = require("mongoose");
const userModel = require("./models/AdminModel");
// Libraria bcrypt per kriptimin e passwordit te adminit
const bcrypt = require("bcrypt");
const createAdmin = async () => {
    try {
        // Lidhja me databazen MongoDB 
        await mongoose.connect("mongodb://xhenisa2:WebSite2@ac-ojtz2ib-shard-00-00.au5mvpr.mongodb.net:27017,ac-ojtz2ib-shard-00-01.au5mvpr.mongodb.net:27017,ac-ojtz2ib-shard-00-02.au5mvpr.mongodb.net:27017/Website2?ssl=true&replicaSet=atlas-gdgp62-shard-0&authSource=admin&appName=Cluster0");
        // Email i adminit qe do te krijohet, nese ekziston nje admin me kete email, nuk do te krijohet nje i ri
        const adminEmail = "xhuliatoska@gmail.com";
        // Kontrollimi nese ekziston nje admin me kete email ne databaze
        const checkAdmin = await userModel.findOne({ email: adminEmail });
        // Nese admini ekziston, do te printohet nje mesazh dhe lidhja me databazen do te mbyllet
        if (checkAdmin) {
            console.log("Admin already exists");
            mongoose.disconnect();
        }
        // Nese admini nuk ekziston, do te krijohet nje i ri me password te kriptuar dhe do te ruhet ne databaze
        const addAdmin = new userModel({
            username: "admin",
            email: adminEmail,
            role: "admin",
            // Kriptimi i passwordit te adminit me bcrypt
            password: bcrypt.hashSync("admin123", 10),
        });
        // Ruajtja e adminit ne databaze
        await addAdmin.save();
        console.log("Admin added");
        mongoose.disconnect();
    } catch (err) {
        console.log("Admin not created" + err);
        process.exit();
    }
};
createAdmin();