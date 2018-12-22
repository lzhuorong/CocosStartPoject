"use strict";
cc._RF.push(module, '8f6b7pNX5JPGaR5MpxrrTwM', 'Game');
// scripts/Game.js

'use strict';

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

        // 生命预置资源
        lifePrefab: {
            default: null,
            type: cc.Prefab
        },
        // 每局生命条数
        lifeNumber: 1
    },

    onLoad: function onLoad() {
        // 获取地面y坐标
        this.groudY = this.groud.y + this.groud.height / 2;
        // 初始化得分
        this.score = 0;
        // 生成一个新的星星
        this.spawnNewStar();
    },

    /*
        // 点击游戏界面 play 按钮，开始游戏
        onStartGame: function () {
            // 初始化是否游戏中
            this.start = true;
            // 将按钮放在屏幕外看不到的地方
            this.button.x = 3000;
            // 初始化得分
            this.score = 0;
            // 生成一个新的星星
            this.spawnNewStar();
        },
    */
    spawnNewStar: function spawnNewStar() {
        // 用星星预置资源在场景中生成一个新的节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新节点添加到Canvas节点下
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent('Star').game = this;
    },

    getNewStarPosition: function getNewStarPosition() {
        var randX = 0;
        // 生成星星随机y坐标，取值范围为地面到主角跳跃高度（为什么加50，因为Star的pickRadius设了60以内都能吃到？）
        var randY = this.groudY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // 生成星星随机x坐标，取值范围为屏幕内
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回星星坐标
        return cc.v2(randX, randY);
    },

    start: function start() {},
    update: function update(dt) {
        // 更新得分
    },


    gainScore: function gainScore() {
        // 得分加1
        this.score += 1;
        // 更新得分显示
        this.scoreDisplay.string = 'Score: ' + this.score;
    }
});

cc._RF.pop();