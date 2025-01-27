export default function PromotionalSection() {
    const promos = [
        { title: "Free Shipping", description: "On all orders above $50" },
        {
            title: "Daily Deals",
            description: "Grab exciting discounts every day",
        },
        {
            title: "New Arrivals",
            description: "Explore the latest collections",
        },
    ];

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto max-w-screen-lg px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                {promos.map((promo, index) => (
                    <div
                        key={index}
                        className="p-6 border rounded-lg shadow hover:shadow-md transition"
                    >
                        <h3 className="text-lg font-bold text-gray-800">
                            {promo.title}
                        </h3>
                        <p className="text-gray-600">{promo.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
