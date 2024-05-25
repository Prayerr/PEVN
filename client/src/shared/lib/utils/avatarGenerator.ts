import type { shapePainter, backgroundPainter } from '../common/interfaces';

// Генератор случайных цветов по HEX
const generateRandomColor = (): string => {
  const hex = '0123456789ABCDEF';
  const hexPrefix = '#';

  let color = hexPrefix;

  for (let i = 0; i < 6; i += 1) {
    color += hex[Math.floor(Math.random() * 16)];
  }

  return color;
};

const drawBackground = (bp: backgroundPainter) => {
  const backgroundColor = generateRandomColor();

  const { ctx, width, height } = bp;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
};

const drawShape = (sp: shapePainter) => {
  const color = generateRandomColor();

  const shapes = ['square', 'circle', 'triangle'];

  const currentShape = shapes[Math.floor(Math.random() * shapes.length)];
};
