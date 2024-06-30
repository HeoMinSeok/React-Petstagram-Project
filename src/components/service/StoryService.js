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
            const response = await axios.post(`${this.BASE_URL}/story/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });
    
            return response.data;
        } catch (error) {
            throw new Error("Failed to upload story");
        }
    }
}

export default StoryService;