"use client";

import { useState, useRef, type RefObject, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";

interface ParticleButtonProps extends ButtonProps {
    onSuccess?: () => void;
    successDuration?: number;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void; //Allow for async clicks
    bgColor?: string; // Make bgColor optional as the Button component handles styling
}

function SuccessParticles({
    buttonRef,
    showParticles,
}: {
    buttonRef: React.RefObject<HTMLButtonElement>;
    showParticles: boolean; // Add showParticles prop to conditionally render
}) {
    const rect = buttonRef.current?.getBoundingClientRect();

    // Early return if either rect is null or showParticles is false
    if (!rect || !showParticles) return null;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return (
        <AnimatePresence>
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="fixed w-1 h-1 bg-black dark:bg-white rounded-full pointer-events-none" // Prevent particle clicks
                    style={{ left: centerX, top: centerY }}
                    initial={{
                        scale: 0,
                        x: 0,
                        y: 0,
                        opacity: 1, // Set initial opacity to 1
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        x: [0, (i % 2 ? 1 : -1) * (Math.random() * 50 + 20)],
                        y: [0, -Math.random() * 50 - 20],
                        opacity: [1, 1, 0], // Fade out the particles
                    }}
                    exit={{ opacity: 0, scale: 0 }} // Ensure particles exit cleanly
                    transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: "easeOut",
                    }}
                />
            ))}
        </AnimatePresence>
    );
}

export default function ParticleButton({
    children,
    onClick,
    onSuccess,
    successDuration = 1000,
    className,
    disabled,
    bgColor, // Get the bgColor prop
    ...props
}: ParticleButtonProps) {
    const [showParticles, setShowParticles] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isAnimating, setIsAnimating] = useState(false); // Prevent double clicks

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || isAnimating) {
            return; // Prevent clicks while disabled or animating
        }
        setIsAnimating(true);
        setShowParticles(true);
        try {
            if (onClick) {
                await onClick(e); // Await the passed onClick if its async
            }
            if (onSuccess) {
                onSuccess(); // Call the passed onSuccess
            }

        } catch (error) {
            console.error("Error during button click:", error);
            // Handle error (e.g., show an error message)
        } finally {
            setTimeout(() => {
                setShowParticles(false);
                setIsAnimating(false);
            }, successDuration);
        }
    };

    // Ensure particles are hidden if component unmounts or disabled
    useEffect(() => {
        return () => {
            setShowParticles(false);
        };
    }, []);

    return (
        <>
            <SuccessParticles buttonRef={buttonRef} showParticles={showParticles} />
            <Button
                ref={buttonRef}
                onClick={handleClick}
                className={cn(
                    "relative overflow-hidden", // Prevent particles from overflowing
                    showParticles && "scale-95",
                    "transition-transform duration-100",
                    className
                )}
                disabled={disabled || isAnimating}
                style={{ backgroundColor: bgColor }} // Apply bgColor as inline style
                {...props}
            >
                {children}
                <MousePointerClick className="h-4 w-4" />
            </Button>
        </>
    );
}