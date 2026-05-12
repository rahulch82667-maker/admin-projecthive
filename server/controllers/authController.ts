import { Request, Response } from "express";
import admin from "../config/firebaseAdmin";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "ID Token is required" });
    }

    // 1. Verify Firebase ID Token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    // 2. Check User in MongoDB using firebaseUid
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      console.warn(`Login attempt for non-existent user: ${uid}`);
      return res.status(401).json({ message: "User not authorized in Admin system" });
    }

    if (user.role !== "admin") {
      console.warn(`Unauthorized role access attempt: ${user.email} (Role: ${user.role})`);
      return res.status(401).json({ message: "Access denied: Admin role required" });
    }

    // 3. Create JWT Token
    const token = jwt.sign(
      { firebaseUid: uid, email, role: user.role, id: user._id.toString() },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );
    
    console.log(`User logged in successfully: ${user.email} (ID: ${user._id})`);

    // 4. Store in Cookies
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        firebaseUid: user.firebaseUid,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error: any) {
    console.error("Login Error:", error.message);
    
    // If it's a Firebase ID token error, return 401
    if (error.code && error.code.startsWith('auth/')) {
      return res.status(401).json({ message: "Invalid or expired session", error: error.message });
    }
    
    res.status(500).json({ message: "Internal server error during authentication" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("auth_token");
  res.status(200).json({ message: "Logged out successfully" });
};
