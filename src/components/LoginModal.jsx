import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	LoginUserAction,
	RegisterUserAction,
} from '../store/actions/UserActions'
import SmallSpinner from './SmallSpinner'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const LoginModal = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { loading, user } = useSelector((state) => state.UserReducer)
	console.log(user)
	const [registerData, setRegisterData] = useState({
		registerName: '',
		registerEmail: '',
		registerPassword: '',
	})
	const [registerError, setRegisterError] = useState(null)

	const [loginData, setLoginData] = useState({
		loginEmail: '',
		loginPassword: '',
	})
	const [loginError, setLoginError] = useState(null)

	const setLoginDataFunc = (e) => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value })
	}
	const setRegisterDataFunc = (e) => {
		setRegisterData({ ...registerData, [e.target.name]: e.target.value })
	}
	const handleRegisterUserSubmit = async (e) => {
		e.preventDefault()
		let errors = {}
		if (registerData.registerName.trim() == '') {
			errors.registerName = 'Name is required'
		}
		if (registerData.registerEmail.trim() == '') {
			errors.registerEmail = 'Email is required'
		}
		if (registerData.registerPassword.trim() == '') {
			errors.registerPassword = 'Password is required'
		}

		if (Object.keys(errors).length > 0) {
			setRegisterError(errors)
		} else {
			setRegisterError(null)
			dispatch(
				RegisterUserAction(
					{
						name: registerData.registerName,
						email: registerData.registerEmail,
						password: registerData.registerPassword,
					},
					toast,
					navigate
				)
			)
			setRegisterData({
				registerName: '',
				registerEmail: '',
				registerPassword: '',
			})
		}
	}

	const handleLoginUserSubmit = async (e) => {
		e.preventDefault()
		let errors = {}
		if (loginData.loginEmail.trim() == '') {
			errors.loginEmail = 'Email is required'
		}
		if (loginData.loginPassword.trim() == '') {
			errors.loginPassword = 'Password is required'
		}
		if (Object.keys(errors).length > 0) {
			setLoginError(errors)
		} else {
			setLoginError(null)
			dispatch(
				LoginUserAction(
					{
						email: loginData.loginEmail,
						password: loginData.loginPassword,
					},
					toast,
					navigate
				)
			)
			setLoginData({
				loginEmail: '',
				loginPassword: '',
			})
		}
	}

	return (
		<>
			<div
				className='modal fade'
				id='exampleModalToggle'
				aria-hidden='true'
				aria-labelledby='exampleModalToggleLabel'
				tabIndex='-1'>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header d-none	'>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								id='closeLoginModalButtonId'
								aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							<form onSubmit={handleLoginUserSubmit}>
								<div className='loginForm'>
									<h3 className='mb-4'>Login</h3>
									<div className='mb-3'>
										<label
											htmlFor='loginEmail'
											className='form-label'>
											Email address
										</label>
										<input
											type='email'
											className='form-control'
											id='loginEmail'
											name='loginEmail'
											value={loginData.loginEmail}
											onChange={setLoginDataFunc}
											placeholder=''
										/>
										{loginError?.loginEmail && (
											<small className='text-danger'>
												{loginError.loginEmail}
											</small>
										)}
									</div>
									<div className='mb-3'>
										<label
											htmlFor='loginPassowrd'
											className='form-label'>
											Password
										</label>
										<input
											type='password'
											className='form-control'
											id='loginPassowrd'
											name='loginPassword'
											value={loginData.loginPassword}
											onChange={setLoginDataFunc}
											placeholder=''
										/>
										{loginError?.loginPassword && (
											<small className='text-danger'>
												{loginError.loginPassword}
											</small>
										)}
									</div>
									<button
										type='submit'
										className='my-2 btn btn-dark w-100'>
										{loading ? <SmallSpinner /> : 'Login'}
									</button>
									<div className=' text-center'>
										<small className=''>
											Don&apos;t have an account?{' '}
											<a
												href='#'
												data-bs-target='#exampleModalToggle2'
												data-bs-toggle='modal'
												data-bs-dismiss='modal'>
												Register Here!
											</a>
										</small>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div
				className='modal fade'
				id='exampleModalToggle2'
				aria-hidden='true'
				aria-labelledby='exampleModalToggleLabel2'
				tabIndex='-1'>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header d-none	'>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								id='closeLoginModalButton1Id'
								aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							<form onSubmit={handleRegisterUserSubmit}>
								<div className='RegisterForm'>
									<h3 className='mb-4'>Register</h3>
									<div className='mb-3'>
										<label
											htmlFor='name'
											className='form-label'>
											Name
										</label>
										<input
											type='text'
											className='form-control'
											id='name'
											name='registerName'
											onChange={setRegisterDataFunc}
											placeholder=''
										/>
										{registerError?.registerName && (
											<small className='text-danger'>
												{registerError.registerName}
											</small>
										)}
									</div>
									<div className='mb-3'>
										<label
											htmlFor='exampleFormControlInput1'
											className='form-label'>
											Email address
										</label>
										<input
											type='email'
											className='form-control'
											name='registerEmail'
											onChange={setRegisterDataFunc}
											id='exampleFormControlInput1'
											placeholder=''
										/>
										{registerError?.registerEmail && (
											<small className='text-danger'>
												{registerError.registerEmail}
											</small>
										)}
									</div>
									<div className='mb-3'>
										<label
											htmlFor='password'
											className='form-label'>
											Password
										</label>
										<input
											type='password'
											className='form-control'
											id='password'
											name='registerPassword'
											onChange={setRegisterDataFunc}
											placeholder=''
										/>
										{registerError?.registerPassword && (
											<small className='text-danger'>
												{registerError.registerPassword}
											</small>
										)}
									</div>
									<button
										type='submit'
										className='my-2 btn btn-dark w-100'>
										{loading ? (
											<SmallSpinner />
										) : (
											'Register'
										)}
									</button>
									<div className=' text-center'>
										<small className=''>
											Already have an account?{' '}
											<a
												href='#'
												data-bs-target='#exampleModalToggle'
												data-bs-toggle='modal'
												data-bs-dismiss='modal'>
												Login Here!
											</a>
										</small>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginModal
