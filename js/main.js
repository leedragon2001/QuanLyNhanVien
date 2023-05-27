var dsnv = new DSNV();
var validation = new Validation();
function getEle(id) {
  return document.getElementById(id);
}
function layThongTinNV(isAdd) {
  var taiKhoan = getEle("tknv").value;
  var hoTen = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCB = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  var isValid = true;

  if (isAdd) {
    isValid &=
      validation.kiemTraRong(
        taiKhoan,
        "tbTKNV",
        "(*) Vui lòng nhập Tài Khoản"
      ) &&
      validation.kiemTraDoDaiKiTu(
        taiKhoan,
        "tbTKNV",
        "(*) Vui lòng nhập 4-6 kí số",
        4,
        6
      ) &&
      validation.kiemTraTaiKhoanTonTai(
        taiKhoan,
        "tbTKNV",
        "(*) Tài khoản đã tồn tại",
        dsnv.arr
      );
  }

  isValid &=
    validation.kiemTraRong(hoTen, "tbTen", "(*) Vui lòng nhập tên") &&
    validation.kiemTraChuoiKiTu(hoTen, "tbTen", "(*) Vui lòng nhập đúng kí tự");

  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập Email") &&
    validation.kiemTraPattern(
      email,
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "tbEmail",
      "(*) Vui lòng nhập email hợp lệ"
    );

  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập Passwords"
    ) &&
    validation.kiemTraDoDaiKiTu(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập 6-10 kí tự",
      6,
      10
    ) &&
    validation.kiemTraPassword(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );

  isValid &=
    validation.kiemTraRong(ngayLam, "tbNgay", "(*) Vui lòng nhập Ngày Làm") &&
    validation.kiemTraPattern(
      ngayLam,
      /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/,
      "tbNgay",
      "(*) Vui lòng nhập thời gian hợp lệ"
    );

  isValid &= validation.kiemTraKhoaHoc(
    "chucvu",
    "tbChucVu",
    "(*) Vui lòng chọn chức vụ"
  );

  isValid &=
    validation.kiemTraRong(luongCB, "tbLuongCB", "(*) Vui lòng nhập Lương") &&
    validation.kiemTraPattern(
      luongCB,
      /^(1\d{6}|20000000)$/,
      "tbLuongCB",
      "(*) Vui lòng nhập lương từ 1000000-20000000"
    );

  isValid &=
    validation.kiemTraRong(gioLam, "tbGiolam", "(*) Vui lòng nhập Giờ Làm") &&
    validation.kiemTraPattern(
      gioLam,
      /^(8\d|9\d|1\d{2}|200)$/,
      "tbGiolam",
      "(*) Vui lòng nhập từ 80h-200h",
      1,
      2
    );

  if (isValid) {
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

    nv.tinhTongLuong();
    nv.xepLoai;

    return nv;
  }
  return null;
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
  var nv = layThongTinNV(true);
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
  getEle("btnCapNhat").style.display = "block";
}

getEle("btnCapNhat").addEventListener("click", function (e) {
  e.preventDefault();
  var nv = layThongTinNV(false);
  dsnv.capNhatNV(nv);
  renderTable(dsnv.arr);
  setLocalStorage();
  $("#myModal").modal("hide");
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
    dsnv.arr = JSON.parse(localStorage.getItem("DSNV"));
    renderTable(dsnv.arr);
  }
}
getLocalStorage();

getEle("btnThem").onclick = function () {
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemNV").style.display = "block";
  document.getElementById("modal__form").reset();
};
