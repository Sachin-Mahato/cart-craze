import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="py-16 bg-white text-center">
            <div className="container mx-auto max-w-screen-lg px-4 lg:px-8">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-6">
                    Welcome to <span className="text-blue-500">Cart Craze</span>
                </h1>
                <p className="text-base lg:text-lg text-gray-600 mb-8">
                    Shop smarter, save more, and discover amazing deals on top
                    products.
                </p>
                <Link href="/products">
                    <p className="px-8 py-3 bg-blue-500 text-white text-base lg:text-lg rounded-lg shadow hover:bg-blue-600 transition">
                        Start Shopping
                    </p>
                </Link>
            </div>
        </section>
    );
}
