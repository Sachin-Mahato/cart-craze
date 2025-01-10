"use client";

import { signOut, useSession } from "next-auth/react";

export default function useSessionHook() {
    const { data: session, status } = useSession();

    return {
        signOut,
        session,
        status,
    };
}
