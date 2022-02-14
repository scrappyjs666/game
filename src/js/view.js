export default class view {
  constructor(gameCanvas) {
    this.gameCanvas = gameCanvas;
    this.context = gameCanvas.getContext("2d");
  }
}