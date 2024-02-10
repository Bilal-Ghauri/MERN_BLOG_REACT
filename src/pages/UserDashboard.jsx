import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

const UserDashboard = () => {
	const { user } = useSelector((state) => state.UserReducer)

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md-2 border-start border-end pt-3'>
					<li className='userdashboardlinks'>
						<Link
							to={`/${user?._id}/dashboard/profile`}
							className='text-dark text-bold'>
							Profile
						</Link>
					</li>
					<li className='userdashboardlinks'>
						<Link
							to={`/${user?._id}/dashboard/createblog`}
							className='text-dark '>
							Create Blog
						</Link>
					</li>
				</div>
				<div className='col-md-10'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default UserDashboard
