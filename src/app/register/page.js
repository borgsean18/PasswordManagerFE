import { BackButton } from '@/components/buttons';
import RegisterForm from './registerform';
// import ReCAPTCHA from "react-google-recaptcha";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <BackButton />
      <div className="bg-zinc-900 p-8 rounded-lg shadow-md w-full max-w-md border-2 border-zinc-600">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Register</h1>
        <RegisterForm type="register" />
        {/* <div className="mt-4 flex justify-center">
          <ReCAPTCHA
            sitekey="YOUR_RECAPTCHA_SITE_KEY"
            theme="dark"
          />
        </div> */}
      </div>
    </div>
  );
}

export default Register;