var dsnv = new DSNV();
function getEle(id) {
  return document.getElementById(id);
}
function layThongTinNV(isAdd) {
  //Lấy thông tin từ user
  var taiKhoan = getEle("tknv").value;
  var hoTen = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCB = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  /**
   * Validate
   */

  // form hợp lệ = true
  // var isValid = true;

  // //check validation

  // if (isAdd) {
  //   isValid &=
  //     validation.kiemTraRong(
  //       _maSV,
  //       "errorMaSV",
  //       "(*) Vui lòng nhập Mã Sinh Viên"
  //     ) &&
  //     validation.kiemTraDoDaiKiTu(
  //       _maSV,
  //       "errorMaSV",
  //       "(*) Vui lòng nhập 2-10 kí tự",
  //       2,
  //       10
  //     ) &&
  //     validation.kiemTraMaSVTonTai(
  //       _maSV,
  //       "errorMaSV",
  //       "(*) Mã Sinh Viên đã tồn tại",
  //       dssv.arr
  //     );
  // }

  // isValid &=
  //   validation.kiemTraRong(
  //     _tenSV,
  //     "errorTenSV",
  //     "(*) Vui lòng nhập Tên Sinh Viên"
  //   ) &&
  //   validation.kiemTraDoDaiKiTu(
  //     _tenSV,
  //     "errorTenSV",
  //     "(*) Vui lòng nhập 4-50 kí tự",
  //     2,
  //     10
  //   ) &&
  //   validation.kiemTraChuoiKiTu(
  //     _tenSV,
  //     "errorTenSV",
  //     "(*) Vui lòng nhập đúng kí tự"
  //   );

  // isValid &=
  //   validation.kiemTraRong(_email, "errorEmail", "(*) Vui lòng nhập Email") &&
  //   validation.kiemTraPattern(
  //     _email,
  //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  //     "errorEmail",
  //     "(*) Vui lòng nhập email hợp lệ"
  //   );

  // isValid &=
  //   validation.kiemTraRong(
  //     _matKhau,
  //     "errorPass",
  //     "(*) Vui lòng nhập Passwords"
  //   ) &&
  //   validation.kiemTraDoDaiKiTu(
  //     _matKhau,
  //     "errorPass",
  //     "(*) Vui lòng nhập 8-16 kí tự",
  //     8,
  //     16
  //   );

  // isValid &= validation.kiemTraRong(
  //   _ngaySinh,
  //   "errorNgaySinh",
  //   "(*) Vui lòng nhập Ngày Sinh"
  // );

  // isValid &= validation.kiemTraKhoaHoc(
  //   "khSV",
  //   "errorKhoaHoc",
  //   "(*) Vui lòng chọn Khóa Học"
  // );

  // isValid &=
  //   validation.kiemTraRong(
  //     _toan,
  //     "errorDiemToan",
  //     "(*) Vui lòng nhập Điểm Toán"
  //   ) &&
  //   validation.kiemTraDoDaiKiTu(
  //     _toan,
  //     "errorDiemToan",
  //     "(*) Vui lòng nhập 1-2 kí tự",
  //     1,
  //     2
  //   );

  // isValid &=
  //   validation.kiemTraRong(_ly, "errorDiemLy", "(*) Vui lòng nhập Điểm Lý") &&
  //   validation.kiemTraDoDaiKiTu(
  //     _ly,
  //     "errorDiemLy",
  //     "(*) Vui lòng nhập 1-2 kí tự",
  //     1,
  //     2
  //   );

  // isValid &=
  //   validation.kiemTraRong(
  //     _hoa,
  //     "errorDiemHoa",
  //     "(*) Vui lòng nhập Điểm Hóa"
  //   ) &&
  //   validation.kiemTraDoDaiKiTu(
  //     _hoa,
  //     "errorDiemHoa",
  //     "(*) Vui lòng nhập 1-2 kí tự",
  //     1,
  //     2
  //   );

  // if (isValid) {
  //   //Tạo đối nv từ lớp đối tượng NhanVien

  // }
  // return null;

  var nv = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam
  );

  //Tinh Tong Luong
  nv.tinhTongLuong();
  nv.xepLoai;

  return nv;
}

function renderTable(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var nv = data[i];
    content += `
    <tr>
      <td>${nv.taiKhoan}</td>
      <td>${nv.hoTen}</td>
      <td>${nv.email}</td>
      <td>${nv.ngayLam}</td>
      <td>${nv.chucVu}</td>
      <td>${nv.tongLuong}</td>
      <td>${nv.xepLoai}</td>
      <td>
        <button class="btn btn-info" onclick="editSinhVien('${nv.taiKhoan}')">Edit</button>
        <button class="btn btn-danger" onclick="removeNhanVien('${nv.taiKhoan}')">Delete</button>
      </td>
    </tr>
    `;
  }
  getEle("tableDanhSach").innerHTML = content;
}

getEle("btnThemNV").addEventListener("click", function (e) {
  e.preventDefault();
  var nv = layThongTinNV();
  if (nv) {
    dsnv.themNV(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
  }
  $("#myModal").modal("hide");
});

function editSinhVien(taiKhoan) {
  $("#myModal").modal("show");
  var nv = dsnv.layThongTinNV(taiKhoan);
  if (nv) {
    getEle("tknv").value = nv.taiKhoan;
    getEle("tknv").disabled = true;
    getEle("name").value = nv.hoTen;
    getEle("email").value = nv.email;
    getEle("password").value = nv.password;
    getEle("datepicker").value = nv.ngayLam;
    getEle("luongCB").value = nv.luongCB;
    getEle("chucvu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;
  }
  getEle("btnThemNV").style.display = "none";
}

getEle("btnCapNhat").addEventListener("click", function (e) {
  e.preventDefault();
  var nv = layThongTinNV();
  dsnv.capNhatNV(nv);
  renderTable(dsnv.arr);
  setLocalStorage();
});

function removeNhanVien(taiKhoan) {
  dsnv.xoaNV(taiKhoan);
  renderTable(dsnv.arr);
  setLocalStorage();
}

getEle("searchName").addEventListener("keyup", function () {
  var keywork = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiemNV(keywork);
  renderTable(mangTimKiem);
});

function setLocalStorage() {
  localStorage.setItem("DSNV", JSON.stringify(dsnv.arr));
}

function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    // JSON.parse: String => JSON
    dsnv.arr = JSON.parse(localStorage.getItem("DSNV"));
    renderTable(dsnv.arr);
  }
}
getLocalStorage();

getEle("btnThem").onclick = function () {
  getEle("btnCapNhat").style.display = "none";
};
