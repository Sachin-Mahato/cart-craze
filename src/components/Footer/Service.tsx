import Link from "next/link";

type ServiceLinkProps = {
    href: string;
    text: string;
};

const ServiceLink = ({ href, text }: ServiceLinkProps) => (
    <li>
        <Link href={href} className="text-[#CFCFCF]">
            {text}
        </Link>
    </li>
);

export default function Services() {
    const serviceLinks = [
        { href: "#", text: "Bonus program" },
        { href: "#", text: "Gift cards" },
        { href: "#", text: "Credit and payment" },
        { href: "#", text: "Service contracts" },
        { href: "#", text: "Non-cash account" },
        { href: "#", text: "Payment" },
    ];

    return (
        <section>
            <h2 className="font-semibold text-white text-center mt-8 mb-2">
                Services
            </h2>
            <ul className="flex flex-col gap-2 justify-center items-center">
                {serviceLinks.map((link, index) => (
                    <ServiceLink key={index} {...link} />
                ))}
            </ul>
        </section>
    );
}
