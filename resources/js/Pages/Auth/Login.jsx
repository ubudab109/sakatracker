import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: '',
		password: '',
		remember: false,
	});

	useEffect(() => {
		return () => {
			reset('password');
		};
	}, []);

	const submit = (e) => {
		e.preventDefault();

		post(route('login'));
	};

	return (
		<div class="auth-page">
			<Head title="Login" />
			<div class="container-fluid p-0">
				<div class="row g-0">
					<div class="col-xxl-3 col-lg-3 col-md-3">
						<div class="auth-bg pt-md-5 p-4 d-flex">
							<div class="bg-overlay bg-primary"></div>
							<ul class="bg-bubbles">
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
							</ul>
						</div>
					</div>


					<div class="col-xxl-6 col-lg-6 col-md-6">
						<ul class="bg-bubbles">
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
						</ul>
						<div class="auth-bg pt-md-5 p-4 d-flex">
							<div class="bg-overlay bg-primary p-4">
								<div className="card" style={{height: '100%'}}>
									<div className="card-body">
										<div class="d-flex flex-column">
											<div class="mb-1 mb-md-1 text-center max-w-screen-lg mx-auto">
												<a href="#" class="d-block auth-logo">
													<img src="/assets/images/logo-chams.png" width={256} />
												</a>
											</div>
											<div class="my-auto">
												<div class="text-center">
													<h5 class="mb-0">Welcome Back !</h5>
													<p class="text-muted mt-2">Sign in to continue to Chams.</p>
												</div>
												<form class="mt-4 pt-2" onSubmit={submit}>
													<div class="mb-3">
														<label class="form-label">Email Address</label>
														<input type="email" name="email" class="form-control" id="email" placeholder="Enter email"
															value={data.email}
															isFocused={true}
															onChange={(e) => setData('email', e.target.value)}
														/>
														<InputError message={errors.email} className="mt-2" />
													</div>
													<div class="mb-3">
														<div class="d-flex align-items-start">
															<div class="flex-grow-1">
																<label class="form-label">Password</label>
															</div>
															<div class="flex-shrink-0">
																<div class="">
																	<a href={route('password.request')} class="text-muted">Forgot password?</a>
																</div>
															</div>
														</div>

														<div class="">
															<input type="password" name="password" class="form-control" placeholder="Enter password" aria-label="Password" aria-describedby="password-addon"
																onChange={(e) => setData('password', e.target.value)}
																value={data.password}
															/>
															<InputError message={errors.password} className="mt-2" />
														</div>
													</div>
													<div class="row mb-4">
														<div class="col">
															<div class="form-check">
																<input class="form-check-input" type="checkbox" id="remember-check" />
																<label class="form-check-label" for="remember-check">
																	Remember me
																</label>
															</div>
														</div>

													</div>
													<div class="mb-3">
														<button class="btn btn-primary w-100 waves-effect waves-light" type="submit" disabled={processing}>Log In</button>
														<div class="mt-5 text-center">
															<p class="text-muted mb-0">Don't have an account ? <a href={route('register')}
																class="text-primary fw-semibold"> Signup now </a> </p>
														</div>
														<div class="text-center">
															<p class="text-muted mb-0"><a href={route('verification-email')} class="text-primary fw-semibold"> Click here </a> To resend otp code </p>
														</div>

													</div>
												</form>

												<div class="mt-4 mt-md-5 text-center">
													{/* <p class="mb-0">© <script>2023</script> Chams   . Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesbrand</p> */}
													<p class="mb-0">© <script>2023</script> Chams</p>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>


						</div>
					</div>



					<div class="col-xxl-3 col-lg-3 col-md-3">
						<div class="auth-bg pt-md-5 p-4 d-flex">
							<div class="bg-overlay bg-primary"></div>
							<ul class="bg-bubbles">
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
