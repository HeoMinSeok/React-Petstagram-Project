import axios from "axios";

class CommentService {
    static BASE_URL = "/api";

    // 댓글 리스트 조회
    static async getCommentList(postId) {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${CommentService.BASE_URL}/comment/list/${postId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    }

    // 댓글 작성
    static async createPost(formData, postId) {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${CommentService.BASE_URL}/comment/write/${postId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    }

    // 댓글 수정
    static async updateComment(commentId, commentData) {
        const token = localStorage.getItem("token");
        const response = await axios.put(
            `${CommentService.BASE_URL}/comment/update/${commentId}`,
            commentData,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    // 댓글 삭제
    static async deleteComment(commentId) {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
            `${CommentService.BASE_URL}/comment/delete/${commentId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }
}

export default CommentService;
