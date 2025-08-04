'use client';

import { useSession } from "next-auth/react";
import React, { useState } from "react"

const WalletForm = () => {
    const [namewallet, setNamewallet] = useState('')
    const [totalbalance, setTotalbalance] = useState<number | ''>('')

    const { data: session } = useSession();
    const userid = session?.user?.userid;
    // console.log("userid",userid)

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
            alert(data.message);
            setNamewallet('');
            setTotalbalance('');
        } else {
            alert(data.error || 'Something went wrong!!!')
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <label>Name wallet</label><br />
            <input type="text" value={namewallet} onChange={(e) => setNamewallet(e.target.value)} className="border border-black" /><br />
            <label>Amount</label><br />
            <input type="number" value={totalbalance} onChange={(e) => setTotalbalance(Number(e.target.value))} className="border border-black" /><br />
            <input type="submit" />
        </form>
    )

}

export default WalletForm;