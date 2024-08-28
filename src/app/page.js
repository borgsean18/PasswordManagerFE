import Header from '../components/Header';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold border border-white rounded-full px-28 py-2">Passwords Plz</h1>
      </main>
    </div>
  );
}
