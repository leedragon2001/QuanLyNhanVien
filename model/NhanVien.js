function NhanVien(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCB,
  chucVu,
  gioLam
) {
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCB = luongCB;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
  this.tongLuong = 0;
  this.xepLoai = "";

  this.tinhTongLuong = function () {
    if (chucVu === "Sếp") {
      this.tongLuong = Number(this.luongCB) * 3;
    } else if (chucVu === "Trưởng phòng") {
      this.tongLuong = Number(this.luongCB) * 2;
    } else if (chucVu === "Nhân viên") {
      this.tongLuong = Number(this.luongCB);
    }
  };

  if (this.gioLam >= 192) {
    this.xepLoai = "nhân viên xuất sắc";
  } else if (this.gioLam >= 176) {
    this.xepLoai = "nhân viên giỏi";
  } else if (this.gioLam >= 160) {
    this.xepLoai = "nhân viên khá";
  } else if (this.gioLam < 160) {
    this.xepLoai = "nhân viên trung bình";
  }
}
