"use strict";
let rollbase = require('./rollbase.js');
let variables = {};
const mathjs = require('mathjs');

const chaGroup = require('../character/chaGroup');
let characterGroup = new chaGroup();
characterGroup.addCha("塞莲娜","sln","gm",false,["生命,hp,16,基础","精力,sp,5,基础","魔力,mp,5,基础","命运点,fate,3,基础","洞察,dc,1,世俗","灵敏,lm,2,世俗","潜行,qx,0,世俗","交际,jj,4,世俗","权威,qw,3,世俗","执念,zn,4,世俗","体质,tz,3,世俗","战斗,zd,4,世俗","学识,xs,2,世俗","技艺,jy,1,世俗","时间,sj,0,超凡","命运,my,4,超凡","空间,kj,0,超凡","心灵,xl,2,超凡","物质,wz,0,超凡","死亡,sw,5,超凡","力能,ln,3,超凡","根源,gy,3,超凡","生命,sm,0,超凡","精魂,jh,0,超凡"]);
characterGroup.addCha("晓轩","xx","pc",true,["生命,hp,10,基础","精力,sp,5,基础","魔力,mp,5,基础","命运点,fate,3,基础","洞察,dc,2,世俗","灵敏,lm,0,世俗","潜行,qx,0,世俗","交际,jj,2,世俗","权威,qw,0,世俗","执念,zn,5,世俗","体质,tz,0,世俗","战斗,zd,1,世俗","学识,xs,6,世俗","技艺,jy,2,世俗","时间,sj,4,超凡","命运,my,0,超凡","空间,kj,4,超凡","心灵,xl,0,超凡","物质,wz,1,超凡","死亡,sw,0,超凡","力能,ln,1,超凡","根源,gy,5,超凡","生命,sm,0,超凡","精魂,jh,2,超凡"]);
characterGroup.addCha("暗夜冥","ay","pc",true,["生命,hp,20,基础","精力,sp,5,基础","魔力,mp,5,基础","命运点,fate,3,基础","洞察,dc,4,世俗","灵敏,lm,4,世俗","潜行,qx,1,世俗","交际,jj,0,世俗","权威,qw,1,世俗","执念,zn,2,世俗","体质,tz,5,世俗","战斗,zd,4,世俗","学识,xs,0,世俗","技艺,jy,0,世俗","时间,sj,0,超凡","命运,my,4,超凡","空间,kj,5,超凡","心灵,xl,0,超凡","物质,wz,5,超凡","死亡,sw,0,超凡","力能,ln,0,超凡","根源,gy,0,超凡","生命,sm,0,超凡","精魂,jh,0,超凡"]);

