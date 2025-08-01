import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userid, namewallet, totalbalance } = body

        const newWallet = await db.wallet.create({
            data: {
                userid,
                namewallet,
                totalbalance
            }
        })
        return NextResponse.json(newWallet)
    } catch (error) {
        return NextResponse.json({ error: 'Fail to create wallet!!!' }, { status: 500 })
    }
}