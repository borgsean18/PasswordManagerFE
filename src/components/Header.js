import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-4 flex flex-col sm:flex-row sm:justify-end">
      <Link href="/login" className="w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2">
        <button className="w-full px-4 py-2 bg-black-500 border-2 border-white text-white rounded">Login</button>
      </Link>
      <Link href="/register" className="w-full sm:w-auto">
        <button className="w-full px-4 py-2 bg-white text-black border-2 rounded">Register</button>
      </Link>
    </header>
  );
}