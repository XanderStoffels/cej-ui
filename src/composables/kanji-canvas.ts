export const useKanjiCanvas = () => {
  const makeKanjiCanvas = (
    canvas: HTMLCanvasElement,
    isMobile: boolean
  ): KanjiCanvas => {
    let r = new KanjiCanvas(canvas, isMobile);
    return r;
  };

  return { makeKanjiCanvas };
};

export class KanjiCanvas {
  private context: CanvasRenderingContext2D | null = null;
  private isDrawing = false;
  private lineColor = "#000000";
  private lineWidth = 10;

  constructor(private canvas: HTMLCanvasElement, private isMobile: boolean) {
    this.context = this.canvas.getContext("2d");
    if (!this.context) {
      throw new Error("Failed to get 2d context");
    }
    this.lineWidth = this.isMobile ? 9 : 20;
    this.context.lineCap = "round";
    this.context.lineJoin = "round";

    this.context.fillStyle = "#F9FBFF"; // Paper color
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();

    this.canvas.addEventListener("pointerdown", this.startDrawing.bind(this));
    this.canvas.addEventListener("pointerup", this.stopDrawing.bind(this));
    this.canvas.addEventListener("pointerout", this.stopDrawing.bind(this));
    this.canvas.addEventListener("pointermove", this.draw.bind(this));

    this.canvas.addEventListener(
      "touchstart",
      this.startDrawingTouch.bind(this),
      {
        passive: false,
      }
    );
  }

  public clear() {
    if (!this.context) return;
    this.context.fillStyle = "#F9FBFF";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
  }

  public dispose() {
    this.canvas.removeEventListener(
      "pointerdown",
      this.startDrawing.bind(this)
    );
    this.canvas.removeEventListener("pointerup", this.stopDrawing.bind(this));
    this.canvas.removeEventListener("pointerout", this.stopDrawing.bind(this));
    this.canvas.removeEventListener("pointermove", this.draw.bind(this));
    this.canvas.removeEventListener(
      "touchstart",
      this.startDrawingTouch.bind(this)
    );
  }

  private drawGrid() {
    // Draw a grid to write kanji in.There grid is 2x2 devided by a dotted line.
    if (!this.context) return;
    this.context.strokeStyle = "#000000";
    this.context.lineWidth = 0.3;
    this.context.setLineDash([5, 5]);
    this.context.beginPath();
    this.context.moveTo(0, this.canvas.height / 2);
    this.context.lineTo(this.canvas.width, this.canvas.height / 2);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(this.canvas.width / 2, 0);
    this.context.lineTo(this.canvas.width / 2, this.canvas.height);
    this.context.stroke();
  }

  private startDrawing(event: MouseEvent) {
    this.isDrawing = true;
    this.context?.beginPath();
    this.context?.moveTo(event.offsetX, event.offsetY);
  }

  private startDrawingTouch(event: TouchEvent) {
    if (!this.context || !event.touches.length) return;
    event.preventDefault();
    this.isDrawing = true;
    const touch = event.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    this.context.beginPath();
    this.context.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
  }

  private stopDrawing() {
    this.isDrawing = false;
    this.context?.closePath();
  }

  private draw(event: PointerEvent) {
    if (!this.isDrawing || !this.context) return;
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.lineColor;
    this.context?.lineTo(event.offsetX, event.offsetY);
    this.context?.stroke();
  }
}
