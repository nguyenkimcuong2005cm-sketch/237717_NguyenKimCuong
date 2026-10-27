
# HỆ THỐNG QUẢN LÝ NHÂN SỰ

## Thông tin sinh viên
- Họ tên: Nguyễn Kim Cương
- MSSV: 237717
- Lớp: DH23TIN10

## Giới thiệu
Hệ thống quản lý nhân sự được xây dựng và triển khai trên nền tảng điện toán đám mây.

Các chức năng:
- Xem danh sách nhân viên
- Thêm nhân viên
- Tìm kiếm nhân viên
- Xem và cập nhật thông tin nhân viên
- Xóa nhân viên
- Thông báo kết quả thao tác

## Công nghệ sử dụng
- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Quản lý mã nguồn: Git, GitHub
- Đóng gói ứng dụng: Docker
- Lưu trữ image: Docker Hub
- Triển khai: Render

## Hướng dẫn chạy ở môi trường phát triển

### Backend
```bash
cd backend
npm install
npm run dev
```

Cần cấu hình biến môi trường MONGODB_URI và PORT trong file .env trước khi chạy.

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Cần cấu hình địa chỉ Backend API phù hợp.

## Liên kết bài thi

- **Link_GitHub:** https://github.com/nguyenkimcuong2005cm-sketch/237717_NguyenKimCuong
- **Link_Docker_Backend:** https://hub.docker.com/r/kimcuong237717/employee-backend
- **Link_Docker_Frontend:** https://hub.docker.com/r/kimcuong237717/employee-frontend
- **Link_Render_App:** https://web-237717.onrender.com
- **Link_Render_API:** https://api-237717.onrender.com/api/employees
- **Link_Data_MongoDB:** Chờ bổ sung đường dẫn MongoDB Atlas Data Explorer

## Các chức năng đã xây dựng

- Hiển thị danh sách nhân viên từ MongoDB Atlas.
- Thêm nhân viên mới.
- Tìm kiếm nhân viên.
- Chỉnh sửa thông tin nhân viên.
- Xóa nhân viên.
- Hiển thị thông báo kết quả thao tác.

## Triển khai hệ thống

- **Frontend:** React, Vite, Docker, Nginx, Render.
- **Backend:** Node.js, Express, Docker, Render.
- **Database:** MongoDB Atlas.
- **Quản lý mã nguồn:** GitHub.
- **Lưu trữ Docker image:** Docker Hub.

**Lưu ý bảo mật:** File `.env` chứa thông tin kết nối cơ sở dữ liệu không được đưa lên GitHub.