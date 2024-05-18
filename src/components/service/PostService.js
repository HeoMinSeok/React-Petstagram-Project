import axios from "axios";

class PostService {
    static BASE_URL = "/api";

    // 게시글 리스트 조회
    static async getPostList() {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${PostService.BASE_URL}/post/list`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }

    // 게시글 작성
    static async createPost(formData, token) {
        const response = await axios.post(
            `${PostService.BASE_URL}/post/write`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    }

    // 게시글 상세보기
    static async readPost(postId, token) {
        const response = await axios.get(
            `${PostService.BASE_URL}/post/read/${postId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    // 게시글 수정
    static async updatePost(postId, postData, token) {
        const response = await axios.put(
            `${PostService.BASE_URL}/post/update/${postId}`,
            postData,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    // 게시글 삭제
    static async deletePost(postId, token) {
        const response = await axios.delete(
            `${PostService.BASE_URL}/post/delete/${postId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }
}

export default PostService;
