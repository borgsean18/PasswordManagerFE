import { BackButton } from '@/components/buttons';
import LoginForm from './loginform';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <BackButton />
      <div className="bg-zinc-900 p-8 rounded-lg shadow-md w-full max-w-md border-2 border-zinc-600">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Login</h1>
        <LoginForm type="login" />
      </div>
    </div>
  );
}

export default Login;