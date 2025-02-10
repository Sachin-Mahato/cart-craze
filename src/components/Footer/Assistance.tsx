import Link from "next/link";

export default function Assistance() {
    const links = [
        { href: "#", text: "Find an order" },
        { href: "#", text: "Terms of delivery" },
        { href: "#", text: "Exchange and return of goods" },
        { href: "#", text: "Guarantee" },
        { href: "#", text: "Frequently asked questions" },
        { href: "#", text: "Terms of use of the site" },
    ];

    return (
        <section>
            <h2 className="text-white font-semibold text-center mt-8 mb-2">
                Assistance to the buyer
            </h2>

            <ul className="flex flex-col justify-center gap-2 items-center">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link href={link.href} className="text-[#CFCFCF]">
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
