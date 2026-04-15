class SinhVien {
    constructor(hoTen, msv, lop) {
        this.hoTen = hoTen;
        this.msv = msv;
        this.lop = lop;

        this.email = this.taoEmail();
        this.khoaHoc = this.taoKhoaHoc();
        this.khoa = this.taoKhoa();
    }

    // Tạo email
    taoEmail() {
        let parts = this.hoTen.trim().toLowerCase().split(" ");

        let ten = parts.pop(); // tên
        let vietTat = parts.map(p => p[0]).join(""); // nv

        return `${ten}${vietTat}.${this.msv.toLowerCase()}@hvnh.edu.vn`;
    }

    // Ví dụ: 27A4041234 -> khóa 27
    taoKhoaHoc() {
        return "K" + this.msv.substring(0, 2);
    }

    // Ví dụ logic khoa (bạn chỉnh theo thầy dạy)
    taoKhoa() {
        if (this.msv.includes("A4")) return "Công nghệ thông tin";
        if (this.msv.includes("A3")) return "Kinh tế";
        return "Khác";
    }
}
document.getElementById("fileInput").addEventListener("change", handleFile);

function handleFile(e) {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, { type: "array" });

        let sheet = workbook.Sheets[workbook.SheetNames[0]];
        let json = XLSX.utils.sheet_to_json(sheet);

        renderTable(json);
    };

    reader.readAsArrayBuffer(file);
}

function renderTable(data) {
    let tbody = document.querySelector("#table tbody");
    tbody.innerHTML = "";

    data.forEach(row => {
        let sv = new SinhVien(row["Họ tên"], row["MSV"], row["Lớp"]);

        let tr = `
            <tr>
                <td>${sv.hoTen}</td>
                <td>${sv.msv}</td>
                <td>${sv.lop}</td>
                <td>${sv.email}</td>
                <td>${sv.khoaHoc}</td>
                <td>${sv.khoa}</td>
            </tr>
        `;

        tbody.innerHTML += tr;
    });
}