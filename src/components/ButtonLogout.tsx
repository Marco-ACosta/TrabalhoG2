"use client";

import { ref, onValue, push } from "firebase/database";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function ButtonLogout() {
    const {userAuth, logout} = useAuthContext();
    return <button onClick = {() => logout()}>Logout</button>;
}