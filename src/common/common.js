

export const StatusCode = {
    SUCCESS: 1,
    FAIL: 2,
    NOT_LOGIN: 3,
    OTHER_ERROR: 4,
    CONTACT_DEV: 5,
    ERROR_USER: 6,
    UPDATE_PASSWORD: 7,
}

export const returnMessage = (statusCode) => {
    switch (statusCode) {
        case StatusCode.SUCCESS:
            return "Xử lý thành công";
        case StatusCode.FAIL:
            return "Xử lý không thành công";
        case StatusCode.NOT_LOGIN:
            return "Chưa đăng nhập";
        case StatusCode.OTHER_ERROR:
            return "Lỗi khác";
        case StatusCode.CONTACT_DEV:
            return "Có lỗi xảy ra trong quá trình xử lý vui lòng liên hệ kỹ thuật!";
        case StatusCode.UPDATE_PASSWORD:
            return "Cập nhật mật khẩu thành công!";
        case StatusCode.ERROR_USER:
            return "Sai tên tài khoản hoặc mật khẩu!";
        default:
            return "";
    }
}


function maskPhoneNumber(phoneNumber) {
    let subNum = phoneNumber.toString().substring(0, 3);
    let subNumLast = phoneNumber.toString().substring(phoneNumber.length - 3, phoneNumber.length);
    subNum = subNum + "xxxx" + subNumLast;
    return subNum;
}
function hideEmail(email) {
    return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
        for (let i = 0; i < gp3.length; i++) {
            gp2 += "*";
        }
        return gp2;
    });
}

export const TYPE = {
    phone: "phone",
    email: "email",
};

export const hideMaskEmailOrPhone = (str, type) => {
    if (type === TYPE.phone) {
        return maskPhoneNumber(str)
    }
    return hideEmail(str)
}