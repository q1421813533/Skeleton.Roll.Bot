"use strict";
let rollbase = require('./rollbase.js');
let variables = {};
const mathjs = require('mathjs');

const chaGroup = require('../character/chaGroup');
let characterGroup = new chaGroup();
characterGroup.addCha("塞莲娜","sln",["生命,hp,16,基础","精力,sp,16,基础","魔力,mp,16,基础","命运点,fate,3,基础","洞察,dc,1,世俗","灵敏,lm,2,世俗","潜行,qx,0,世俗","交际,jj,4,世俗","权威,qw,3,世俗","执念,zn,4,世俗","体质,tz,3,世俗","战斗,zd,4,世俗","学识,xs,2,世俗","技艺,jy,1,世俗","时间,sj,0,超凡","命运,my,4,超凡","空间,kj,0,超凡","心灵,xl,2,超凡","物质,wz,0,超凡","死亡,sw,5,超凡","力能,ln,3,超凡","根源,gy,3,超凡","生命,sm,0,超凡","精魂,jh,0,超凡"]);


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
        first: /(^[.]sln)|(^[.]xx$)/ig,
        second: null
    }]
}
const getHelpMessage = async function () {
    return `基于命运规则的私房骰，前缀是角色代码`
}
const initialize = function () {
    return variables;
}

const getNowCha = async function (infoStr) {
    let tempStr=infoStr.split(" ");
    let chaCode="";
    if((tempStr.length>=2)&&(tempStr[0].length>1))
        chaCode=tempStr[0].substring(1,tempStr[0].length);
    let nowCha=characterGroup.findCha(chaCode);
    return nowCha;
}

async function containStatus(nowCha,infoStr){
    let result = false;

    let i;

    for(i=0;i<nowCha.statusNum;i++)
    {
        if(infoStr.indexOf(nowCha.status[i].code)!=-1)
        {
            result=true;
            break;
        }
    }

    return result;
}

async function containSkill(nowCha,infoStr){
    let result = false;

    let i;

    for(i=0;i<nowCha.skillNum;i++)
    {
        if(infoStr.indexOf(nowCha.skill[i].code)!=-1)
        {
            result=true;
            break;
        }
    }

    return result;
}

async function adjustAttrValue(nowCha,infoStr){
    let result = "";

    let tempStr=infoStr.split(" ");

    let nowAttr=null;
    let nowAdjust=null;
    let nowType;

    let i;

    for(i=tempStr.length-1;i>=0;i++)
    {
        if(/^-?\d+$/.test(tempStr[i]))
        {
            nowAdjust=tempStr[i];
        }
        else
        {
            nowAttr=nowCha.findStatus(tempStr[i]);
            if(nowAttr!=null)
                nowType="status";
            else{
                nowAttr=nowCha.findSkill(tempStr[i]);
                if(nowAttr!=null)
                    nowType="skill";
            }
            
            if(nowAttr!=null){
                if(nowAdjust!=null)
                {
                    if(/^[+-]/.test(nowAdjust))
                        nowAttr.value+=parseInt(nowAdjust);
                    else
                        nowAttr.value=parseInt(nowAdjust);
                    nowAdjust=null;
                }
                if(nowType=="status")
                    result+=nowAttr.name+": ",nowAttr.value+"/"+nowAttr.limit+"\n";
                else if(nowType=="skill")
                    result+=nowAttr.name+": ",nowAttr.value+"\n";
            }
        }
    }
    
    if(result=="")
        result="输入错误。"

    return result;
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
    let nowCha = await this.getNowCha(inputStr.toString());
    let hasStatus = await containStatus(nowCha,mainMsg[1]);
    let hasSkill = await containSkill(nowCha,mainMsg[1]);

    switch (true) {
        case /^help$/i.test(mainMsg[1]):
            rply.text = await this.getHelpMessage();
            rply.quotes = true;
            return rply;
        case /^show$/i.test(mainMsg[1]):
            rply.text = "";
            if(nowCha!=null)
                rply.text = nowCha.show();
            else
                rply.text = "角色不存在。"
            return rply;
        case hasStatus==true:
            rply.text = await adjustAttrValue(nowCha,mainMsg[1],"status");
            return rply;
        case hasSkill==true:
            rply.text = await adjustAttrValue(nowCha,mainMsg[1],"skill");
            return rply;    
        default: {
            rply.text = `在劫难逃~`
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
    gameName: gameName,
    getNowCha: getNowCha
};
