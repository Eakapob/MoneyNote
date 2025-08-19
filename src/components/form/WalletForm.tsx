"use client";

import { Wallet } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";

const WalletForm = () => {
  const [namewallet, setNamewallet] = useState("");
  const [totalbalance, setTotalbalance] = useState<number | "">("");

  const { data: session } = useSession();
  const userid = session?.user?.userid;
  // console.log("userid",userid)
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [adding, setAdding] = useState(false);
  const [editid, setEditid] = useState<number | null>(null);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    flushSync(() => {
      setAdding(false);
    });

    if (!userid) {
      alert("คุณต้องเข้าสู่ระบบก่อน");
      return;
    }

    const res = await fetch("/api/wallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid, namewallet, totalbalance }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message || "Submit success!");
      setNamewallet("");
      setTotalbalance("");
      fetchWalletData();
    } else {
      alert(data.error || "Something went wrong!!!");
    }
  };

  //update wallet
  const handleUpdate = async () => {
    const res = await fetch("/api/wallet/[id]", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namewallet,
        totalbalance,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      alert("Update success!");
      fetchWalletData();
    } else {
      const err = await res.json();
      alert("Error: " + err.error);
    }
  };

  const fetchWalletData = async () => {
    const res = await fetch("/api/wallet");
    const data = await res.json();
    setWallets(data);
  };

  return (
    <div>
      <ul className="w-2.5/12 h-2/12 rounded-lg shadow-md">
        {wallets.map((wallet) => (
          <li key={wallet.walletid}>
            {editid === wallet.walletid ? (
              <>
                <form></form>
              </>
            ) : (
              <>
                {wallet.namewallet} - {wallet.totalbalance}
                <button
                  onClick={() => {
                    setEditid(wallet.walletid);
                    setNamewallet(wallet.namewallet);
                    setTotalbalance(wallet.totalbalance);
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="border-1 border-black shadow-md">
        {adding ? (
          <form onSubmit={onSubmit}>
            <label>Name wallet</label>
            <br />
            <input
              type="text"
              value={namewallet}
              onChange={(e) => setNamewallet(e.target.value)}
              className="border border-black"
            />
            <br />
            <label>Amount</label>
            <br />
            <input
              type="number"
              value={totalbalance}
              onChange={(e) => setTotalbalance(Number(e.target.value))}
              className="border border-black"
            />
            <br />
            <input type="submit" />
          </form>
        ) : (
          <button onClick={() => setAdding(true)}>Add</button>
        )}
      </div>
    </div>
  );
};

export default WalletForm;
