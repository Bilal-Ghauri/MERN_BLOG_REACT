import { Link, useNavigate } from 'react-router-dom'
import LoginModal from './LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT_USER } from '../store/constants/user.constants'

const Navbar = () => {
	const { user } = useSelector((state) => state.UserReducer)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const logoutUser = () => {
		localStorage.removeItem('blogAppToken')
		dispatch({ type: LOGOUT_USER })
		navigate('/')
	}
	return (
		<>
			<nav className='navbar fixed-top navbar-expand-lg navbar-dark bg-dark'>
				<div className='container'>
					<Link to={'/'} className='navbar-brand fs-3'>
						Bilal Ghauri
					</Link>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarNav'
						aria-controls='navbarNav'
						aria-expanded='false'
						aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarNav'>
						<ul className='navbar-nav ms-auto'>
							<li className='nav-item'>
								<Link to={`/blogs`} className='nav-link active'>
									Blogs
								</Link>
							</li>
							{!localStorage.getItem('blogAppToken') && (
								<li className='nav-item'>
									<a
										className='nav-link active'
										aria-current='page'
										data-bs-toggle='modal'
										data-bs-target='#exampleModalToggle'
										href='#'>
										Login
									</a>
								</li>
							)}
							{localStorage.getItem('blogAppToken') && (
								<>
									<li className='nav-item'>
										<Link
											to={`/${user?._id}/dashboard`}
											className='nav-link active'
											href='#'>
											Dashboard
										</Link>
									</li>
									<li className='nav-item'>
										<a
											className='nav-link active'
											onClick={logoutUser}
											href='#'>
											Logout
										</a>
									</li>
									<a className='nav-link active' href='#'>
										Hello! {user?.name}
									</a>
								</>
							)}
						</ul>
					</div>
				</div>
			</nav>
			<LoginModal />
		</>
	)
}

export default Navbar
