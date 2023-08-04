"use client"

import { usePathname } from "next/navigation"

export default function useThreadId() {
    const list = usePathname().split("/");
    return list[list.length - 1];
}