import { DEFAULT_STAGGER_TIME } from './constant';

interface Props {
  readonly staggerIn?: number;
  readonly delayIn?: number;
  readonly staggerOut?: number;
}

export const varContainer = (props?: Props) => {
  const staggerIn = props?.staggerIn || DEFAULT_STAGGER_TIME;
  const delayIn = props?.staggerIn || DEFAULT_STAGGER_TIME;
  const staggerOut = props?.staggerIn || DEFAULT_STAGGER_TIME;

  return {
    animate: {
      transition: {
        staggerChildren: staggerIn,
        delayChildren: delayIn,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerOut,
        staggerDirection: -1,
      },
    },
  };
};