characterGroup.addCha("敌人A","gma","enemy",false,["生命,hp,10,基础","精力,sp,5,基础","魔力,mp,0,基础","命运点,fate,3,基础","洞察,dc,0,世俗","灵敏,lm,0,世俗","潜行,qx,0,世俗","交际,jj,0,世俗","权威,qw,0,世俗","执念,zn,0,世俗","体质,tz,0,世俗","战斗,zd,0,世俗","学识,xs,0,世俗","技艺,jy,0,世俗","时间,sj,0,超凡","命运,my,0,超凡","空间,kj,0,超凡","心灵,xl,0,超凡","物质,wz,0,超凡","死亡,sw,0,超凡","力能,ln,0,超凡","根源,gy,0,超凡","生命,sm,0,超凡","精魂,jh,0,超凡"]);
characterGroup.addCha("敌人B","gmb","enemy",false,["生命,hp,10,基础","精力,sp,5,基础","魔力,mp,0,基础","命运点,fate,3,基础","洞察,dc,0,世俗","灵敏,lm,0,世俗","潜行,qx,0,世俗","交际,jj,0,世俗","权威,qw,0,世俗","执念,zn,0,世俗","体质,tz,0,世俗","战斗,zd,0,世俗","学识,xs,0,世俗","技艺,jy,0,世俗","时间,sj,0,超凡","命运,my,0,超凡","空间,kj,0,超凡","心灵,xl,0,超凡","物质,wz,0,超凡","死亡,sw,0,超凡","力能,ln,0,超凡","根源,gy,0,超凡","生命,sm,0,超凡","精魂,jh,0,超凡"]);
characterGroup.addCha("敌人C","gmc","enemy",false,["生命,hp,10,基础","精力,sp,5,基础","魔力,mp,0,基础","命运点,fate,3,基础","洞察,dc,0,世俗","灵敏,lm,0,世俗","潜行,qx,0,世俗","交际,jj,0,世俗","权威,qw,0,世俗","执念,zn,0,世俗","体质,tz,0,世俗","战斗,zd,0,世俗","学识,xs,0,世俗","技艺,jy,0,世俗","时间,sj,0,超凡","命运,my,0,超凡","空间,kj,0,超凡","心灵,xl,0,超凡","物质,wz,0,超凡","死亡,sw,0,超凡","力能,ln,0,超凡","根源,gy,0,超凡","生命,sm,0,超凡","精魂,jh,0,超凡"]);
characterGroup.addCha("敌人D","gmd","enemy",false,["生命,hp,10,基础","精力,sp,5,基础","魔力,mp,0,基础","命运点,fate,3,基础","洞察,dc,0,世俗","灵敏,lm,0,世俗","潜行,qx,0,世俗","交际,jj,0,世俗","权威,qw,0,世俗","执念,zn,0,世俗","体质,tz,0,世俗","战斗,zd,0,世俗","学识,xs,0,世俗","技艺,jy,0,世俗","时间,sj,0,超凡","命运,my,0,超凡","空间,kj,0,超凡","心灵,xl,0,超凡","物质,wz,0,超凡","死亡,sw,0,超凡","力能,ln,0,超凡","根源,gy,0,超凡","生命,sm,0,超凡","精魂,jh,0,超凡"]);
characterGroup.addCha("敌人E","gme","enemy",false,["生命,hp,10,基础","精力,sp,5,基础","魔力,mp,0,基础","命运点,fate,3,基础","洞察,dc,0,世俗","灵敏,lm,0,世俗","潜行,qx,0,世俗","交际,jj,0,世俗","权威,qw,0,世俗","执念,zn,0,世俗","体质,tz,0,世俗","战斗,zd,0,世俗","学识,xs,0,世俗","技艺,jy,0,世俗","时间,sj,0,超凡","命运,my,0,超凡","空间,kj,0,超凡","心灵,xl,0,超凡","物质,wz,0,超凡","死亡,sw,0,超凡","力能,ln,0,超凡","根源,gy,0,超凡","生命,sm,0,超凡","精魂,jh,0,超凡"]);
characterGroup.addCha("敌人F","gmf","enemy",false,["生命,hp,10,基础","精力,sp,5,基础","魔力,mp,0,基础","命运点,fate,3,基础","洞察,dc,0,世俗","灵敏,lm,0,世俗","潜行,qx,0,世俗","交际,jj,0,世俗","权威,qw,0,世俗","执念,zn,0,世俗","体质,tz,0,世俗","战斗,zd,0,世俗","学识,xs,0,世俗","技艺,jy,0,世俗","时间,sj,0,超凡","命运,my,0,超凡","空间,kj,0,超凡","心灵,xl,0,超凡","物质,wz,0,超凡","死亡,sw,0,超凡","力能,ln,0,超凡","根源,gy,0,超凡","生命,sm,0,超凡","精魂,jh,0,超凡"]);
characterGroup.addCha("敌人G","boss","enemy",false,["生命,hp,10,基础","精力,sp,5,基础","魔力,mp,0,基础","命运点,fate,3,基础","洞察,dc,0,世俗","灵敏,lm,0,世俗","潜行,qx,0,世俗","交际,jj,0,世俗","权威,qw,0,世俗","执念,zn,0,世俗","体质,tz,0,世俗","战斗,zd,0,世俗","学识,xs,0,世俗","技艺,jy,0,世俗","时间,sj,0,超凡","命运,my,0,超凡","空间,kj,0,超凡","心灵,xl,0,超凡","物质,wz,0,超凡","死亡,sw,0,超凡","力能,ln,0,超凡","根源,gy,0,超凡","生命,sm,0,超凡","精魂,jh,0,超凡"]);

const gameName = function () {
    return '塞莲娜的死灵玩具'
}

