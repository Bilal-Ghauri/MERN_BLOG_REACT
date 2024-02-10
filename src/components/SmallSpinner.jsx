const SmallSpinner = () => {
	return (
		<div
			className='spinner-border'
			style={{ height: 18, width: 18 }}
			role='status'>
			<span className='visually-hidden'>Loading...</span>
		</div>
	)
}

export default SmallSpinner
