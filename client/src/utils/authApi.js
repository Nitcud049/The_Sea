// src/utils/authApi.js

export const API_BASE = 'http://127.0.0.1:5000/api';

export const SESSION_EVENT = 'the-sea-session-change';

const TOKEN_KEY = 'the_sea_token';
const USER_KEY = 'the_sea_user';

// ==========================================
// ĐỌC TOKEN
// ==========================================

export const getToken = () =>
    localStorage.getItem(TOKEN_KEY) || '';

// Chỉ đọc hạn token để điều khiển giao diện.
// Server vẫn phải xác thực chữ ký token và quyền tài khoản.
export function tokenExpiresAt(token = getToken()) {
    try {
        const encoded = token
            .split('.')[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const padded = encoded.padEnd(
            Math.ceil(encoded.length / 4) * 4,
            '='
        );

        const payload = JSON.parse(atob(padded));

        return Number.isFinite(payload.exp)
            ? payload.exp * 1000
            : 0;
    } catch {
        return 0;
    }
}

// ==========================================
// ĐỌC TÀI KHOẢN ĐÃ LƯU
// ==========================================

export function readSessionUser() {
    try {
        if (tokenExpiresAt() <= Date.now()) {
            return null;
        }

        const user = JSON.parse(
            localStorage.getItem(USER_KEY) || 'null'
        );

        if (
            !user ||
            typeof user !== 'object' ||
            !user._id
        ) {
            return null;
        }

        const clean = { ...user };

        delete clean.password;

        return clean;
    } catch {
        return null;
    }
}

// ==========================================
// LƯU PHIÊN ĐĂNG NHẬP
// ==========================================

export function saveSession(data) {
    if (
        !data?.user?._id ||
        typeof data.token !== 'string' ||
        tokenExpiresAt(data.token) <= Date.now()
    ) {
        throw new Error(
            'Phản hồi đăng nhập thiếu tài khoản hoặc token hợp lệ.'
        );
    }

    const user = { ...data.user };

    delete user.password;

    try {
        localStorage.setItem(
            USER_KEY,
            JSON.stringify(user)
        );

        localStorage.setItem(
            TOKEN_KEY,
            data.token
        );
    } catch {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);

        throw new Error(
            'Không lưu được phiên đăng nhập trong trình duyệt.'
        );
    }

    window.dispatchEvent(
        new CustomEvent(SESSION_EVENT, {
            detail: {
                reason: 'login'
            }
        })
    );

    return user;
}

// ==========================================
// XÓA PHIÊN ĐĂNG NHẬP
// ==========================================

export function clearSession(reason = 'logout') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    window.dispatchEvent(
        new CustomEvent(SESSION_EVENT, {
            detail: {
                reason
            }
        })
    );
}

function sessionError(message) {
    return Object.assign(
        new Error(message),
        { status: 401 }
    );
}

// ==========================================
// GỌI API CÓ TOKEN
// ==========================================

// Chỉ nhận đường dẫn tương đối, ví dụ:
// authFetch('/orders')
// authFetch('/users/ID', { method: 'DELETE' })
//
// Trả nguyên Response để bên gọi có thể xử lý riêng
// HTTP 409 khi xác nhận đã thu tiền còn lại.
export async function authFetch(path, options = {}) {
    if (
        typeof path !== 'string' ||
        !path.startsWith('/') ||
        path.startsWith('//') ||
        path.includes('\\')
    ) {
        throw new Error('Đường dẫn API không hợp lệ.');
    }

    const url = new URL(API_BASE + path);
    const base = new URL(API_BASE);

    if (
        url.origin !== base.origin ||
        !url.pathname.startsWith(base.pathname + '/')
    ) {
        throw new Error(
            'Đường dẫn nằm ngoài API của ứng dụng.'
        );
    }

    const token = getToken();

    if (
        !token ||
        tokenExpiresAt(token) <= Date.now()
    ) {
        clearSession('expired');

        throw sessionError(
            'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
        );
    }

    const headers = new Headers(options.headers);

    headers.set(
        'Authorization',
        `Bearer ${token}`
    );

    const response = await fetch(url.toString(), {
        ...options,
        headers,
        redirect: 'error'
    });

    // Không sử dụng phản hồi của tài khoản cũ
    // nếu người dùng đã đăng xuất hoặc chuyển tài khoản.
    if (getToken() !== token) {
        throw sessionError(
            'Phiên đăng nhập đã thay đổi.'
        );
    }

    if (response.status === 401) {
        clearSession('expired');

        throw sessionError(
            'Phiên đăng nhập không còn hợp lệ. Vui lòng đăng nhập lại.'
        );
    }

    // Không tự đăng xuất khi nhận 403.
    return response;
}

// ==========================================
// GỌI API CÓ TOKEN VÀ ĐỌC JSON
// ==========================================

export async function authJson(path, options = {}) {
    const token = getToken();

    const response = await authFetch(path, options);

    const data = await response
        .json()
        .catch(() => null);

    if (getToken() !== token) {
        throw sessionError(
            'Phiên đăng nhập đã thay đổi.'
        );
    }

    if (
        !response.ok ||
        data?.success === false
    ) {
        const message = data?.message || (
            response.status === 403
                ? 'Tài khoản không có quyền thực hiện thao tác này.'
                : `Yêu cầu thất bại (HTTP ${response.status}).`
        );

        throw Object.assign(
            new Error(message),
            { status: response.status }
        );
    }

    if (data === null) {
        throw new Error(
            'Máy chủ trả về dữ liệu không hợp lệ.'
        );
    }

    return data;
}