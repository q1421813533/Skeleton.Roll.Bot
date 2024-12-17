const statusNumLimit = 50;
const skillNumLimit = 50;
const groupSizeLimit = 50;
const statusType = "基础";
const normalSkillType = "世俗";
const magicSkillType = "超凡";

class chaStatus{
    constructor(statusName,statusCode,statusValue){
        this.name=statusName;
        this.code=statusCode;
        this.value=statusValue;
        this.limit=statusValue;
        this.hasCost=false;
        this.hasLimit=true;
        if(statusCode=="fate")
            this.hasLimit=false;
    }
}

class chaSkill{
    constructor(skillName,skillCode,skillValue,skillType){
        this.name=skillName;
        this.code=skillCode;
        this.value=skillValue;
        this.type=skillType;
        this.tempVal=0;
        this.downVal=skillValue;
    }
}

class chaData{
    constructor(chaName,chaCode,chaFaction,chaStage,attrArray){
        this.name=chaName;
        this.code=chaCode;
        this.status=new Array();
        this.statusNum=0;
        this.skill=new Array();
        this.skillNum=0;
        this.faction=chaFaction;
        this.onstage=chaStage;

        let i,j;
        let inputParts;

        for(i=0;((i<attrArray.length));i++)
        {
            inputParts=attrArray[i].split(",");
            if((inputParts[3]==statusType)&&(this.statusNum<statusNumLimit))
            {
                this.status[this.statusNum]=new chaStatus(inputParts[0],inputParts[1],inputParts[2]);
                this.statusNum++;
            }
            if((inputParts[3]!=statusType)&&(this.statusNum<skillNumLimit))
            {
                this.skill[this.skillNum]=new chaSkill(inputParts[0],inputParts[1],inputParts[2],inputParts[3]);
                this.skillNum++;
            }
        }
    }

    findStatus(statusCode){
        let i;

        for(i=0;i<this.statusNum;i++)
            if(this.status[i].code==statusCode)
                return this.status[i];
        return null;
    }

    findSkill(skillCode){
        let i;

        for(i=0;i<this.skillNum;i++)
            if(this.skill[i].code==skillCode)
                return this.skill[i];
        return null;
    }

    changeSkillValue(skillCode,skillValue){
        let i;
        for(i=0;i<this.skillNum;i++)
        {
            if(this.skill[i].code==skillCode)
            {
                this.skill[i].value=skillValue;
                break;
            }
        }
    }

    setName(newName){
        this.name=newName;
        return "修改成功";
    }

    info(){
        let result=this.name+"\n";
        let nextType="";
        let nowType="";
        let i;
        let changeLine=0;

        for(i=0;i<this.statusNum;i++)
        {
            result+=this.status[i].name+": "+this.status[i].value+"/"+this.status[i].limit;
            if(i<this.statusNum-1)
                result+=",";
            else
                result+="\n";
        }

        for(i=0;i<this.skillNum;i++)
        {
            result+=this.skill[i].name+" "+this.skill[i].value;
            nowType=this.skill[i].type;
            if(i<this.skillNum-1)
            {
                nextType=this.skill[i+1].type;
                if(nowType==nextType)
                    result+=",";
                else
                    result+="\n";
            }
            else
                result+="\n";
        }
        return result;
    }

    changeStage(stageStatus){
        this.onstage=stageStatus;

        let result="";
        if(stageStatus==true)
            result=this.name+" 已经出现!";
        else if(this.faction!="pc")
            result=this.name+" 已经消失!"
        else
            result="设置完毕。"

        return result;
    }

    containStatus(infoStr){
        let result = false;
        let i,j;

        if(infoStr.length<2)
            return result;

        for(i=0;i<this.statusNum;i++)
        {
            for(j=1;j<infoStr.length;j++)
                if(infoStr[j]==this.status[i].code)
                {
                    result=true;
                    break;
                }
        }

        return result;
    }

    containSkill(infoStr){
        let result = false;
        let i,j;

        if(infoStr.length<2)
            return result;

        for(i=0;i<this.skillNum;i++)
        {
            for(j=1;j<infoStr.length;j++)
                if(infoStr[j]==this.skill[i].code)
                {
                    result=true;
                    break;
                }
        }

        return result;
    }

    restoreFateStatus(){
        if(this.onstage==false)
            return "角色未在场";

        let fateStatus=this.findStatus("fate");
        if(fateStatus!=null)
        {
            if(parseInt(fateStatus.value)<parseInt(fateStatus.limit))
                fateStatus.value=fateStatus.limit;
        }
        return "重振完成"
    }

