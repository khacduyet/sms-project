import { Dimensions } from 'react-native';

export const { height, width } = Dimensions.get('window');
export const FONT_SIZE_TINY = 13;
export const FONT_SIZE_SMALL = 14;
export const FONT_SIZE_DEFAULT = 15;
export const FONT_SIZE_MEDIUM = 16;
export const FONT_SIZE_LARGE = 18;
export const FONT_SIZE_HUGE = 20;
export const FONT_SIZE_LARGER = 22;
export const FONT_SIZE_SUPER_LARGE = 24;

export const API_URL = '';
export const FONT_SEMIBOLD = '500';
export const BUTTON_HEIGHT = 56;

export const BASE_URL = 'http://103.130.212.45:1889/';


export const Screens = {
    Tutorials: 'Hướng dẫn',
    Login: 'Login',
    Home: 'Trang Chủ',
    Notification: 'Thông báo',
    Profile: 'Tài khoản',
    AddServer: 'AddServer',
    AddTask: 'AddTask',
    ChangePassword: 'Đổi mật khẩu',
    ForgotPassword: 'Quên mật khẩu',
    Chat: 'Trò chuyện',
    ChatPersonalPage: 'Trò chuyện Riêng',
    NotificationGeneral: 'Thông báo chung',
    Personal: 'Thông tin cá nhân',
    InfoSupport: 'Thông tin hỗ trợ',
    Setting: 'Cài đặt',
    Schedula: 'TKB',
    TestSchedule: 'Lịch thi',
    Attendance: 'Điểm danh',
    Academic: 'KQHT',
    More: 'Thêm',
    TrainingPlan: 'Kế hoạch đào tạo',
    HocLai: 'Học lại',
    PhieuDangKy: 'Phiếu đăng ký',
    HocPhan: 'Đăng ký học phần',
    TuyChon: 'Tùy chọn',
    ChatBot: 'Thư viện câu hỏi',
};

export const TextButton = {
    Accept: "Xác nhận",
    Cancel: "Hủy bỏ",
    Close: "Đóng",
    Next: "Tiếp theo",
    Back: "Quay lại",
    Previous: "Trước",
}


export const Colors = {
    Primary: '#243ffa',
    Secondary: '#6c757d',
    Success: '#28a745',
    Danger: '#dc3545',
    Warning: '#ffc108',
    Info: '#17a2b8',
    Light: '#f8f9fa',
    Dark: '#343a40',
    HeaderTitle: `#C9F4FD`
}


export const Regexs = {
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/,
}