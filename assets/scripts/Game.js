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
        // 主角节点
        player: {
            default: null,
            type: cc.Node
        },

        // 地面节点
        groud: {
            default: null,
            type: cc.Node
        },

        // 星星预置资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失的随机范围
        maxStarDuration: 0,
        minStarDUration: 0,

        // 显示得分
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        /*
        // 开始按钮
        btnPlay: {
            default: null,
            type: cc.Node
        },
        
        // 生命预置资源
        lifePrefab: {
            default: null,
            type: cc.Prefab
        },
        // 每局生命条数
        lifeNumber: 1,
        */
    },

    onLoad () {
        // 获取地面y坐标
        this.groudY = this.groud.y + this.groud.height/2;
        /*
        // 初始化是否启动游戏
        this.enabled = false;
        */
       // 初始化计时器
       this.timer = 0;
       this.starDuration = 0;
       // 生成一个新的星星
       this.spawnNewStar();
       // 初始化得分
       this.score = 0;
    },
    /*
    // 点击游戏界面 play 按钮，开始游戏
    onStartGame: function () {
        // 初始化是否游戏中
        this.enabled = true;
        // 将按钮放在屏幕外看不到的地方
        this.btnPlay.x = 3000;
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        // 生成一个新的星星
        this.spawnNewStar();
        // 初始化得分
        this.score = 0;
    },
    */
    spawnNewStar: function () {
        // 用星星预置资源在场景中生成一个新的节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新节点添加到Canvas节点下
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent('Star').game = this;
        // 星星持续时间取个随机值，重置计时器
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function () {
        var randX = 0;
        // 生成星星随机y坐标，取值范围为地面到主角跳跃高度（为什么加50，因为Star的pickRadius设了60以内都能吃到？）
        var randY = this.groudY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // 生成星星随机x坐标，取值范围为屏幕内
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回星星坐标
        return cc.v2(randX, randY);
    },

    start () {

    },

    update (dt) {
        // 每帧更新计时器，超过星星持续时间还未生成新节点，则游戏失败
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },

    gainScore: function () {
        // 得分加1
        this.score += 1;
        // 更新得分显示
        this.scoreDisplay.string = 'Score: ' + this.score;
    },

    gameOver: function () {
        // 游戏失败，停止节点动作，重新加载场景
        this.player.stopAllActions();
        cc.director.loadScene('game');
    },
   

    gameOver: function () {
        this.gameOverNode.active = true;
        this.player.enabled = false;
        this.player.stopMove();
        this.currentStar.destroy();
        this.btnNode.x = 0;
    }
    
});
