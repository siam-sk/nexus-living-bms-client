import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // Use state to control form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const toastId = toast.loading('Logging in...');

    signIn(email, password)
      .then(() => {
        toast.success('Logged in successfully!', { id: toastId });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message, { id: toastId });
      });
  };

  const handleGoogleSignIn = () => {
    const toastId = toast.loading('Signing in with Google...');
    googleSignIn()
      .then((result) => {
        
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photoURL: result.user?.photoURL,
        };
        fetch('http://localhost:5000/users', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        })
          .then(res => res.json())
          .then(() => {
            toast.success('Logged in successfully!', { id: toastId });
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        toast.error(error.message, { id: toastId });
      });
  };

  // Handler for the demo admin button
  const handleDemoAdminLogin = () => {
    setEmail('jd@nl.com');
    setPassword('Admin123'); 
    toast.success('Admin credentials filled. Click Login.', {
      icon: '👨‍💻',
    });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleLogin} className="card-body">
          <h1 className="text-3xl font-bold text-center">Login now!</h1>
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered w-full"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered w-full"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Buttons in form-control and full width */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">Login</button>
          </div>
          <div className="form-control mt-2">
            <button type="button" onClick={handleDemoAdminLogin} className="btn btn-ghost w-full">
              Demo Admin Login
            </button>
          </div>
          <div className="divider">OR</div>
          <div className="form-control">
            <button type="button" onClick={handleGoogleSignIn} className="btn btn-outline btn-accent w-full">
              Sign in with Google
            </button>
          </div>

          <p className="text-center mt-4">
            New here? <Link to="/register" className="link link-primary">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;