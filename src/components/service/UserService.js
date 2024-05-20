import axios from "axios";

class UserService {
    static BASE_URL = "/api";

    // 로그인
    static async login(email, password) {
        const response = await axios.post(
            `${UserService.BASE_URL}/user/login`,
            {
                email,
                password,
            }
        );
        return response.data;
    }

    // 회원가입
    static async signup(userData) {
        const response = await axios.post(
            `${UserService.BASE_URL}/user/signup`,
            userData
        );
        return response.data;
    }

    // 마이페이지
    static async getYourProfile(token) {
        const response = await axios.get(
            `${UserService.BASE_URL}/user/profile`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    // 회원 수정
    static async updateUser(userId, formData, token) {
        const response = await axios.put(
            `${UserService.BASE_URL}/user/edit/${userId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    }
    

    // 회원 삭제
    static async deleteUser(userId, token) {
        const response = await axios.delete(
            `${UserService.BASE_URL}/user/delete/${userId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    // 모든 회원 조회
    static async getAllUsers(token) {
        const response = await axios.get(
            `${UserService.BASE_URL}/user/getAllUsers`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    // 회원 한명 조회
    static async getUserById(userId, token) {
        const response = await axios.get(
            `${UserService.BASE_URL}/user/get/${userId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    /**AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    static isAuthenticated() {
        const token = localStorage.getItem("token");
        return !!token;
    }

    static isAdmin() {
        const role = localStorage.getItem("role");
        return role === "ADMIN";
    }

    static isUser() {
        const role = localStorage.getItem("role");
        return role === "USER";
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin();
    }
}

export default UserService;
