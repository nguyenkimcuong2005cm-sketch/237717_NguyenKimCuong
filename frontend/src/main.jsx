
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./style.css";

const API_URL = "http://localhost:5000/api/employees";

const emptyForm = {
  employeeId: "",
  fullName: "",
  gender: "Nam",
  dateOfBirth: "",
  department: "",
  position: "",
  email: "",
  phone: "",
  hireDate: "",
  status: "Dang lam viec",
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
      setError("");
    } catch {
      setError("Không thể kết nối đến Backend!");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    [employee.employeeId, employee.fullName, employee.department]
      .some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
  );

  const openAddForm = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  const openEditForm = (employee) => {
    const updatedForm = {};

    Object.keys(emptyForm).forEach((key) => {
      updatedForm[key] = employee[key] || "";
    });

    setForm(updatedForm);
    setEditingId(employee._id);
    setShowForm(true);
    setError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        alert("Cập nhật nhân viên thành công!");
      } else {
        await axios.post(API_URL, form);
        alert("Thêm nhân viên thành công!");
      }

      setShowForm(false);
      setEditingId(null);
      setForm({ ...emptyForm });
      await loadEmployees();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Có lỗi xảy ra khi lưu nhân viên!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (employee) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa nhân viên ${employee.fullName}?`
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/${employee._id}`);
      await loadEmployees();
      alert("Xóa nhân viên thành công!");
    } catch {
      setError("Không thể xóa nhân viên!");
    }
  };

  return (
    <div className="container">
      <h1>HỆ THỐNG QUẢN LÝ NHÂN VIÊN</h1>

      <div className="toolbar">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm nhân viên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn-add" onClick={openAddForm}>
          + Thêm nhân viên
        </button>
      </div>

      <div className="stats">
        <div className="stat-card">
          <span>Tổng nhân viên</span>
          <strong>{employees.length}</strong>
        </div>

        <div className="stat-card">
          <span>Đang làm việc</span>
          <strong>
            {
              employees.filter(
                (e) => e.status === "Dang lam viec"
              ).length
            }
          </strong>
        </div>

        <div className="stat-card">
          <span>Số phòng ban</span>
          <strong>
            {
              new Set(
                employees.map((e) => e.department).filter(Boolean)
              ).size
            }
          </strong>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ và tên</th>
              <th>Giới tính</th>
              <th>Phòng ban</th>
              <th>Chức vụ</th>
              <th>Email</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.employeeId}</td>
                <td>{employee.fullName}</td>
                <td>{employee.gender}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>{employee.email}</td>
                <td>{employee.status}</td>
                <td>
                  <div className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => openEditForm(employee)}
                    >
                      Sửa
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(employee)}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="8" className="empty-message">
                  Không tìm thấy nhân viên nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p>Đang hiển thị: {filteredEmployees.length} nhân viên</p>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              {editingId
                ? "Cập nhật nhân viên"
                : "Thêm nhân viên mới"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Mã nhân viên
                  <input
                    name="employeeId"
                    value={form.employeeId}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Họ và tên
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Giới tính
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nu">Nữ</option>
                    <option value="Khac">Khác</option>
                  </select>
                </label>

                <label>
                  Ngày sinh
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Phòng ban
                  <input
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Chức vụ
                  <input
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Số điện thoại
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Ngày vào làm
                  <input
                    type="date"
                    name="hireDate"
                    value={form.hireDate}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Trạng thái
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Dang lam viec">
                      Đang làm việc
                    </option>
                    <option value="Da nghi viec">
                      Đã nghỉ việc
                    </option>
                  </select>
                </label>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="btn-save"
                  disabled={loading}
                >
                  {loading ? "Đang lưu..." : "Lưu nhân viên"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
