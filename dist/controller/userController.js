"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.register = register;
exports.login = login;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, userModel_1.allUsers)();
            const usersData = users.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
            }));
            res.status(200).json(usersData);
        }
        catch (error) {
            console.error("Erro ao buscar usuários:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const existingUser = yield (0, userModel_1.findUserByEmail)(email);
            if (existingUser) {
                res.status(400).json({ error: "User already exists" });
                return;
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield (0, userModel_1.createUser)(name, email, hashedPassword);
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
            };
            res.status(201).json(userData);
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield (0, userModel_1.findUserByEmail)(email);
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                res.status(401).json({ error: "Invalid credentials" });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            res.json({ token });
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
