import Image from "next/image";
interface DetailsProps {
    image: string;
    title: string;
    price: number;
}
export default function WishlistItemDetails({
    image,
    title,
    price,
}: DetailsProps) {
    return (
        <div className="flex justify-between items-center lg:gap-8 lg:my-4">
            <div className="w-full flex flex-col">
                <Image
                    className="w-16 h-16 desktop:w-32 lg:h-32"
                    src={image}
                    alt={title}
                    width={300}
                    height={300}
                    priority
                />
            </div>
            <div className="flex flex-col w-full">
                <p className="w-60">{title}</p>
                <p className="font-semibold text-xl mt-4">{price}</p>
            </div>
        </div>
    );
}
