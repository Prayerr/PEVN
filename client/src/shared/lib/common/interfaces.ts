export interface shapePainter {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
}

export interface backgroundPainter {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}
