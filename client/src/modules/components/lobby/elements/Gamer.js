import Point from "../Point";

export default class Gamer {
    constructor(width, height, startPoint, health = 100, points = 0) {
        this.left = new Point(startPoint.x, startPoint.y);
        this.right = new Point(startPoint.x + width, startPoint.y);
        this.center = new Point(startPoint.x + width / 2, startPoint.y - height / 2);
        this.health = health;
        this.points = points;
        this.printPoint = new Point(startPoint.x, startPoint.y - height);
    }
}