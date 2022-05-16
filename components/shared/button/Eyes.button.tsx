import { useEffect } from 'react';
import { random } from '@utils/random';
import { motion } from 'framer-motion';
import { Box, Button, Flex } from '@chakra-ui/react';

//hooks
import { useRef, useState } from 'react';

//types
import { CSSProperties } from 'react';
import { StaticImageData } from 'next/image';

//img
import bgImg from '@images/animatedButtons/shiftingButton/shifting-button-bg.webp';
import eye1 from '@images/animatedButtons/eyesButton/red-eye-1.webp';
import eye2 from '@images/animatedButtons/eyesButton/red-eye-2.webp';
import eye3 from '@images/animatedButtons/eyesButton/red-eye-3.webp';
import { Span } from '@components/shared';

const BG_HEIGHT_MIN = -25;
const BG_HEIGHT_MAX = 30;
const EYE_WIDTH = 16;
const EYE_HEIGHT = 140;
const EYE_BLINK_RATE_MIN = 4;
const EYE_BLINK_RATE_MAX = 12;
interface ShiftingButtonProps {
  onClick?: (...args: any[]) => void;
  eyes?: number;
  style?: CSSProperties;
  enabled?: boolean;
  animate?: boolean;
  children?: JSX.Element | string;
}

const eyeImg: StaticImageData[] = [eye1, eye2, eye3];
const getRandomEye = (): StaticImageData => eyeImg[Math.floor(Math.random() * eyeImg.length)];
const getDelay = () => random(EYE_BLINK_RATE_MIN / 2, EYE_BLINK_RATE_MAX);

interface EyeData {
  bg: StaticImageData;
  left: number;
  top: number;
  delay: number;
}

export const EyesButton = ({
  onClick,
  eyes: eyeNo = 10,
  enabled = true,
  animate = true,
  style,
  children,
}: ShiftingButtonProps) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const bgPos = useRef<number>(random(BG_HEIGHT_MIN, BG_HEIGHT_MAX));
  const [hover, setHover] = useState<boolean>(false);
  const [eyes, setEyes] = useState<EyeData[]>([]);

  useEffect(() => {
    if (animate && enabled && hover && eyes.length === 0 && containerRef && containerRef.current) {
      const eyeXPosRow1: number[] = selectRandomPos(
        Math.ceil(eyeNo / 2),
        EYE_WIDTH,
        containerRef.current.clientWidth,
        10
      );
      const eyeXPosRow2: number[] = selectRandomPos(
        Math.floor(eyeNo / 2),
        EYE_WIDTH,
        containerRef.current.clientWidth,
        10
      );

      const newEyes: EyeData[] = [];

      for (let left of eyeXPosRow1) {
        newEyes.push({
          bg: getRandomEye(),
          left,
          top: Math.floor(Math.random() * (containerRef.current.clientHeight / 2)) - EYE_HEIGHT / 2,
          delay: getDelay(),
        });
      }
      for (let left of eyeXPosRow2) {
        newEyes.push({
          bg: getRandomEye(),
          left,
          top:
            Math.floor(Math.random() * containerRef.current.clientHeight) -
            EYE_HEIGHT / 2 +
            containerRef.current.clientHeight / 2,
          delay: getDelay(),
        });
      }
      setEyes(newEyes);
    }
  }, [animate, enabled, eyeNo, eyes.length, hover]);

  return (
    <Button
      className={'eyes-button'}
      ref={containerRef}
      w={'full'}
      h={'3rem'}
      overflow={'hidden'}
      cursor={enabled ? 'pointer' : 'default'}
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={style}
      opacity={enabled ? 1 : 0.5}
      variant={'default'}
    >
      <Flex
        className="eyes-bg-text-container"
        pos={'absolute'}
        w={'full'}
        h={'6.25rem'}
        justify={'center'}
        align={'center'}
        color={enabled ? 'white' : 'lightgray'}
        zIndex={1}
        pointerEvents={'none'}
        textAlign={'center'}
        bg={`url("${bgImg.src}")`}
        bgSize={'cover'}
        bgPos={`bottom ${bgPos.current}px center;`}
        opacity={hover && !animate ? 0.9 : 1}
      >
        {eyes.map(({ bg: randomEyeBg, left, top, delay }: EyeData, index) => (
          <motion.div
            key={'eye-animator-' + index}
            className={'eye-animator'}
            animate={
              enabled && animate && hover
                ? {
                    width: [0, EYE_WIDTH, 0],
                    x: [0, EYE_WIDTH / -2, 0],
                  }
                : {
                    width: [0, 0, 0],
                    x: [0, 0, 0],
                  }
            }
            style={{ left, top, position: 'absolute', height: EYE_HEIGHT }}
            transition={{
              default: { delay: delay / 4, duration: 3, repeatDelay: delay, repeat: Infinity },
            }}
          >
            <Box pos={'relative'} w={'full'} h={'full'}>
              <Box
                pos={'absolute'}
                bg={`url("${randomEyeBg.src}")`}
                bgSize={'initial'}
                bgPos={'center'}
                bgRepeat={'no-repeat'}
                w={'full'}
                h={'full'}
                transform={`rotate(45deg)`}
              />
            </Box>
          </motion.div>
        ))}
        <Span zIndex={2}>{children}</Span>
      </Flex>
    </Button>
  );
};

const selectRandomPos = (amount: number, dimension: number, range: number, buffer: number = 0): number[] => {
  const blockMinWidth = dimension + 2 * buffer;
  if (amount === 0 || range === 0 || range <= (amount * 2 + 1) * blockMinWidth) {
    throw new Error('Too many positions of this dimension in size and buffer between them for this range.');
  }

  const spaceNotOccupied = (occupiedStart: number, targetStart: number) => {
    const occupiedEnd = occupiedStart + dimension;
    const targetEnd = targetStart + dimension;
    return occupiedEnd + buffer < targetStart || occupiedStart - buffer > targetEnd;
  };

  const occupied: number[] = [];
  for (let i = 1; i < amount; i++) {
    const offset: number = Math.floor(Math.random() * range);
    if (!occupied.length) {
      occupied.push(offset);
      continue;
    }
    for (let targetIndex = offset; targetIndex < range + offset; targetIndex++) {
      let posFound = false;
      for (let occupiedSpaceIndex = 0; occupiedSpaceIndex < occupied.length; occupiedSpaceIndex++) {
        const occupiedSpace = occupied[occupiedSpaceIndex];
        if (spaceNotOccupied(occupiedSpace, targetIndex)) {
          posFound = true;
          break;
        } else {
          targetIndex = occupiedSpace + dimension + buffer + 1;
        }
      }
      if (posFound) {
        occupied.push(targetIndex);
        break;
      }
    }
  }

  return occupied.map((space: number) => space % range).sort();
};
