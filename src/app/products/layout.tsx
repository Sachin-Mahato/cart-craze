import Navbar from "@/components/navigation/Navbar";
import { ProductsProvider } from "@/context/ProductsContext";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ProductsProvider>
                <Navbar />
                {children}
            </ProductsProvider>
        </>
    );
}
