import useSessionHook from "@/hooks/useSessionHook";
import { LogOut } from "lucide-react";
export default function Logout() {
    const { signOut } = useSessionHook();
    return (
        <div
            onClick={() =>
                signOut({
                    redirect: true,
                    callbackUrl: "http://localhost:3000",
                })
            }
        >
            <LogOut />
            <span>Logout</span>
        </div>
    );
}
