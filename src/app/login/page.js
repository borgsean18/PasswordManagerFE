import BackButton from '@/components/BackButton';
import AuthForm from '@/components/AuthForm';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <BackButton />
      <div className="bg-zinc-900 p-8 rounded-lg shadow-md w-full max-w-md border-2 border-zinc-600">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Login</h1>
        <AuthForm type="login" />
      </div>
    </div>
  );
}