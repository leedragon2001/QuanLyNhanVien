function DSNV() {
  this.arr = [];

  this.themNV = function (nv) {
    this.arr.push(nv);
  };
  this.timViTri = function (taiKhoan) {
    index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      var nv = this.arr[i];
      if (nv.taiKhoan === taiKhoan) {
        index = i;
        break;
      }
    }
    return index;
  };
  this.xoaNV = function (taiKhoan) {
    var index = this.timViTri(taiKhoan);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };
  this.layThongTinNV = function (taiKhoan) {
    var index = this.timViTri(taiKhoan);
    if (index !== -1) {
      return this.arr[index];
    }
    return null;
  };
  this.capNhatNV = function (nv) {
    var index = this.timViTri(nv.taiKhoan);
    if (index !== -1) {
      this.arr[index] = nv;
    }
  };
  this.timKiemNV = function (keywork) {
    var mangTimKiem = [];
    for (var i = 0; i < this.arr.length; i++) {
      var nv = this.arr[i];
      // chuyển về chữ viết thường
      var keywork = keywork.toLowerCase();
      var loaiNV = nv.xepLoai.toLowerCase();
      if (loaiNV.indexOf(keywork) !== -1) {
        mangTimKiem.push(nv);
      }
    }
    return mangTimKiem;
  };
}
