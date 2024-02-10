import { Navigate } from 'react-router-dom'

const AuthenticatedRotue = ({ children }) => {
	let token = localStorage.getItem('blogAppToken')
	if (token) {
		return children
	}
	return <Navigate to={'/'} replace />
}

export default AuthenticatedRotue
