import useSessionHook from "@/hooks/useSessionHook";
import { LogOut } from "lucide-react";
export default function Logout() {
    const { signOut } = useSessionHook();
    return (
        <div onClick={() => signOut()}>
            <LogOut />
            <span>Logout</span>
        </div>
    );
}