const gameType = function () {
    return 'Dice:fateMod'
}
const prefixs = function () {
    //[mainMSG[0]的prefixs,mainMSG[1]的prefixs,   <---這裡是一對  
    //mainMSG[0]的prefixs,mainMSG[1]的prefixs  ]  <---這裡是一對
    //如前面是 /^1$/ig, 後面是/^1D100$/ig, 即 prefixs 變成 1 1D100 
    ///^(?=.*he)(?!.*da).*$/ig
    return [{
        first: /(^[.]sln$)|(^[.]xx$)|(^[.]ay$)|(^[.]boss$)|(^[.]round$)|(^[.]gm)/ig,
        second: null
    }]
}
const getHelpMessage = async function () {
    return `基于命运规则的私房骰，前缀是角色代码`
}
const initialize = function () {
    return variables;
}



const rollDiceCommand = async function ({
    inputStr,
    mainMsg
}) {
    let rply = {
        default: 'on',
        type: 'text',
        text: ''
    };
    let nowCha = characterGroup.getNowCha(mainMsg);

    switch (true) {
        case /^help$/i.test(mainMsg[1]):
            rply.text = await this.getHelpMessage();
            rply.quotes = true;
            return rply;
        case /^[abcder]$/i.test(mainMsg[2]):
            let random = '',
                temp = '';
            let ans = 0
            for (let i = 0; i < 4; i++) {
                random = (rollbase.Dice(3) - 2)
                ans += random
                temp += random
                temp = temp.replace('-1', '－').replace('0', '▉').replace('1', '＋')
            }
            try {
                rply.text = "";
                rply.text = nowCha.giveMoveStr(mainMsg)+"\n";
                rply.text += temp + ' = ' + ans;
                let rollStr=nowCha.giveMoveValue(mainMsg);
                let mod = rollStr.replace(/^\.4df/ig, '').replace(/^(\d)/, '+$1').replace(/m/ig, '-').replace(/-/g, ' - ').replace(/\+/g, ' + ');
                if (mod) {
                    rply.text += ` ${mod} = ${mathjs.evaluate(ans + mod)}`.replace(/\*/g, ' * ') + "\n";
                    if(!(/^r$/i.test(mainMsg[2])))
                        rply.text += nowCha.giveMoveCost(mainMsg[1]);
                }
            } catch (error) {
                rply.text = `输入有误。\n${error.message}`
            }
            return rply;
        case /^res$/i.test(mainMsg[1]):
            rply.text = "";
            if(nowCha!=null)
                rply.text = nowCha.restoreAllStatus();
            else
                rply.text = "角色不存在。"
            return rply;
        case /^ref$/i.test(mainMsg[1]):
            rply.text = "";
            if(nowCha!=null)
                rply.text = nowCha.restoreFateStatus();
            else
                rply.text = "角色不存在。"
            return rply;
        case /^info$/i.test(mainMsg[1]):
            rply.text = "";
            if(nowCha!=null)
                rply.text = nowCha.info();
            else
                rply.text = "角色不存在。"
            return rply;
        case /^show$/i.test(mainMsg[1]):
            rply.text = "";
            if(nowCha!=null)
                rply.text = nowCha.changeStage(true);
            else
                rply.text = "角色不存在。"
            return rply;
        case /^exit$/i.test(mainMsg[1]):
            rply.text = "";
            if(nowCha!=null)
                rply.text = nowCha.changeStage(false);
            else
                rply.text = "角色不存在。"
            return rply;
        case /^.round$/i.test(mainMsg[0]):
            rply.text = "";
            rply.text = characterGroup.restoreAllCha(mainMsg[1]);
            return rply;
        case /^name$/i.test(mainMsg[1]):
            if((nowCha!=null)&&(mainMsg[2]!=null))
                rply.text = nowCha.setName(mainMsg[2]);
            else
                rply.text = "角色不存在。";
            return rply;
        default: {
            rply.text = nowCha.adjustAttrValue(mainMsg);
            return rply;
        }
    }
}

module.exports = {
    rollDiceCommand: rollDiceCommand,
    initialize: initialize,
    getHelpMessage: getHelpMessage,
    prefixs: prefixs,
    gameType: gameType,
    gameName: gameName
};
