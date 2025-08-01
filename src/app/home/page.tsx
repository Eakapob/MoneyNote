import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { Link } from "lucide-react";
import { getServerSession } from "next-auth";

export default async function page() {
    const session = await getServerSession(authOptions)

    return (
        <div>
            <h2>Client session</h2>
            <User />
            <h2>Server session</h2>
            {JSON.stringify(session)}
        </div>
    )
    
}