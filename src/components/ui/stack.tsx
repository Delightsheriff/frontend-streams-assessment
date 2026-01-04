import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "motion/react";
import { useState, useEffect, useMemo } from "react";

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

  const rotateX = useTransform(y, [-100, 100], [25, -25]);
  const rotateY = useTransform(x, [-100, 100], [-25, 25]);

  function handleDragEnd(_event: any, info: PanInfo) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    }
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
      style={{ x, y, rotateX, rotateY, zIndex: 50 }}
      drag={disableDrag ? false : true}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
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
  cards?: React.ReactNode[];
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

  const [stack, setStack] = useState(() =>
    cards.map((content, index) => ({ id: `card-${index}`, content }))
  );

  // Sync state if cards prop changes
  useEffect(() => {
    setStack(cards.map((content, index) => ({ id: `card-${index}`, content })));
  }, [cards]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  const sendToBack = (id: string) => {
    setStack((prev) => {
      const newStack = [...prev];
      const index = newStack.findIndex((card) => card.id === id);
      const [card] = newStack.splice(index, 1);
      return [card, ...newStack];
    });
  };

  useEffect(() => {
    if (autoplay && !isPaused && stack.length > 0) {
      const interval = setInterval(() => {
        sendToBack(stack[stack.length - 1].id);
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, isPaused, stack, autoplayDelay]);

  const rotations = useMemo(
    () => stack.map(() => (randomRotation ? Math.random() * 10 - 5 : 0)),
    [stack.length, randomRotation]
  );

  return (
    <div
      className="relative w-full h-full"
      style={{ perspective: 1000 }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const isTop = index === stack.length - 1;
        const dragDisabled = (mobileClickOnly && isMobile) || !isTop;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={dragDisabled}
          >
            <motion.div
              className="w-full h-full rounded-2xl "
              onClick={() =>
                (sendToBackOnClick || dragDisabled) &&
                isTop &&
                sendToBack(card.id)
              }
              animate={{
                scale: 1 - (stack.length - 1 - index) * 0.04,
                y: (stack.length - 1 - index) * -8,
                rotateZ: isTop ? 0 : rotations[index],
                zIndex: index,
              }}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              <div className="w-full h-full ">{card.content}</div>
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
