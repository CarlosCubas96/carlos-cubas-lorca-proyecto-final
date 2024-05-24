import AxiosService from '../../common/axios-service';

const PostService = {
  getAllPosts: (searchQuery, pageNumber, pageSize) => {
    const url = searchQuery ? `posts?searchTerm=${searchQuery}&pageNumber=${pageNumber}&pageSize=${pageSize}` : `posts?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return AxiosService.get(url)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  getPostById: (id) => {
    return AxiosService.get(`posts/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  getAllCategories: () => {
    return AxiosService.get('posts/categories')
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  createPost: (postData) => {
    return AxiosService.post('posts', postData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  updatePost: (id, postData) => {
    return AxiosService.put(`posts/${id}`, postData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  deletePost: (id) => {
    return AxiosService.delete(`posts/${id}`)
      .then(() => true)
      .catch(error => {
        throw error;
      });
  },

  addTagToPost: (postId, tagData) => {
    return AxiosService.post(`posts/${postId}/tags`, tagData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  removeTagFromPost: (postId, tagId) => {
    return AxiosService.delete(`posts/${postId}/tags/${tagId}`)
      .then(() => true)
      .catch(error => {
        throw error;
      });
  }
};

export default PostService;
