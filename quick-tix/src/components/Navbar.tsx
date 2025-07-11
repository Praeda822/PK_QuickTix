import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div>
        <Link href="/" className="text-xl font-bold text-blue-600">
          Quick Tix
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/tickets/new" className="text-gray-700 hover:underline transition">
          New Ticket
        </Link>
        <Link href="/tickets" className="text-gray-700 hover:underline transition">
          My Tickets
        </Link>
        <Link href="/login" className="text-blue-600 hover:underline transition">
          Login
        </Link>
        <Link
          href="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </Link>
        <form>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
