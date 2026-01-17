"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import "./GridMotion.css"

type GridMotionProps = {
    images: string[]
}

const ROWS = 5
const COLS = 8
const DUPLICATION = 4

export default function GridMotion({ images }: GridMotionProps) {
    const rowsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        rowsRef.current.forEach((row, index) => {
            if (!row) return

            const direction = index % 2 === 0 ? -1 : 1

            gsap.to(row, {
                xPercent: direction * 25,
                duration: 40,
                ease: "linear",
                repeat: -1,
            })
        })
    }, [])

    return (
        <div className="grid-bg">
            <div className="grid-container">
                {Array.from({ length: ROWS }).map((_, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="grid-row"
                        ref={(el) => {
                            if (el) rowsRef.current[rowIndex] = el
                        }}
                    >
                        {Array.from({ length: COLS * DUPLICATION }).map((_, colIndex) => {
                            const imageIndex = colIndex % images.length

                            return (
                                <div className="grid-item" key={colIndex}>
                                    <div
                                        className="grid-item-inner"
                                        style={{
                                            backgroundImage: `url(${images[imageIndex]})`,
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}
