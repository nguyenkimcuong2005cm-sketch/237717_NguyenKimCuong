
const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Lấy danh sách và tìm kiếm nhân viên
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};

    if (search) {
      const keyword = String(search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { employeeId: { $regex: keyword, $options: "i" } },
        { fullName: { $regex: keyword, $options: "i" } },
        { department: { $regex: keyword, $options: "i" } }
      ];
    }

    const employees = await Employee.find(filter).sort({ employeeId: 1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy thông tin một nhân viên
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Khong tim thay nhan vien" });
    }

    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: "ID khong hop le" });
  }
});

// Thêm nhân viên
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(error.code === 11000 ? 409 : 400)
      .json({ message: error.message });
  }
});

// Cập nhật nhân viên
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Khong tim thay nhan vien" });
    }

    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa nhân viên
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Khong tim thay nhan vien" });
    }

    res.json({ message: "Xoa nhan vien thanh cong" });
  } catch (error) {
    res.status(400).json({ message: "ID khong hop le" });
  }
});

module.exports = router;
