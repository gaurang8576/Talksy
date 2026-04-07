import User from "../models/user.js";
import { isDatabaseConnected } from "../config/db.js";

const inMemoryUsers = [
  {
    id: "local-demo-user",
    name: "Talksy Demo",
    email: "demo@talksy.app",
    password: "demo123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  const normalizedUser = typeof user.toObject === "function" ? user.toObject() : user;
  const { password, _id, ...rest } = normalizedUser;

  return {
    id: String(_id ?? normalizedUser.id),
    ...rest,
  };
};

export const findUserByEmail = async (email) => {
  if (isDatabaseConnected()) {
    return User.findOne({ email });
  }

  return inMemoryUsers.find((user) => user.email === email) ?? null;
};

export const listUsers = async () => {
  if (isDatabaseConnected()) {
    const users = await User.find().sort({ createdAt: -1 });
    return users.map(sanitizeUser);
  }

  return inMemoryUsers.map(sanitizeUser).reverse();
};

export const createUser = async ({ name, email, password }) => {
  if (isDatabaseConnected()) {
    const user = new User({ name, email, password });
    await user.save();
    return user;
  }

  const timestamp = new Date().toISOString();
  const user = {
    id: `local-${Date.now()}`,
    name,
    email,
    password,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  inMemoryUsers.push(user);
  return user;
};

export const serializeUser = sanitizeUser;
