import './Login.css';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputAdornment, InputLabel, Input, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import medication from '../../../assets/medicine130x130.png';
import { UserContext } from '../../../contexts/UserContext';
import { jwtDecode } from 'jwt-decode';
import { login } from '../../../api/loginAPI';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
	const identifierRef = useRef(null);
	const passwordRef = useRef(null);
	const navigate = useNavigate();
	const [action, setAction] = useState('Login');
	const { setUserId, fetchUser } = useContext(UserContext);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		let decodedToken;
		let userId;

		try {
			const token = localStorage.getItem('token');
			if (token) {
				decodedToken = jwtDecode(token);
				userId = decodedToken?._id;
			}
		} catch (error) {
			console.error('Failed to decode token:', error);
		}

		if (userId) {
			setUserId(userId);
			try {
				fetchUser(userId);
				navigate('/dashboard');
			} catch (error) {
				console.error(error);
			}
		}
	}, [fetchUser, navigate, setUserId]);

	const handleLogin = async () => {
		try {
			const response = await login({
				identifier: identifierRef.current.value,
				password: passwordRef.current.value,
			});

			const decodedToken = jwtDecode(response.token);
			const userId = decodedToken._id;

			localStorage.setItem('token', response.token);

			setUserId(userId);

			const user = await fetchUser(userId);
			if (user.profiles && user.profiles.length > 0) {
				navigate('/profile-selection');
			} else {
				navigate('/dashboard');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleSignUp = () => {
		navigate('/signup');
	};

	return (
		<>
			<div className="medication">
				<img src={medication} alt="medication" />
			</div>
			<div className="header">
				<h2 className="header-title">DoseMinder</h2>
				<h4 className="header-subtitle">Login</h4>
			</div>
			<Box component="form" onSubmit={handleLogin}>
				<Box className="inputs">
					<Box sx={{ '& > :not(style)': { m: 1 } }}>
						<FormControl variant="standard">
							<InputLabel htmlFor="username" style={{ marginLeft: '40px' }}>
								Username/Email
							</InputLabel>
							<Input
								id="username-with-icon"
								startAdornment={
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								}
								style={{ width: '400px', height: '50px', marginLeft: '40px', background: '#828A8F' }}
								inputRef={identifierRef}
							/>
						</FormControl>
					</Box>

					<Box sx={{ '& > :not(style)': { m: 1 } }}>
						<FormControl variant="standard">
							<InputLabel htmlFor="password" style={{ marginLeft: '40px' }}>
								Password
							</InputLabel>
							<Input
								id="password"
								type={showPassword ? 'text' : 'password'}
								startAdornment={
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								style={{ width: '400px', height: '50px', marginLeft: '40px', background: '#828A8F' }}
								inputRef={passwordRef}
							/>
						</FormControl>
					</Box>
				</Box>
			</Box>

			<div className="forgot-password">
				Forgot your password?<span> Click Here!</span>
			</div>

			<div className="submit-container">
				<div className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={handleLogin}>
					Login
				</div>

				<div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={handleSignUp}>
					Go To Sign Up
				</div>
			</div>
			<div className="copyright">
				<p>© Project Doseminder 2024</p>
			</div>
		</>
	);
}

export default Login;