    restoreAllStatus(){
        if(this.onstage==false)
            return "角色未在场";

        let hpStatus=this.findStatus("hp"),spStatus=this.findStatus("sp"),mpStatus=this.findStatus("mp");
        if(hpStatus!=null)
        {
            hpStatus.value=hpStatus.limit;
        }
        if(spStatus!=null)
        {
            spStatus.value=spStatus.limit;
        }
        if(mpStatus!=null)
        {
            mpStatus.value=mpStatus.limit;
        }
        return "恢复完成"
    }

    restoreSPandMP(){

        let result="";

        if(this.onstage==false)
            return "";

        let hpStatus=this.findStatus("hp"),spStatus=this.findStatus("sp"),mpStatus=this.findStatus("mp");
        let nowStatus;

        if(hpStatus!=null)
        {
            result+="健康： ";
            result+=hpStatus.value+"/"+hpStatus.limit+"\n";
        }


        if((spStatus!=null)&&(spStatus.hasCost==false)&&(parseInt(spStatus.value)<parseInt(spStatus.limit)))
        {
            nowStatus=parseInt(spStatus.value)+1;
            result+="精力： "+spStatus.value+" → "+nowStatus+"/"+spStatus.limit+"\n";
            spStatus.value=""+nowStatus;
            spStatus.hasCost=false;
        }
        else if(spStatus!=null)
        {
            result+="精力： "+spStatus.value+"/"+spStatus.limit+"\n";
            spStatus.hasCost=false;
        }

        if((mpStatus!=null)&&(mpStatus.hasCost==false)&&(parseInt(mpStatus.value)<parseInt(mpStatus.limit)))
        {
            nowStatus=parseInt(mpStatus.value)+1;
            result+="魔力： "+mpStatus.value+" → "+nowStatus+"/"+mpStatus.limit+"\n";
            mpStatus.value=""+nowStatus;
            mpStatus.hasCost=false;
        }
        else if(mpStatus!=null)
        {
            result+="魔力： "+mpStatus.value+"/"+mpStatus.limit+"\n";
            mpStatus.hasCost=false;
        }

        if(result!="")
            result=this.name+":\n"+result+"\n";

        return result;
    }


    adjustAttrValue(infoStr){
        let result = "";

        let nowAttr=null;
        let nowAdjust=null;
        let nowType;

        let i;

        for(i=infoStr.length-1;i>0;i--)
        {
            if(/^[+-]?\d+$/.test(infoStr[i]))
            {
                nowAdjust=infoStr[i];
            }
            else
            {
                nowAttr=this.findStatus(infoStr[i]);
                if(nowAttr!=null)
                    nowType="status";
                else{
                    nowAttr=this.findSkill(infoStr[i]);
                    if(nowAttr!=null)
                        nowType="skill";
                }

                if(nowAttr!=null){
                    if(nowAdjust!=null)
                    {
                        if(/^[+-]/.test(nowAdjust)){
                            nowAttr.value=parseInt(nowAttr.value)+parseInt(nowAdjust);
                        }
                        else if(nowType=="status")
                            nowAttr.limit=parseInt(nowAdjust);
                        else if(nowType=="skill")
                            nowAttr.value=parseInt(nowAdjust);
                        nowAdjust=null;
                    }
                    if(nowType=="status")
                    {
                        if((nowAttr.hasLimit==true)&&(parseInt(nowAttr.value)>parseInt(nowAttr.limit)))
                            nowAttr.value=""+nowAttr.limit;
                        result+=nowAttr.name+": "+nowAttr.value+"/"+nowAttr.limit+"\n";
                    }
                    else if(nowType=="skill")
                        result+=nowAttr.name+": "+nowAttr.value+"\n";
                }
            }
        }

        if(result=="")
            result="输入有误。"

        return result;
    }

    giveMoveStr(infoStr){

        let i,j;
        let result="";
        let tempStr=infoStr[1].split(/[-+*/]/);
        let skillNameStr="";
        let moveType="";

        for(i=0;i<tempStr.length;i++)
        {
            for(j=0;j<this.skillNum;j++)
                if(tempStr[i]==this.skill[j].code)
                    skillNameStr+=this.skill[j].name+"+";
        }

        if(skillNameStr.length>1)
            skillNameStr=skillNameStr.substring(0,skillNameStr.length-1);
        else
            skillNameStr="无";

        switch (infoStr[2]){
            case "a":
                moveType="攻击";
                break;
            case "b":
                moveType="克服";
                break;
            case "c":
                moveType="创造优势";
                break;
            case "d":
                moveType="防御";
                break;
            case "e":
                moveType="其他";
                break;
            case "r":
                moveType="特殊";
                break;
            default:
                break;
        }

        result+=this.name+"进行 "+skillNameStr+" 技能的 "+moveType +" 掷骰";

        return result;
    }

