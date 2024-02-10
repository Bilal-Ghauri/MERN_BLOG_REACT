import axios from "axios";
import API from '../../../api.json'
import { GET_ALL_BLOGS_LOADING_FALSE, GET_ALL_BLOGS_LOADING_TRUE, GET_SINGLE_BLOG_LOADING_FALSE, GET_SINGLE_BLOG_LOADING_TRUE, POST_BLOG_LOADING_FALSE, POST_BLOG_LOADING_TRUE, SET_BLOGS, SET_SINGLE_BLOG } from "../constants/blog.constant";

export const postBlogAction = (postData, blogImage, toast) => async (dispatch) => {
    try {
        dispatch({ type: POST_BLOG_LOADING_TRUE })
        const postBlogRequest = await axios.post(API.BACKEND_API + '/blog/blogs', postData, { headers: { Authorization: `Bearer ${localStorage.getItem("blogAppToken")}` } })
        const postBlogResponse = await postBlogRequest.data
        const data = new FormData()
        data.append('file', blogImage)
        data.append('upload_preset', 'instauploadpreset')
        data.append('clound_name', 'dgzsyrweq')

        const response = await fetch(
            'https://api.cloudinary.com/v1_1/dgzsyrweq/image/upload',
            {
                method: 'post',
                body: data,
            }
        )
        const responseData = await response.json()
        await axios.post(API.BACKEND_API + '/blog/add/image', { blogId: postBlogResponse._id, blogImage: responseData?.secure_url })
        dispatch({ type: POST_BLOG_LOADING_FALSE })

    } catch (error) {
        dispatch({ type: POST_BLOG_LOADING_FALSE })
        if (error?.response?.data?.msg) {
            toast.error(error?.response?.data?.msg)
        }
        console.log(error);
    }
}

export const getAllBlogsAction = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_BLOGS_LOADING_TRUE })
        const allBlogsRequest = await axios.get(API.BACKEND_API + '/blog/blogs')
        const allBlogsResponse = await allBlogsRequest.data
        dispatch({ type: SET_BLOGS, payload: allBlogsResponse })
        dispatch({ type: GET_ALL_BLOGS_LOADING_FALSE })

    } catch (error) {
        dispatch({ type: GET_ALL_BLOGS_LOADING_FALSE })
        console.log(error);
    }
}

export const getSingleBlog = (slug) => async (dispatch) => {
    try {
        dispatch({ type: GET_SINGLE_BLOG_LOADING_TRUE })
        const allBlogsRequest = await axios.get(API.BACKEND_API + '/blog/blogs/' + slug)
        const allBlogsResponse = await allBlogsRequest.data
        dispatch({ type: SET_SINGLE_BLOG, payload: allBlogsResponse })
        dispatch({ type: GET_SINGLE_BLOG_LOADING_FALSE })

    } catch (error) {
        dispatch({ type: GET_SINGLE_BLOG_LOADING_FALSE })
        console.log(error);
    }
}