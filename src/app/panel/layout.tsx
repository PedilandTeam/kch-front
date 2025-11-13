// import { init, retrieveLaunchParams } from "@telegram-apps/sdk";
// import { useEffect, useState } from "react";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [initData, setInitData] = useState<string>("");

  // useEffect(() => {
  //   const tg = (window as any).Telegram?.WebApp;

  //   if (tg) {
  //     const raw = tg.initData || "";
  //     setInitData(raw);
  //     console.log("Raw initData:", raw);
  //   } else {
  //     setInitData("Telegram WebApp not found — open inside Telegram.");
  //   }
  // }, []);

  return (
    <main className="flex min-h-full flex-col p-4">
      {/* <p className="text-xs break-all text-gray-500">
        initDataRaw: {initDataRaw || "(empty)"} <br />
        initData: {JSON.stringify(initData)}
        <br />
        data: {data}
      </p>

      <div style={{ padding: 16 }}>
        <h2>Telegram initData</h2>
        <pre
          style={{
            background: "#f4f4f4",
            padding: 10,
            borderRadius: 6,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {initData}
        </pre>
      </div> */}
      {children}
    </main>
  );
}
