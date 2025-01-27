import Link from "next/link";

export default function CallToAction() {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center">
            <div className="container mx-auto max-w-screen-lg px-4 lg:px-8">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Ready to Explore More?
                </h2>
                <p className="text-base lg:text-lg mb-8">
                    Join our newsletter to get exclusive updates and deals!
                </p>
                <Link href="/sign-up">
                    <p className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 shadow">
                        Sign Up Now
                    </p>
                </Link>
            </div>
        </section>
    );
}
