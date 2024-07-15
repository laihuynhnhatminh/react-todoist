import { varSlide } from './slide';

export * from './action';
export * from './container';
export * from './slide';
export * from './transition';

export function getVariant(variant = 'slideInUp') {
  return {
    // Slide
    slideInUp: varSlide().inUp,
    slideInDown: varSlide().inDown,
    slideInLeft: varSlide().inLeft,
    slideInRight: varSlide().inRight,
    slideOutUp: varSlide().outUp,
    slideOutDown: varSlide().outDown,
    slideOutLeft: varSlide().outLeft,
    slideOutRight: varSlide().outRight,
  }[variant];
}