    giveMoveValue(infoStr){
        let i,j;
        let skillValueStr=infoStr[1];
        let formerSign=".4df+";
        let isFirstSkill=true;
        let halfSkillValue="";
        let tempStr,nowSkill;
        let spStatus=this.findStatus("sp"),mpStatus=this.findStatus("mp");

        for(i=infoStr.length-1;i>2;i--)
        {
            if((infoStr[i]!=null)&&(infoStr[i].indexOf("=")!=-1)) {
                tempStr = infoStr[i].split("=");
                if((tempStr[0]!="sp")&&(tempStr[0]!="mp")) {
                    nowSkill = this.findSkill(tempStr[0]);
                    if ((nowSkill != null) && (/^\d+$/.test(tempStr[1])) && (parseInt(tempStr[1]) < parseInt(nowSkill.value)))
                        nowSkill.downVal = "" + parseInt(tempStr[1]);
                    else if (nowSkill != null)
                        nowSkill.downVal = "-1";
                }
                else {
                    for(j=0;j<this.skillNum;j++){
                        nowSkill=null;
                        if((this.skill[j].type==magicSkillType)&&(tempStr[0]=="mp"))
                            nowSkill=this.skill[j];
                        else if((this.skill[j].type==normalSkillType)&&(tempStr[0]=="sp")&&(this.skill[j].code!="zn")&&(this.skill[j].code!="tz"))
                            nowSkill=this.skill[j];
                        if ((nowSkill != null) && (/^\d+$/.test(tempStr[1])) && (parseInt(tempStr[1]) < parseInt(nowSkill.value)))
                            nowSkill.downVal = "" + parseInt(tempStr[1]);
                        else if (nowSkill != null)
                            nowSkill.downVal = "-1";
                    }
                }
            }
        }

        tempStr=infoStr[1].split(/[\+\-\*\/]/);

        for(i=0;i<tempStr.length;i++)
        {
            for(j=0;j<this.skillNum;j++)
                if(tempStr[i]==this.skill[j].code)
                {
                    this.skill[j].tempVal=this.skill[j].value;

                    if((this.skill[j].type==normalSkillType)&&(spStatus!=null)&&(parseInt(spStatus.value)<parseInt(spStatus.limit))&&(parseInt(this.skill[j].value)>parseInt(spStatus.value)))
                        this.skill[j].tempVal=spStatus.value;
                    if((this.skill[j].type==magicSkillType)&&(mpStatus!=null)&&(parseInt(mpStatus.value)<parseInt(mpStatus.limit))&&(parseInt(this.skill[j].value)>parseInt(mpStatus.value)))
                        this.skill[j].tempVal=mpStatus.value;

                    if(parseInt(this.skill[j].downVal)!=-1)
                        this.skill[j].tempVal=this.skill[j].downVal;

                    if(isFirstSkill==true)
                    {
                        skillValueStr=skillValueStr.replaceAll(this.skill[j].code,this.skill[j].tempVal);
                        isFirstSkill=false;
                    }
                    else
                    {
                        halfSkillValue=""+Math.floor(parseInt(this.skill[j].tempVal)/2);
                        skillValueStr=skillValueStr.replaceAll(this.skill[j].code,halfSkillValue);
                    }

                    this.skill[j].downVal=-1;
                }
        }
        return formerSign+skillValueStr;
    }

