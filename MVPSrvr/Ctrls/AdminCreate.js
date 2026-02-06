import theAdminModel from "../Models/adminModel.js";

export const createAdmin = async (req, res) => {
  try {
    const { name, email, adminKey } = req.body;

    // verify admin key
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ message: "Invalid admin key" });
    }

    // prevent multiple admins
    const existingAdmin = await theAdminModel.findOne({ role: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await theAdminModel.create({
      name,
      email,
      role: "admin"
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin
    });

  } catch (err) {
    res.status(500).json({ message: "Admin creation failed" });
  }
};
