import { formatPrice } from "@/helpers/utils";

type SummaryRowProps = {
    label: string;
    amount: number;
    isBold?: boolean;
};

export default function SummaryRow({
    label,
    amount,
    isBold = false,
}: SummaryRowProps) {
    return (
        <div
            className={`flex justify-between items-center ${isBold ? "font-semibold" : ""}`}
        >
            <p>{label}</p>
            <p>{formatPrice(amount)}</p>
        </div>
    );
}
