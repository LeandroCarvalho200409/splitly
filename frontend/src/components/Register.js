import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwdRepeat, setPwdRepeat] = useState('');

    const [errors, setErrors] = useState({});

    const validateName = () => (!name.trim()) ? "Name is required" : null;

    const validateSurname = () => (!surname.trim()) ? "Surname is required" : null;

    const validateUsername = () => (!username.trim()) ? "Username is required" : null;

    const validateEmail = () => {
        if (!email.trim()) return "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email address";
        else return null;
    }

    const validatePassword = () => {
        if (!password) {
            return "Password is required";
        } else {
            if (password.length < 8) {
                return "Password must be at least 8 characters long";
            } else if (!/[A-Z]/.test(password)) {
                return "Password must contain at least one uppercase letter";
            } else if (!/\d/.test(password)) {
                return "Password must contain at least one number";
            } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                return "Password must contain at least one special character";
            } else {
                return null;
            }
        }
    }

    const validate = () => {
        const newErrors = {};

        (err => err && (newErrors.name = err))(validateName());
        (err => err && (newErrors.surname = err))(validateSurname());
        (err => err && (newErrors.username = err))(validateUsername());
        (err => err && (newErrors.email = err))(validateEmail());
        (err => err && (newErrors.password = err))(validatePassword());

        if (pwdRepeat !== password) {
            newErrors.pwdRepeat = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    name,
                    surname,
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                alert(error || "Registration failed");
                return;
            }

            alert("Registration successful! Please check your email to confirm.");
            navigate("/login")
        } catch (err) {
            console.error("Error registering", err);
            alert("An error occured while registering.");
        }
    }

    return(
        <div className="flex justify-center h-screen">
            <div className="card w-96 bg-base-200 mt-10 card-xs shadow-sm flex h-3/5">
                <div className="card-body flex justify-center w-full">
                    <h2 className="card-title text-center w-fit ml-auto mr-auto text-xl mb-5 text-blue-600">Create your new Splitly-Account</h2>
                    <div className="w-80 ml-auto mr-auto flex-row justify-center">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 w-fit ml-auto mr-auto">
                            Name
                        </label>
                        <input
                        type="text"
                        id="name"
                        value={name}
                        placeholder="John"
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-80 px-3 py-2 border border-blue-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-base-100"
                        />
                    </div>
                    <div className="w-80 ml-auto mr-auto flex-row justify-center">
                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700 w-fit ml-auto mr-auto">
                            Surname
                        </label>
                        <input
                        type="text"
                        id="surname"
                        value={surname}
                        placeholder="Smith"
                        onChange={(e) => setSurname(e.target.value)}
                        className="mt-1 block w-80 px-3 py-2 border border-blue-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-base-100"
                        />
                    </div>
                    <div className="w-80 ml-auto mr-auto flex-row justify-center">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 w-fit ml-auto mr-auto">
                            Email
                        </label>
                        <input
                        type="mail"
                        id="email"
                        value={email}
                        placeholder="john.smith@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-80 px-3 py-2 border border-blue-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-base-100"
                        />
                    </div>
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
                    <div className="w-80 ml-auto mr-auto flex-row justify-center">
                        <label htmlFor="pwdRepeat" className="block text-sm font-medium text-gray-700 w-fit ml-auto mr-auto">
                            Repeat Password
                        </label>
                        <input
                        type="password"
                        id="pwdRepeat"
                        value={pwdRepeat}
                        placeholder="*****"
                        onChange={(e) => setPwdRepeat(e.target.value)}
                        className="mt-1 block w-80 px-3 py-2 border border-blue-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-base-100"
                        />
                    </div>
                    <div className="justify-center card-actions flex-row">
                        <button className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200" onClick={handleRegister}>Register</button>
                        <p>Are you a Splitly-Member already? <Link to='/login'>Login</Link></p>
                    </div>
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
    );
}