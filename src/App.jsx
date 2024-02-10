import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Navbar from './components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import UserDashboard from './pages/UserDashboard'
import 'react-quill/dist/quill.snow.css'
import toast, { Toaster } from 'react-hot-toast'
import AuthenticatedRotue from './routes/AuthenticatedRotue'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthenticateUserAction } from './store/actions/UserActions'
import Spinner from './components/Spinner'
import UserDashboardCreateBlog from './pages/UserDashboardCreateBlog'
import UserDashboardProfile from './pages/UserDashboardProfile'
import Blogs from './pages/Blogs'
import SingleBlog from './pages/SingleBlog'

function App() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { loading } = useSelector((state) => state.AppReducer)

	useEffect(() => {
		const token = localStorage.getItem('blogAppToken')
		if (!token) {
			// navigate('/')
		} else {
			dispatch(AuthenticateUserAction(token, navigate, toast))
		}
	}, [])

	if (loading) {
		return (
			<div className='text-center mt-5'>
				<Spinner />
			</div>
		)
	}
	return (
		<>
			<Navbar />
			<div className='mt-5 pt-3'></div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/blogs' element={<Blogs />} />
				<Route path='/blog/:slug' element={<SingleBlog />} />

				<Route
					path='/:id/dashboard'
					element={
						<AuthenticatedRotue>
							<UserDashboard />
						</AuthenticatedRotue>
					}>
					<Route
						path='createblog'
						element={<UserDashboardCreateBlog />}
					/>
					<Route path='profile' element={<UserDashboardProfile />} />
				</Route>
			</Routes>
			<Toaster position='top-right' />
		</>
	)
}

export default App
