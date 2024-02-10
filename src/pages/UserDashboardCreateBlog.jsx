import { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import SingleTag from '../components/SingleTag'
import slugify from 'slugify'
import { useDispatch, useSelector } from 'react-redux'
import { postBlogAction } from '../store/actions/BlogsActions'
import SmallSpinner from '../components/SmallSpinner'
import toast from 'react-hot-toast'

const UserDashboardCreateBlog = () => {
	const [tags, setTags] = useState([])
	const [tag, setTag] = useState('')

	const { postBlogLoading } = useSelector((state) => state.BlogReducer)

	const [blogTitle, setBlogTitle] = useState('')
	const [blogSlug, setBlogSlug] = useState('')
	const [blogImage, setBlogImage] = useState(null)
	const [value, setValue] = useState('')
	const dispatch = useDispatch()
	const [formErros, setFormErrors] = useState(null)
	const fileInputRef = useRef(null)
	function generateRandomId() {
		return Math.random().toString(36).substring(2) + Date.now().toString(36)
	}

	const handleAddTag = (e) => {
		e.preventDefault()
		if (tag.trim() !== '') {
			setTags((tags) => [...tags, { id: generateRandomId(), name: tag }])
			setTag('')
		}
	}

	const handleSaveBlog = async () => {
		const errors = {}
		if (blogTitle.trim() == '') {
			errors.blogTitle = 'Blog Title is required'
		}
		if (blogSlug.trim() == '') {
			errors.blogSlug = 'Blog Title is required'
		}
		if (blogImage == null) {
			errors.blogImage = 'Blog Image is required'
		}
		if (value.trim() == '') {
			errors.blogValue = 'Blog Content is required'
		}

		if (Object.keys(errors).length > 0) {
			setFormErrors(errors)
		} else {
			setFormErrors(null)
			dispatch(
				postBlogAction(
					{
						blogTitle,
						blogSlug,
						blogContent: value,
						tags: tags.map((item) => item.name),
					},
					blogImage,
					toast
				)
			)

			setBlogTitle('')
			setBlogSlug('')
			setBlogImage(null)
			setValue('')
			setTags([])
			setTag('')
			if (fileInputRef.current) {
				fileInputRef.current.value = ''
			}
		}
	}

	useEffect(() => {
		if (blogTitle.trim() !== '') {
			let text = slugify(blogTitle)
			setBlogSlug(text)
		}
	}, [blogTitle])

	return (
		<div className='container'>
			<div className='mt-3'>
				<h3 className='pb-3'>Add Blog</h3>
				<div className='mb-3 '>
					<label htmlFor='blogtitle' className='form-label'>
						Title
					</label>
					<input
						type='text'
						className='form-control'
						value={blogTitle}
						onChange={(e) => setBlogTitle(e.target.value)}
						id='blogtitle'
						placeholder=''
					/>
					{formErros?.blogTitle && (
						<small className='text-danger'>
							{formErros?.blogTitle}
						</small>
					)}
				</div>
				<div className='mb-3 '>
					<label htmlFor='slug' className='form-label'>
						Slug
					</label>
					<input
						type='text'
						className='form-control'
						value={blogSlug}
						onChange={(e) => setBlogSlug(e.target.value)}
						id='slug'
						placeholder=''
					/>
					{formErros?.blogSlug && (
						<small className='text-danger'>
							{formErros?.blogSlug}
						</small>
					)}
				</div>
				<div className='mb-3'>
					<label htmlFor='formFile' className='form-label'>
						Image
					</label>
					<input
						className='form-control'
						onChange={(e) => setBlogImage(e.target.files[0])}
						ref={fileInputRef}
						type='file'
						id='formFile'
					/>
					{formErros?.blogImage && (
						<small className='text-danger'>
							{formErros?.blogImage}
						</small>
					)}
				</div>
				<ReactQuill
					value={value}
					onChange={setValue}
					style={{ height: 250 }}
					modules={{
						toolbar: [
							[{ header: [1, 2, false] }],
							[
								'bold',
								'italic',
								'underline',
								'strike',
								'blockquote',
								'code-block',
							],
							[
								{ list: 'ordered' },
								{ list: 'bullet' },
								{ indent: '-1' },
								{ indent: '+1' },
							],
							['link', 'image'],
							['clean'],
						],
					}}
					formats={[
						'header',
						'font',
						'size',
						'bold',
						'italic',
						'underline',
						'strike',
						'blockquote',
						'list',
						'bullet',
						'indent',
						'link',
						'image',
						'video',
						'code-block', // Include 'pre' format
					]}
				/>
				{formErros?.blogValue && (
					<div className='mt-5'>
						<small className='text-danger '>
							{formErros?.blogValue}
						</small>
					</div>
				)}
				<form onSubmit={handleAddTag} className=' pt-sm-0 pt-4'>
					<div className='mb-3 mt-5 '>
						<label htmlFor='tags' className='form-label'>
							Tags
						</label>
						<div className='d-flex  align-items-center  '>
							<input
								type='text'
								className='form-control'
								id='tags'
								placeholder=''
								value={tag}
								onChange={(e) => setTag(e.target.value)}
							/>
							<div className='ms-2 '>
								<button
									className='btn px-md-4 btn-secondary'
									type='submit'>
									Add
								</button>
							</div>
						</div>
						<div className='mt-4 py-3'>
							<div className='row'>
								{tags.map((eachTag) => {
									return (
										<SingleTag
											key={eachTag.id}
											eachTag={eachTag}
											tags={tags}
											setTags={setTags}
										/>
									)
								})}
							</div>
						</div>
					</div>
				</form>
				<button className='btn btn-dark mb-4' onClick={handleSaveBlog}>
					{postBlogLoading ? <SmallSpinner /> : 'Save Blog'}
				</button>
			</div>
		</div>
	)
}

export default UserDashboardCreateBlog
