const { ObjectId } = require("mongodb");
const connectDB = require("../config/db");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password, photo } = req.body;

  try {
    const db = await connectDB();
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      photo,
      role: "user",
      createAt: new Date(),
    };
    const result = await db.collection("users").insertOne(newUser);

    res.status(201).json({ message: "User registered successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectDB();
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res
      .status(200)
      .json({ message: "Login successful", user: { ...user, password: null } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const roleUpdateByAdmin = async (req, res) => {
  const { email: adminEmail } = req.query;
  const { id, role } = req.body;

  try {
    const db = await connectDB();
    const admin = await db.collection("users").findOne({ email: adminEmail });
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    if (!user && !admin) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const updatedUser = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: { role } });
    res.status(200).json({
      message: "Role updated successful",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateSingleUser = async (req, res) => {
  const { email, password, photo, name } = req.body;
  try {
    const db = await connectDB();
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await db.collection("users").updateOne(
      { email },
      {
        $set: {
          name,
          password: hashedPassword,
          photo,
        },
      }
    );
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const allUsers = async (req, res) => {
  const { email: adminEmail } = req.query;
  
  try {
    const db = await connectDB();
    const admin = await db.collection("users").findOne({ email: adminEmail });
    if (!adminEmail || !admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const users = await db
      .collection("users")
      .find({}, { projection: { password: 0 } })
      .toArray();
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  roleUpdateByAdmin,
  allUsers,
  updateSingleUser,
};
