
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Backend quan ly nhan su dang hoat dong!"
  });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Ket noi MongoDB thanh cong!");

    app.listen(PORT, () => {
      console.log(`Server dang chay tai http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Loi ket noi MongoDB:", error.message);
  });
