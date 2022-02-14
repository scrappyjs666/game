export default class Game {
  constructor({world, view, levels}) {
    this.world = world;
    this.view = view;
    this.levels = levels;

    this.loop = this.lopp .bind(this);
  }
  start() {
    requestAnimationFrame(this.loop)
  }
  loop() {
    //get input
    //update world
    //update view

    requestAnimationFrame(this.loop)
  }
}