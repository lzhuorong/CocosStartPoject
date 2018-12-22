// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 
    },

    getPlayerDistance: function () {
        // 获取 player 节点位置
        var playerPos = this.game.player.getPosition();
        // 计算 player 与 star 之间的距离
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked: function () {
        // 星星被收集，得分并调用 Game.js 生成一个新的星星
        this.game.gainScore();
        this.game.spawnNewStar();
        // 销毁当前星星节点
        this.node.destroy();
    },

    start () {

    },

    update (dt) {
        // 主角与星星之间的距离可以收集时，调用收集函数
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
            return;
        }
    },
});
