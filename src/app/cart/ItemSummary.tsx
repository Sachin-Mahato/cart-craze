import Image from "next/image";
interface ItemSumProps {
    title: string;
    imageUrl: string;
    id: number;
}
export default function ItemSummary({ title, imageUrl, id }: ItemSumProps) {
    return (
        <div className="flex justify-center items-center gap-4">
            <Image
                className="w-16 h-16"
                src={imageUrl}
                alt={title}
                width={300}
                height={300}
            />
            <div>
                <h3 className="font-semibold w-60">{title}</h3>
                <div className="font-normal">#{id}</div>
            </div>
        </div>
    );
}
