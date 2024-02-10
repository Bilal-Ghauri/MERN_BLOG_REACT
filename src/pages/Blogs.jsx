import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogsAction } from '../store/actions/BlogsActions'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Blogs = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { blogs, getAllBlogsloading } = useSelector(
		(state) => state.BlogReducer
	)

	useEffect(() => {
		dispatch(getAllBlogsAction())
	}, [])

	if (getAllBlogsloading) {
		return (
			<div className='text-center mt-5'>
				<Spinner />
			</div>
		)
	}

	return (
		<div className='container pt-5'>
			<div className='row row-cols-3'>
				{blogs.length > 0 &&
					blogs.map((blog) => {
						return (
							<div key={blog._id} className='col mb-5'>
								<div className='card'>
									<div
										style={{
											height: 200,
											overflow: 'hidden',
										}}>
										<img
											src={blog?.blogImage}
											className='card-img-top img-fluid'
											alt='...'
										/>
									</div>
									<div className='card-body'>
										<h5
											className='card-title'
											onClick={() => {
												navigate(
													`/blog/${blog?.blogSlug}`
												)
											}}
											style={{ cursor: 'pointer' }}>
											{blog?.blogTitle}
										</h5>
									</div>
									<div className='card-footer text-muted'>
										{moment(blog?.createdAt).fromNow()}
									</div>
								</div>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default Blogs
