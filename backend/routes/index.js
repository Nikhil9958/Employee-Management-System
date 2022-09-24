import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getEmployees, RegisterEmployee } from "../controllers/Employees.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.get('/employees', verifyToken, getEmployees);
router.post('/users', Register);
router.post('/employees', RegisterEmployee);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
 
export default router;