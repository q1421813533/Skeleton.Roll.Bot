const statusNumLimit = 50;
const skillNumLimit = 50;
const groupSizeLimit = 50;

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
    constructor(chaName,chaCode,statusArray,skillArray){
        this.name=chaName;
        this.code=chaCode;
        this.status=new Array();
        this.statusNum=0;
        this.skill=new Array();
        this.skillNum=0;

        let i,j;
        let inputParts;

        for(i=0;((i<statusArray.length)&&(i<statusNumLimit));i++)
        {
            inputParts=statusArray[i].split(",");
            this.status[i]=new chaStatus(inputParts[0],inputParts[1],inputParts[2]);
            this.statusNum++;
        }

        for(i=0;((i<skillArray.length)&&(i<skillNumLimit));i++)
        {
            inputParts=skillArray[i].split(",");
            this.skill[i]=new chaSkill(inputParts[0],inputParts[1],inputParts[2],inputParts[3]);
            this.skillNum++;
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
        let formerType="";
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
            nowType=this.skill[i].type;
            if(nowType!=formerType)
            {
                result+="\n";
                changeLine=1;
            }
            result+=this.skill[i].name+": "+this.skill[i].value
            if(changeLine==0)
                result+=",";
            else
                changeLine=1;
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
            if(this.members[i].code==chaCode)
                return this.members[i];
        return null;
    }

    addCha(chaName,chaCode,statusArray,skillArray){
        if((this.findCha(chaCode)==null)&&(this.groupSize<groupSizeLimit)){
            this.members[groupSize]=new chaData(chaName,chaCode,statusArray,skillArray);
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
