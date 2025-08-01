'use client';

import React, { useState } from "react"

const WalletForm = () => {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState<number | ''>('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/wallet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, amount }),
        })

        const data = await res.json()
        if (res.ok) {
            alert(data.message);
            setName('');
            setAmount('');
        } else {
            alert(data.error || 'Something went wrong!!!')
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <label>Name wallet</label><br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
            <label>Amount</label><br />
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /><br />
            <input type="submit" />
        </form>
    )

}

export default WalletForm;