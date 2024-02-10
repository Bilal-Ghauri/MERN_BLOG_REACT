const SingleTag = ({ eachTag, tags, setTags }) => {
	return (
		<span className='col-lg-3 single-tag border position-relative p-3 mb-3 rounded-pill'>
			<span
				className='closebtn position-absolute  border p-1 rounded-circle bg-dark text-white'
				onClick={() => {
					let allTags = [...tags]
					let filterTags = allTags.filter((t) => t.id !== eachTag.id)
					setTags(filterTags)
				}}
				style={{
					top: -15,
					right: 10,
					cursor: 'pointer',
				}}>
				x
			</span>
			{eachTag.name}
		</span>
	)
}

export default SingleTag
