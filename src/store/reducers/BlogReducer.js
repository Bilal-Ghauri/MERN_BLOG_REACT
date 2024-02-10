import { GET_ALL_BLOGS_LOADING_FALSE, GET_ALL_BLOGS_LOADING_TRUE, GET_SINGLE_BLOG_LOADING_FALSE, GET_SINGLE_BLOG_LOADING_TRUE, POST_BLOG_LOADING_FALSE, POST_BLOG_LOADING_TRUE, SET_BLOGS, SET_SINGLE_BLOG } from "../constants/blog.constant"

const initialState = {
    blogs: [],
    postBlogLoading: false,
    singleBlog: null,
    getAllBlogsloading: false,
    singleBlogLoading: false
}

const BlogReducer = (state = initialState, action) => {
    if (action.type == POST_BLOG_LOADING_FALSE) {
        return { ...state, postBlogLoading: false }
    }
    if (action.type == POST_BLOG_LOADING_TRUE) {
        return { ...state, postBlogLoading: true }
    }
    if (action.type == SET_BLOGS) {
        return { ...state, blogs: action.payload }
    }
    if (action.type == SET_SINGLE_BLOG) {
        return { ...state, singleBlog: action.payload }
    }
    if (action.type == GET_ALL_BLOGS_LOADING_FALSE) {
        return { ...state, getAllBlogsloading: false }
    }
    if (action.type == GET_ALL_BLOGS_LOADING_TRUE) {
        return { ...state, getAllBlogsloading: true }
    }
    if (action.type == GET_SINGLE_BLOG_LOADING_FALSE) {
        return { ...state, singleBlogLoading: false }
    }
    if (action.type == GET_SINGLE_BLOG_LOADING_TRUE) {
        return { ...state, singleBlogLoading: true }
    }
    return state
}

export default BlogReducer