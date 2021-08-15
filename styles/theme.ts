import facepaint from 'facepaint';

export enum colors {
  hermes = '#F37021',
};

export const mq = facepaint([
  '@media(min-width: 640px)',
  '@media(min-width: 1120px)'
])