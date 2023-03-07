import facepaint from 'facepaint';

export enum colors {
  hermes = '#F37021',
  lusciousRed = '#E12121',
  radiantRed = '#9D383E',
};

export const mq = facepaint([
  '@media(min-width: 640px)',
  '@media(min-width: 1120px)'
])