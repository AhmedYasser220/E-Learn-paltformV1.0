import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My App</h1>
        <div className="flex space-x-4">
          <Link href="/home" className="hover:underline">Home</Link>
          <Link href="/profile" className="hover:underline">Profile</Link>
          <Link href="/backup" className="hover:underline">Backup</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
