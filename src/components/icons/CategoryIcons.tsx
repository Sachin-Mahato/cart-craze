import { Mens, Electronics, Necklace, Women } from "./index";


export default function CategoryIcons() {
    const icons = [
        { Icon: Mens },
        { Icon: Women },
        { Icon: Electronics },
        { Icon: Necklace },
    ];
    return (
        <div className="grid grid-cols-2 lg:flex lg:justify-center place-items-center gap-4 mt-12">
            {icons.map(({ Icon }, index) => (
                <div
                    key={index}
                    className="w-[162px] h-32 bg-[#EDEDED] flex justify-center items-center rounded-lg"
                >
                    <Icon />
                </div>
            ))}
        </div>
    );
}