    giveMoveCost(midStr){
        let i,j;
        let result="";
        let tempStr=midStr.split(/[-+*/]/);
        let moveSkillLevel;

        let spStatus=this.findStatus("sp");
        let mpStatus=this.findStatus("mp");
        let spSKill=this.findSkill("tz");
        let mpSKill=this.findSkill("zn");
        let costStatus,costStatusNewValue,costSkill;


        let costArray=new Array();

        for(i=0;i<tempStr.length;i++)
        {
            for(j=0;j<this.skillNum;j++)
                if(tempStr[i]==this.skill[j].code)
                {
                    moveSkillLevel=parseInt(this.skill[j].tempVal);
                    if((this.skill[j].type==normalSkillType)&&(spStatus!=null)&&(spSKill!=null))
                    {
                        result+="\n精力消耗";
                        costStatus=spStatus;
                        costSkill=spSKill;
                    }
                    else if((this.skill[j].type==magicSkillType)&&(mpStatus!=null)&&(mpSKill!=null))
                    {
                        result+="\n魔力消耗";
                        costStatus=mpStatus;
                        costSkill=mpSKill;
                    }
                    else
                        continue;

                    /*if((spStatus!=null)&&(parseInt(spStatus.value)<parseInt(spStatus.limit))&&(parseInt(costSkill.value)>parseInt(spStatus.value)))
                        costSkill.tempVal=spStatus.value;
                    elseval
                        costSkill.tempVal=spStatus.value;

                    costArray=simpleFateDice(parseInt(costSkill.tempVal),moveSkillLevel);*/

                    costArray=simpleFateDice(parseInt(costSkill.value),moveSkillLevel);

                    result+="("+this.skill[j].name+"):\n";
                    result+=costArray[1]+"\n";

                    if(costArray[0]==true) {
                        costStatusNewValue=""+(parseInt(costStatus.value)-1)
                        if(costStatus.code=="sp")
                            result += "SP: "+ costStatus.value +" → " +costStatusNewValue+ "\n";
                        else
                            result += "MP: "+ costStatus.value +" → " +costStatusNewValue+ "\n";
                        costStatus.value=costStatusNewValue;
                        costStatus.hasCost=true;
                    }
                }
        }

        /*

        let skillNum;
        let costValue;
        let costMod = "";
        let costSign,costText,costFinal;

        for(i=0;i<tempStr.length;i++)
        {
            if((/^\d+$/.test(tempStr[i]))==false)
                skillNum++;
        }

        if(skillNum>=2)
            costMod = 0-skillNum;

        for(i=0;i<tempStr.length;i++)
        {
            for(j=0;j<this.skillNum;j++)
                if(tempStr[i]==this.skill[j].code)
                {
                    moveSkillLevel=parseInt(this.skill[j].value);
                    if(this.skill[j].type==normalSkillType)
                    {
                        result+="精力耗竭";
                        costStatus=spStatus;
                    }
                    else
                    {
                        result+="魔力耗竭";
                        costStatus=mpStatus;
                    }

                    costValue=Math.floor(Math.random() * Math.floor(parseInt(costStatus.value)))+1;

                    if(costMod!="")
                        costFinal = costValue+costMod;
                    else
                        costFinal = costValue;

                    if(costFinal<=moveSkillLevel)
                    {
                        costSign="≤";
                        costText="True";
                    }
                    else
                    {
                        costSign=">";
                        costText="False";
                    }
                    result+="("+this.skill[j].name+"):\n";
                    result+="1d"+costStatus.value+"["+costValue+"]"+costMod+" = "+costFinal+" "+costSign+" "+moveSkillLevel+"  →  "+costText+"\n";
                    costMod++;
                }
        }*/

        return result;
    }


}

class chaGroup{

    constructor(){
        this.members=new Array();
        this.groupSize=0;
        this.nowRound=0;
    }

    findCha(chaCode){
        let i;
        for(i=0;i<this.groupSize;i++)
        {
            if(this.members[i].code==chaCode)
            {
                return this.members[i];
            }
        }
        return null;
    }

    addCha(chaName,chaCode,chaFaction,chaStage,attrArray){
        if((this.findCha(chaCode)==null)&&(this.groupSize<groupSizeLimit)){
            this.members[this.groupSize]=new chaData(chaName,chaCode,chaFaction,chaStage,attrArray);
            this.groupSize++;
        }
    }

    delCha(chaCode){
        for(let i=0;i<this.groupSize;i++)
            if(this.members[i].code==chaCode)
            {
                this.members.splice(i,1);
                this.groupSize--;
                break;
            }
    }

    getNowCha(infoStr){
        let i;

        let chaCode=infoStr[0].substring(1,infoStr[0].length);
        let nowCha=this.findCha(chaCode);
        return nowCha;
    }

    restoreAllCha(inputRound){
        let i;
        let result=""

        if((inputRound!=null)&&(inputRound=="start"))
            this.nowRound=1;
        else
            this.nowRound++;
        
        result+="第 "+this.nowRound+" 轮"+"\n\n";
        
        for(i=0;i<this.groupSize;i++)
        {
            result+=this.members[i].restoreSPandMP();
        }

        if(result=="")
            result="没有人物会显示精力和魔力。"

        return result;
    }

}

function simpleFateDice(modValue,difValue){

    let resultArray=new Array();
    let resultStr="";
    let resultValue=0;

    let nowDiceValue;

    let diceNum=4;

    let i;

    for(i=0;i<diceNum;i++){
        nowDiceValue=Math.floor(Math.random()*3-1);
        resultValue+=nowDiceValue;
        if(nowDiceValue==-1)
            resultStr+="－";
        else if(nowDiceValue==0)
            resultStr+="▉";
        else if(nowDiceValue==1)
            resultStr+="＋";
    }
    resultStr+=" = "+resultValue;
    resultValue+=modValue;
    if(modValue>0)
        resultStr+=" + "+modValue+" = "+resultValue;
    else if(modValue<0)
        resultStr+=" - "+modValue+" = "+resultValue;

    if(resultValue<parseInt(difValue)) {
        resultArray[0]=true;
        resultStr += " < " + difValue + " → True";
    }
    else {
        resultArray[0]=false;
        resultStr += " ≥ " + difValue + " → False";
    }
    resultArray[1]=resultStr;
    return resultArray;
}

module.exports = chaGroup;
