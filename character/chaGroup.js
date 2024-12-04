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
                this.status[i]=new chaStatus(inputParts[0],inputParts[1],inputParts[2]);
                this.statusNum++;
            }
            if((inputParts[3]!=statusType)&&(this.statusNum<skillNumLimit))
            {
                console.log("新技能："+inputParts[0]+","+inputParts[1]+","+inputParts[2]+","+inputParts[3]);
                this.skill[i]=new chaSkill(inputParts[0],inputParts[1],inputParts[2],inputParts[3]);
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
            console.log("技能："+this.skill[i].name);
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

}

module.exports = chaGroup;
