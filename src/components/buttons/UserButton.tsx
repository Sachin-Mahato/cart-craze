"use client";
import Link from "next/link";
import { LogIn, LogOut, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

export default function UserButton() {
    const { data: session } = useSession();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <User className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                    <Button variant={"ghost"}>
                        {session ? (
                            <>
                                <LogOut />
                                <span>Logout</span>
                            </>
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
