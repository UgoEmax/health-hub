import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex flex-col sm:flex-row sm:items-center justify-between bg-green-600 text-white px-6 py-4 gap-5 my-4 rounded-3xl">
            <div>
                <Link href="/" className="font-bold">HealthHub</Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                <Link href="/categories" className="hover:text-blue-100 transition-colors duration-300 ease-in-out">Categories</Link>
                <Link href="/articles" className="hover:text-blue-100 transition-colors duration-300 ease-in-out">Articles</Link>
                <Link href="/about" className="hover:text-blue-100 transition-colors duration-300 ease-in-out">About</Link>
                <Link href="/contact-us" className="hover:text-blue-100 transition-colors duration-300 ease-in-out">Contact Us</Link>
            </div>
        </nav>
    );
};

export default Navbar;