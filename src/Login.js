import React, { useState } from "react";
import "./styles.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: isLogin ? "login" : "signup",
                    email,
                    password,
                    role,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
                if (isLogin) {
                    window.location.href = "/dashboard";
                }
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            setMessage("Server error.");
        }
    };

    return (
        <div className="login-container">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>

                <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
                {message && <p>{message}</p>}
            </form>

            <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button onClick={() => setIsLogin(!isLogin)} className="link-button">
                    {isLogin ? "Sign Up" : "Login"}
                </button>
            </p>
        </div>
    );
};

export default Login;
