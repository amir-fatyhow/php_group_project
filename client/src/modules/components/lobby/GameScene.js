export class GameScene {
    constructor(){
        
    }

    preload () {
        this.load.image('background', '../../../../public/assets/gym.png');
    }

    create () {
        let bg = this.add.sprite(0, 0, 'background');

        // перемещаем начальную точку в верхний левый угол
        bg.setOrigin(0, 0);
    }
}