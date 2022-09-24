import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Employees = db.define('employees',{
    empid:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    Fname:{
        type: DataTypes.STRING
    },
    Lname:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    DOB:{
        type: DataTypes.STRING
    },
    Mobile:{
        type: DataTypes.STRING
    },
    City:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default Employees;