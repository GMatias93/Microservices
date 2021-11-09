import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

export default () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { doRequest, errors } = useRequest({
		url: '/api/users/sign-in',
		method: 'post',
		body: {
			email,
			password,
		},
		onSuccess: () => Router.push('/'),
	});

	const onSubmit = async event => {
		event.preventDefault();
		await doRequest();
	};

	return (
		<form onSubmit={onSubmit}>
			<h1>Sign In</h1>
			<div className='form-group'>
				<label htmlFor='email'>Email address</label>
				<input
					value={email}
					onChange={e => setEmail(e.target.value)}
					type='email'
					className='form-control'
					id='email'
					aria-describedby='emailHelp'
					placeholder='Enter email'
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='password'>Password</label>
				<input
					value={password}
					onChange={e => setPassword(e.target.value)}
					type='password'
					className='form-control'
					id='password'
					placeholder='Password'
				/>
			</div>
			{errors}
			<button className='btn btn-primary'>Sign In</button>
		</form>
	);
};
