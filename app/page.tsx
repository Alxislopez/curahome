"use client"

import Link from "next/link"
import Image from "next/image"
import Card from "./components/card"
import GridMotion from "./components/GridMotion"
import gridImages from "./data/gridImages"

export default function Home() {
  return (
    <>
      {/* BACKGROUND GRID */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0
        }}
      >
        <GridMotion images={gridImages} />
      </div>

      {/* FOREGROUND CONTENT */}
      <main
        className="container"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1
        }}
      >
        <Card
          className="polished"
          style={{
            display: "flex",
            gap: 32,
            padding: "48px 64px",
            background: "rgba(25, 68, 25, 0.95)",
            backdropFilter: "blur(4px)",
            boxShadow: "0 30px 60px rgba(242, 172, 9, 1)",
            borderRadius: 16,
            maxWidth: 900,
            width: "100%",
            zIndex: 10
          }}
        >
          {/* LOGO */}
          <div className="logo-glow">
            <Image
              src="/logo.png"
              alt="CuraHome"
              width={220}
              height={220}
              priority
            />
          </div>

          {/* CONTENT */}
          <div>
            <h1 style={{ color: "white", fontFamily: "monospace", fontSize: 32, fontWeight: 700, marginBottom: 12, }}>CuraHome</h1>
            <h2 style={{ color: "white", fontFamily: "monospace" }}>"Gentle home remedies made simple"</h2>
            <p className="text-muted">
              Analyze your symptoms and get safe home-care guidance in minutes.
            </p>


            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginTop: 16
              }}
            >
              <Link href="/analyzer">
                <button className="button-primary">
                  Start Symptom Analysis
                </button>
              </Link>
              <p className="text-muted"><strong>Takes less than 2 minutes</strong></p>

              <Link href="/recipes">
                <button className="button-secondary">
                  View Food & Recipe Guidance
                </button>
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </>
  )
}
