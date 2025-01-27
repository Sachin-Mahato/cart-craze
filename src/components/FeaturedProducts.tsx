import Image from "next/image";

export default function FeaturedProducts() {
    const products = [
        {
            src: "https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg",
            title: "Modern Sneakers",
            price: "$79.99",
        },
        {
            src: "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg",
            title: "Wireless Headphones",
            price: "$199.99",
        },
        {
            src: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
            title: "Smart Watch",
            price: "$149.99",
        },
        {
            src: "https://images.pexels.com/photos/298866/pexels-photo-298866.jpeg",
            title: "Leather Backpack",
            price: "$89.99",
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto max-w-screen-lg px-4 lg:px-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-12">
                    Featured Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition"
                        >
                            <Image
                                src={product.src}
                                alt={product.title}
                                width={300}
                                height={200}
                                className="rounded-lg"
                            />
                            <h3 className="text-lg font-semibold mt-4 text-gray-800">
                                {product.title}
                            </h3>
                            <p className="text-blue-500 font-semibold">
                                {product.price}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
