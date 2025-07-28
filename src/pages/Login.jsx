import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
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
      .then(() => {
        toast.success('Logged in successfully!', { id: toastId });
        navigate(from, { replace: true });
      })
      .catch((error) => toast.error(error.message, { id: toastId }));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleLogin} className="card-body">
          <h1 className="text-3xl font-bold text-center">Login now!</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <div className="divider">OR</div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-accent"
          >
            Sign in with Google
          </button>
          <p className="text-center mt-4">
            New here?{' '}
            <Link to="/register" className="link link-primary">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;