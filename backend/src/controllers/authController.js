import {
  createUser,
  findUserByEmail,
  listUsers,
  serializeUser,
} from "../services/userService.js";

const buildSessionToken = (user) =>
  `talksy-dev-${Buffer.from(`${user.id}:${user.email}`).toString("base64url")}`;

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await createUser({ name, email, password });
    const safeUser = serializeUser(user);

    return res.status(201).json({
      message: "User registered successfully",
      user: safeUser,
      token: buildSessionToken(safeUser),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const safeUser = serializeUser(user);

    return res.json({
      message: "Login successful",
      user: safeUser,
      token: buildSessionToken(safeUser),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (_req, res) => {
  try {
    const users = await listUsers();

    return res.json({
      message: "Users fetched successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
