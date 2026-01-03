import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
  AnimatePresence,
} from "motion/react";
import { useState, useEffect } from "react";

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  disableDrag = false,
}: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Adjusted transforms for a smoother 3D feel
  const rotateX = useTransform(y, [-200, 200], [25, -25]);
  const rotateY = useTransform(x, [-200, 200], [-25, 25]);

  function handleDragEnd(_event: any, info: PanInfo) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    }
    // Always reset position if not sent to back
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="absolute inset-0 origin-center"
      style={{
        x,
        y,
        rotateX,
        rotateY,
        zIndex: !disableDrag ? 50 : 0, // Ensure active card is on top
        touchAction: "none", // Critical for mobile drag performance
      }}
      drag={!disableDrag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={!disableDrag ? { cursor: "grabbing" } : {}}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cards: React.ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 150,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = true,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stack, setStack] = useState(cards);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  // Sync state if cards prop changes externally
  useEffect(() => {
    setStack(cards);
  }, [cards]);

  const sendToBack = (index: number) => {
    setStack((prev) => {
      const newStack = [...prev];
      const [card] = newStack.splice(index, 1);
      return [card, ...newStack]; // Move to bottom of array
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        sendToBack(stack.length - 1);
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack.length, isPaused]);

  return (
    <div
      className="relative w-full h-full min-h-72" // Ensure container has height
      style={{ perspective: 1000 }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <AnimatePresence>
        {stack.map((cardContent, index) => {
          const isTopCard = index === stack.length - 1;
          const shouldDisableDrag = (mobileClickOnly && isMobile) || !isTopCard;

          return (
            <CardRotate
              key={(cardContent as any).key || index}
              onSendToBack={() => sendToBack(index)}
              sensitivity={sensitivity}
              disableDrag={shouldDisableDrag}
            >
              <motion.div
                className="w-full h-full shadow-xl"
                onClick={() =>
                  (sendToBackOnClick || shouldDisableDrag) && sendToBack(index)
                }
                animate={{
                  rotateZ: isTopCard
                    ? 0
                    : (stack.length - index - 1) * (randomRotation ? 3 : 2),
                  scale: 1 - (stack.length - index - 1) * 0.05,
                  y: isTopCard ? 0 : (stack.length - index - 1) * -10,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping,
                }}
              >
                {cardContent}
              </motion.div>
            </CardRotate>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
