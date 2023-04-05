

export const StatusCode = {
    SUCCESS: 1,
    FAIL: 2,
    NOT_LOGIN: 3,
    OTHER_ERROR: 4,
    CONTACT_DEV: 5,
    ERROR_USER: 6,
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
        case StatusCode.ERROR_USER:
            return "Sai tên tài khoản hoặc mật khẩu!";
        default:
            return "";
    }
}