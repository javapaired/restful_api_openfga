import { pool } from "../db.js";
import { sendResponse } from "../utils/sendResponse.js";

// POST create new user
export const createUser = async (req, res) => {

  const { name, email } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, created_at) VALUES (?, ?, NOW())",
      [name, email]
    );

    return sendResponse(res, 201, true, "User created successfully", {
      id: result.insertId,
      name,
      email,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return sendResponse(
        res,
        409,
        false,
        "A user with this email already exists."
      );
    }

    console.error("[createUser Error]", err);
    return sendResponse(
      res,
      500,
      false,
      "Internal server error. Please try again later."
    );
  }
};

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM users");
    return sendResponse(res, 200, true, "Users fetched successfully", users);
  } catch (error) {
    console.error("[getAllUsers Error]", error);
    return sendResponse(
      res,
      500,
      false,
      "Failed to fetch users. Please try again later."
    );
  }
};

// GET user by ID
export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      req.params.id,
    ]);

    if (!rows.length) {
      return sendResponse(res, 404, false, "User not found");
    }

    return sendResponse(res, 200, true, "User fetched successfully", rows[0]);
  } catch (error) {
    console.error("[getUserById Error]", error);
    return sendResponse(
      res,
      500,
      false,
      "Failed to fetch user. Please try again later."
    );
  }
};

// PUT update user
export const updateUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, req.params.id]
    );

    if (result.affectedRows === 0) {
      return sendResponse(res, 404, false, "User not found");
    }

    return sendResponse(res, 200, true, "User updated successfully", {
      id: req.params.id,
      name,
      email,
    });
  } catch (err) {
    console.error("[updateUser Error]", err);
    return sendResponse(
      res,
      500,
      false,
      "Failed to update user. Please try again later."
    );
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return sendResponse(res, 404, false, "User not found");
    }

    return sendResponse(res, 200, true, "User deleted successfully");
  } catch (err) {
    console.error("[deleteUser Error]", err);
    return sendResponse(
      res,
      500,
      false,
      "Failed to delete user. Please try again later."
    );
  }
};
