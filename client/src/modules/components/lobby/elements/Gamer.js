import Point from "../Point";

export default class Gamer {
    constructor(width, height, center, health = 100, points = 0) {
        this.center = center;
        this.health = health;
        this.points = points;
        this.printPoint = new Point(center.x - width / 2, center.y - height);
        this.isStanding = true;
    }

    move(d, num) {
        this.center[d] += num;
        this.printPoint[d] += num;
    }
}