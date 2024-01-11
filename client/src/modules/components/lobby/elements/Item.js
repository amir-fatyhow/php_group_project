export default class Item {
    constructor(image, left = 0, right = 100, bottom = 100, top = 80, score = 1, health = -1) {
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;

        this.image = document.createElement('img');
        this.image.src = image;

        this.isFree = true;

        this.score = score;
        this.health = health;
    }
}