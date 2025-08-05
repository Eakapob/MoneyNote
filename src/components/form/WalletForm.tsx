'use client';

import { Wallet } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react"

const WalletForm = () => {
    const [namewallet, setNamewallet] = useState('')
    const [totalbalance, setTotalbalance] = useState<number | ''>('')

    const { data: session } = useSession();
    const userid = session?.user?.userid;
    // console.log("userid",userid)
    const [wallets, setWallets] = useState<Wallet[]>([])

    useEffect(() => {
        fetchWalletData();
    }, [])

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userid) {
            alert("คุณต้องเข้าสู่ระบบก่อน");
            return;
        }

        const res = await fetch('/api/wallet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid, namewallet, totalbalance }),
        })

        const data = await res.json()
        if (res.ok) {
            alert(data.message || 'Submit success!');
            setNamewallet('');
            setTotalbalance('');
            fetchWalletData();
        } else {
            alert(data.error || 'Something went wrong!!!')
        }
    }

    const fetchWalletData = async () => {
        const res = await fetch('/api/wallet')
        const data = await res.json()
        setWallets(data)
    }

    return (
        <div>
            <ul className="w-2.5/12 h-2/12 rounded-lg shadow-md">
                {wallets.map((wallet) => (
                    <li key={wallet.walletid}>{wallet.namewallet} - {wallet.totalbalance}</li>
                ))}
            </ul>
            <div className="border-1 border-black shadow-md">
                <form onSubmit={onSubmit}>
                    <label>Name wallet</label><br />
                    <input type="text" value={namewallet} onChange={(e) => setNamewallet(e.target.value)} className="border border-black" /><br />
                    <label>Amount</label><br />
                    <input type="number" value={totalbalance} onChange={(e) => setTotalbalance(Number(e.target.value))} className="border border-black" /><br />
                    <input type="submit" />
                </form>
            </div>
        </div>
    )

}

export default WalletForm;