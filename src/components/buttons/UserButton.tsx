"use client";
import Link from "next/link";
import { LogIn, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Logout from "./Logout";
import useSessionHook from "@/hooks/useSessionHook";

export default function UserButton() {
    const { session, status } = useSessionHook();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <User className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                    <Button variant={"ghost"}>
                        {session || status === "authenticated" ? (
                            <Logout />
                        ) : (
                            <Link href={"/sign-in"}>
                                <LogIn />

                                <span>Login</span>
                            </Link>
                        )}
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
