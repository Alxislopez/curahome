"use client"

import Link from "next/link"
import Image from "next/image"
import Card from "./components/card"

export default function Home() {
  return (
    <main
      className="container"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Card style={{ maxWidth: 900 }}>
  
  {/* MAIN CONTENT ROW */}
  <div
    style={{
      display: "flex",
      gap: 40,
      alignItems: "center",
      marginBottom: 32
    }}
  >
    {/* 🌿 LEFT: BIG LOGO */}
    <div style={{ flexShrink: 0 }}>
      <Image
        src="/logo.png"
        alt="CuraHome Logo"
        width={260}
        height={260}
        priority
      />
    </div>

    {/* 🌿 RIGHT: TEXT + ACTIONS */}
    <div style={{ flex: 1 }}>
      <h1 style={{ marginBottom: 8 }}>CuraHome</h1>

      <p
        style={{
          fontSize: 18,
          color: "var(--color-text-muted)",
          marginBottom: 12
        }}
      >
        Analyze your symptoms and get safe home-care guidance in minutes.
      </p>

      <p
        className="text-muted"
        style={{ fontSize: 14, marginBottom: 24 }}
      >
        Takes less than 2 minutes
      </p>

      {/* 🔘 BUTTONS */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Link href="/analyzer">
          <button className="button-primary" style={{ width: "100%" }}>
            Start Symptom Analysis
          </button>
        </Link>

        <Link href="/recipes">
          <button className="button-secondary" style={{ width: "100%" }}>
            View Food & Recipe Guidance
          </button>
        </Link>
      </div>
    </div>
  </div>

  {/* ⚠ DISCLAIMER (BOTTOM, CENTERED) */}
  <p
    className="text-muted"
    style={{
      fontSize: 13,
      textAlign: "center",
      margin: 0
    }}
  >
    <strong>Medical Disclaimer:</strong> This application provides general
    guidance only and does not replace professional medical advice.
  </p>
</Card>

    </main>
  )
}
