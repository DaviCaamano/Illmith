import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Button } from '@chakra-ui/react';

//hooks
import { useRef, useState } from 'react';

//img
import defaultBgImg from '@images/animatedButtons/shiftingButton/shifting-button-bg.webp';

//types
import { CSSProperties, MouseEvent, TouchEvent } from 'react';

interface ShiftingButtonProps {
  bgImg?: StaticImageData;
  onClick?: (...args: any[]) => void;
  style?: CSSProperties;
  enabled?: boolean;
  animate?: boolean;
  children?: JSX.Element | string;
}
import { StaticImageData } from 'next/image';
export const ShiftingButton = ({
  onClick,
  bgImg = defaultBgImg,
  enabled = true,
  animate = true,
  style,
  children,
}: ShiftingButtonProps) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | undefined>({ x: 0, y: 0 });
  const [bgSize, setBgSize] = useState<{ width: number; height: number } | undefined>();

  useEffect(() => {
    const isRef = !!containerRef.current?.clientWidth && !!containerRef.current?.clientHeight;
    if (!bgSize && isRef) {
      setBgSize({ width: containerRef.current?.clientWidth * 1.75, height: containerRef.current?.clientHeight * 1.75 });
    }
  }, [bgSize, containerRef, containerRef.current?.clientHeight, containerRef.current?.clientWidth]);
  const handleMove = ({ clientX, clientY, currentTarget }: MouseEvent<HTMLElement>) => {
    if (
      animate &&
      enabled &&
      typeof containerRef.current?.clientWidth !== 'undefined' &&
      typeof containerRef.current?.clientHeight !== 'undefined'
    ) {
      const { left, top } = currentTarget.getBoundingClientRect();
      setPos({
        x: (clientX - left - containerRef.current?.clientWidth / 2) / 2.5,
        y: (clientY - top - containerRef.current?.clientHeight / 2) / 2.5,
      });
    }
  };

  const handleTouchMove = ({ touches, currentTarget }: TouchEvent<HTMLElement>) => {
    if (
      animate &&
      enabled &&
      touches.length &&
      typeof containerRef.current?.clientWidth !== 'undefined' &&
      typeof containerRef.current?.clientHeight !== 'undefined'
    ) {
      const { pageX, pageY } = touches[0];
      const { left, top } = currentTarget.getBoundingClientRect();
      setPos({
        x: (pageX - left - containerRef.current?.clientWidth / 2) / 2.5,
        y: (pageY - top - containerRef.current?.clientHeight / 2) / 2.5,
      });
    }
  };

  return (
    <Button
      className={'shifting-button'}
      w={'full'}
      h={'3rem'}
      ref={containerRef}
      cursor={enabled ? 'pointer' : 'default'}
      overflow={'hidden'}
      onMouseMove={handleMove}
      onTouchMove={handleTouchMove}
      onClick={onClick}
      style={style}
      opacity={enabled ? 1 : 0.5}
      variant={'prompt_dark'}
    >
      {bgSize && typeof pos?.x !== 'undefined' && typeof pos?.y !== 'undefined' && (
        <motion.div animate={{ x: pos.x, y: pos.y }} transition={{ transitionDelay: 0.25 }}>
          <Box
            className={'shifting-button-floating-bg'}
            w={bgSize.width}
            h={bgSize.height}
            bgImage={`url("${bgImg.src}")`}
            bgSize={'cover'}
            bgPos={'center'}
            zIndex={5}
            position={'absolute'}
            left={'50%'}
            top={'50%'}
            transform={'translate(-50%, -50%)'}
            opacity={enabled ? 1 : 0.5}
          />
        </motion.div>
      )}

      <Box
        className="text"
        pos={'absolute'}
        left={'50%'}
        top={'50%'}
        transform={'translate(-50%, -50%)'}
        color={enabled ? 'white' : 'lightgray'}
        zIndex={10}
        pointerEvents={'none'}
        textAlign={'center'}
      >
        {children}
      </Box>
    </Button>
  );
};
