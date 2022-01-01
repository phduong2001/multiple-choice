import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
import axios from "axios";
import { useState } from "react";

function SignIn() {
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState();

	const onSubmit = (data) => {
		const handleLogin = async () => {
			try {
				//const url = `http://localhost:5000/login`;
				const res = await axios.post("http://localhost:5000/login", data, {
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (res.data.message === "Success") {
					localStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);

					const user = res.data.user;
					const action = login(user);
					dispatch(action);
				} else {
				}
			} catch (error) {
				if (error.toString().includes("401")) setError("Sai mật khẩu");
				else if (error.toString().includes("406"))
					setError("Tài khoản không tồn tại");
				console.log("Failed to login", error);
			}
		};
		handleLogin();

		if (data.email == "sv" && data.password == "sv") {
			const user = {
				id: "sv0",
				name: "Sinh viên",
				avatar: "./img/biology.jpg",
				type: "student",
			};
			const action = login(user);
			dispatch(action);
		}
		if (data.email == "gv" && data.password == "gv") {
			const user = {
				id: "gv0",
				name: "Giáo viên",
				avatar: "./img/math.jpg",
				type: "teacher",
			};
			const action = login(user);
			dispatch(action);
		}
	};

	return (
		<>
			<div class="w-80 max-w-xs absolute top-12 -right-20">
				<form
					onSubmit={handleSubmit(onSubmit)}
					class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				>
					<div class="mb-4">
						<label
							class="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="email"
						>
							Tài khoản
						</label>
						<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							{...register("email", (require = true))}
							type="text"
						/>
					</div>
					<div class="mb-6">
						<label
							class="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Mật khẩu
						</label>
						<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							{...register("password", (require = true))}
							type="password"
						/>
						{error && (
							<span className="text-sm bg-red-200 py-1 px-2 rounded text-red-900 font-semibold">
								{error}
							</span>
						)}
					</div>
					<div class="flex items-center justify-between">
						<button
							class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded focus:outline-none focus:shadow-outline relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border-2 before:border-transparent before:rounded before:tranform hover:before:scale-x-110 hover:before:scale-y-125
                        before:transition before:ease-out hover:before:border-blue-500"
							type="submit"
						>
							Đăng nhập
						</button>
						<a
							class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
							href="#"
						>
							Quên mật khẩu?
						</a>
					</div>
				</form>
			</div>
		</>
	);
}

export default SignIn;
