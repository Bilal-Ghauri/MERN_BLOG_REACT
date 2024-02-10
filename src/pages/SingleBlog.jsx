import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleBlog } from '../store/actions/BlogsActions'
import Spinner from '../components/Spinner'

const SingleBlog = () => {
	let params = useParams()
	const dispatch = useDispatch()
	const { singleBlog, singleBlogLoading } = useSelector(
		(state) => state.BlogReducer
	)
	console.log('singleBLog', singleBlog)
	useEffect(() => {
		dispatch(getSingleBlog(params.slug))
	}, [])
	if (singleBlogLoading) {
		return (
			<div className='text-center mt-5'>
				<Spinner />
			</div>
		)
	}
	return (
		<div className='container'>
			<div className='d-flex mt-4 justify-content-center'>
				<div className='blog-title  fs-1 w-50 text-center '>
					{singleBlog?.blogTitle}
				</div>
			</div>
			{singleBlog?.tags?.length > 0 && (
				<div className='d-flex justify-content-center my-3'>
					{singleBlog?.tags?.map((item, index) => {
						return (
							<small
								className='border p-2 me-2 px-4 rounded-pill'
								key={index}>
								{item}
							</small>
						)
					})}
				</div>
			)}
			<div className='d-flex justify-content-center'>
				<div className='my-4 col-lg-9 '>
					<img
						src={singleBlog?.blogImage}
						alt=''
						style={{ height: 500 }}
						className='img-fluid w-100'
					/>
				</div>
			</div>
			<div className='d-flex justify-content-center pb-5'>
				<div
					className='col-lg-8 col-md-8 col-sm-10 col-12'
					dangerouslySetInnerHTML={{
						__html: singleBlog?.blogContent,
					}}
				/>
			</div>
		</div>
	)
}

export default SingleBlog
