import axios from "axios";

class StoryService {
    static BASE_URL = "/api";

    static async uploadStory(formData) {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("인증 토큰이 없습니다.");
            return;
        }

        try {
            const response = await axios.post(
                `${this.BASE_URL}/story/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            throw new Error("Failed to upload story");
        }
    }

    static async getStories() {
        try {
            const response = await axios.get(`${this.BASE_URL}/story/list`);
            return response.data;
        } catch (error) {
            console.error(
                "Failed to fetch stories",
                error.response ? error.response.data : error.message
            );
            throw new Error("Failed to fetch stories");
        }
    }

    static async getUserStories(userId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/story/list/${userId}`);
            return response.data;
        } catch (error) {
            console.error(
                "Failed to fetch user stories",
                error.response ? error.response.data : error.message
            );
            throw new Error("Failed to fetch user stories");
        }
    }
}

export default StoryService;
