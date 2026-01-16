"use client"

import Link from "next/link"
import Image from "next/image"
import Card from "./components/card"

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}
    >
      {/* 🌿 BLURRED BACKGROUND ONLY */}
      <div className="home-bg" />

      {/* 🌿 CONTENT */}
      <Card className="polished" style={{ maxWidth: 950, width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            animation: "fadeInUp 0.7s ease-out"
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 36,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* LOGO */}
            <div className="logo-glow" style={{ textAlign: "center" }}>
              <Image
                src="/logo.png"
                alt="CuraHome Logo"
                width={260}
                height={260}
                priority
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            {/* CONTENT */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <h1 style={{ marginBottom: 10 }}>CuraHome</h1>

              <p
                style={{
                  fontSize: 18,
                  color: "var(--color-text-muted)",
                  marginBottom: 10
                }}
              >
                Analyze your symptoms and get safe home-care guidance in minutes.
              </p>

              <p className="text-muted" style={{ fontSize: 14, marginBottom: 26 }}>
                Takes less than 2 minutes
              </p>

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

          {/* DISCLAIMER */}
          <p className="text-muted" style={{ fontSize: 13, textAlign: "center" }}>
            <strong>Medical Disclaimer:</strong> This application provides general
            guidance only and does not replace professional medical advice.
          </p>
        </div>
      </Card>
    </main>
  )
}
