const statusNumLimit = 50;
const skillNumLimit = 50;
const groupSizeLimit = 50;
const statusType = "基础";


class chaStatus{
    constructor(statusName,statusCode,statusValue){
        this.name=statusName;
        this.code=statusCode;
        this.value=statusValue;
        this.limit=statusValue;
    }
}

class chaSkill{
    constructor(skillName,skillCode,skillValue,skillType){
        this.name=skillName;
        this.code=skillCode;
        this.value=skillValue;
        this.type=skillType;
    }
}

class chaData{
    constructor(chaName,chaCode,attrArray){
        this.name=chaName;
        this.code=chaCode;
        this.status=new Array();
        this.statusNum=0;
        this.skill=new Array();
        this.skillNum=0;

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

    show(){
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
                        else
                            nowAttr.value=parseInt(nowAdjust);
                        nowAdjust=null;
                    }
                    if(nowType=="status")
                    {
                        if(parseInt(nowAttr.value)>parseInt(nowAttr.limit))
                            nowAttr.value=""+nowAttr.limit;
                        result+=nowAttr.name+": "+nowAttr.value+"/"+nowAttr.limit+"\n";
                    }
                    else if(nowType=="skill")
                        result+=nowAttr.name+": "+nowAttr.value+"\n";
                }
            }
        }
        
        if(result=="")
            result="输入错误。"

        return result;
    }

    giveMoveStr(infoStr){

        let i,j;
        let result="";
        let tempStr=infoStr[2].split(/[+-]/);
        let skillNameStr="";
        let moveType="";
        
        for(i=0;i<tempStr.length;i++)
        {
            for(j=0;j<this.skillNum;j++)
                if(tempStr[i]==this.skill[j].code)
                    skillNameStr+=this.skill[j].name;
        }

        if(skillNameStr=="")
            skillNameStr="无技能"

        if(skillNameStr.length>1)
            skillNameStr=skillNameStr.substring(1,skillNameStr.length-1);

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
            default:
                break;
        }

        result+=this.name+"进行 "+skillNameStr+" 的 "+moveType;
        return result;
    }

    giveMoveValue(midStr){
        let i,j;
        let skillValueStr=midStr;
        let formerSign=".4df+";
        let isFirstSkill=true;
        let halfSkillValue="";
        let tempStr=midStr.split(/[+-]/);

        for(i=0;i<tempStr.length;i++)
        {
            for(j=0;j<this.skillNum;j++)
                if(tempStr[i]==this.skill[j].code)
                {
                    if(isFirstSkill==true)
                    {
                        skillValueStr=skillValueStr.replaceAll(this.skill[j].code,this.skill[j].value);
                        isFirstSkill=false;
                    }
                    else
                    {
                        halfSkillValue=""+Math.floor(parseInt(this.skill[j].value)/2);
                        skillValueStr=skillValueStr.replaceAll(this.skill[j].code,halfSkillValue);
                    }
                }
        }
        return formerSign+skillValueStr;
    }

    giveMoveCost(midStr){
        let i,j;
        let result="";
        let tempStr=midStr.split(/[+-]/);
        let skillNameStr="";
        let moveType="";
        let costValue;
        let moveSkillLevel;

        let spSkill=this.findSkill("sp");
        let mpSkill=this.findSkill("mp");
        let costSkill,costSign,costText;   

        if((spSkill==null)||(mpSkill==null))
            return result;
        
        for(i=0;i<tempStr.length;i++)
        {
            for(j=0;j<this.skillNum;j++)
                if(tempStr[i]==this.skill[j].code)
                {
                    moveSkillLevel=parseInt(this.skill[j].value);
                    if(this.skill[j].type=="世俗")
                    {
                        result+="精力流失";
                        costSkill=spSkill;
                    }
                    else
                    {
                        result+="魔力流失";
                        costSkill=mpSkill;
                    }

                    costValue=Math.floor(Math.random() * Math.floor(parseInt(costSkill.value)))+1;

                    if(costValue<=moveSkillLevel)
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
                    result+="1d"+costSkill.value+" = "+costValue+" "+costSign+" "+moveSkillLevel+"  →  "+costText+"\n";
                }
        }

        return result;
    }
        
    
}

class chaGroup{

    constructor(){
        this.members=new Array();
        this.groupSize=0;
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

    addCha(chaName,chaCode,attrArray){
        if((this.findCha(chaCode)==null)&&(this.groupSize<groupSizeLimit)){
            this.members[this.groupSize]=new chaData(chaName,chaCode,attrArray);
            this.groupSize++;
        }
    }

    delCha(chaCode){
        for(i=0;i<this.groupSize;i++)
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

}

module.exports = chaGroup;
