import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({})

    const validate = () => {
        const newErrors = {};

        if (!username) {
            newErrors.username = "Username is required";
        }

        if (!password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try{
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username, 
                    password
                }),
            });

            if (!response.ok) {
                const { error } = await response.json();

                alert(error || "Login failed");
                return;
            }

            const data = await response.json();

            const token = data.token;

            localStorage.setItem("token", token)

            navigate("/app")
        } catch (err) {
            console.error("Error logging in", err);
            alert("An error occured while logging in.")
        }
    }

    return(
        <div className="flex justify-center h-screen">
            <div className="card w-96 bg-base-200 mt-10 card-xs shadow-sm flex h-80">
                <div className="card-body flex justify-center w-full">
                    <h2 className="card-title text-center w-fit ml-auto mr-auto text-xl mb-5 text-blue-600">Log into your Splitly account</h2>
                    <div className="w-80 ml-auto mr-auto flex-row justify-center">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 w-fit ml-auto mr-auto">
                            Username
                        </label>
                        <input
                        type="text"
                        id="username"
                        value={username}
                        placeholder="user1234"
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-80 px-3 py-2 border border-blue-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-base-100"
                        />
                    </div>

                    <div className="w-80 ml-auto mr-auto flex-row justify-center">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 w-fit ml-auto mr-auto">
                            Password
                        </label>
                        <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="*****"
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-80 px-3 py-2 border border-blue-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-base-100"
                        />
                    </div>
                    <div className="justify-center card-actions flex-row">
                        <button onClick={handleLogin} className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">Login</button>
                        <p>Haven't got an account yet? <Link to='/signup'>Sign up</Link></p>
                    </div>
                </div>
                {/* Display errors as DaisyUI alerts */}
                <div className="w-80 ml-auto mr-auto mt-4">
                    {Object.entries(errors).map(([field, message]) => (
                    <div key={field} className="alert alert-error shadow-lg mb-2">
                        <div>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2v4m0-10h.01"
                                />
                            </svg>
                            <span>{message}</span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}