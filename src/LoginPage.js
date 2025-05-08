// import React, { useState } from 'react';
// import './LoginPage.css';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('student');
//   const [error, setError] = useState('');
//   const [isLogin, setIsLogin] = useState(true);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await fetch('http://localhost:5000/api/auth', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           action: isLogin ? 'login' : 'signup',
//           email,
//           password,
//           role,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert(data.message);
//         // Navigate to the appropriate dashboard based on the role
//         if (isLogin) {
//           if (role === 'teacher') {
//             navigate('/Dashboard_p'); // Teacher's dashboard
//           } else {
//             navigate('/Dashboard_s'); // Student's dashboard
//           }
//         }
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError('Server error. Please try again later.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2>{isLogin ? 'Login to ScoreLens' : 'Sign up for ScoreLens'}</h2>

//         <input
//           type="email"
//           placeholder="Email address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {/* Role selection for signup */}
//         {!isLogin && (
//           <select value={role} onChange={(e) => setRole(e.target.value)} required>
//             <option value="student">Student</option>
//             <option value="teacher">Teacher</option>
//           </select>
//         )}

//         <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
//         {error && <p className="error-message">{error}</p>}

//         <p className="note">
//           {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
//           <button
//             type="button"
//             className="link-button"x
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? 'Sign Up' : 'Log In'}
//           </button>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;













// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LoginPage.css';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('professor'); // Default role
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         if (!email || !password || !role) {
//             setError('Please fill in all fields.');
//             return;
//         }

//         const data = {
//             action: 'login',
//             email,
//             password,
//             role,
//         };

//         try {
//             const response = await fetch('http://localhost:5000/api/auth', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 console.log('Login successful!', result); // Debug: Check the entire result
//                 localStorage.setItem('user_id', result.user_id);
//                 localStorage.setItem('email', result.email);
//                 localStorage.setItem('role', result.role);
//                 //check if the user_id is actually stored
//                 console.log("Stored user_id:", localStorage.getItem('user_id'));
//                 if (role === 'professor') {
//                     navigate('/dashboard_p');
//                 } else {
//                     navigate('/dashboard_s');
//                 }
//             } else {
//                 setError(result.message || 'Login failed');
//             }
//         } catch (err) {
//             setError(`Error: ${err.message}`);
//         }
//     };

//     return (
//         <div className="login-page">
//             <div className="login-form">
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <select value={role} onChange={(e) => setRole(e.target.value)}>
//                         <option value="professor">Professor</option>
//                         <option value="student">Student</option>
//                     </select>
//                     <button type="submit">Log In</button>
//                     {error && <p className="error-message">{error}</p>}
//                 </form>
//             </div>
//         </div>
//     );
// }


import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isLogin ? 'login' : 'signup',
          email,
          password,
          role,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // Store user_id, email, and role in localStorage
        if (isLogin) {
          localStorage.setItem('user_id', data.user_id);  // Store the user_id
          localStorage.setItem('email', data.email);
          localStorage.setItem('role', data.role);
          if (role === 'teacher') {
            navigate('/Dashboard_p');
          } else {
            navigate('/Dashboard_s');
          }
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login to ScoreLens' : 'Sign up for ScoreLens'}</h2>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role selection for signup */}
        {!isLogin && (
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        )}

        <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
        {error && <p className="error-message">{error}</p>}

        <p className="note">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            className="link-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

