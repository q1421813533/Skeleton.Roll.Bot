exports.z_stop = require('./chaSkill');

const skillNumLimit = 50;

class chaData{
    constructor(chaName,skillArray){
        this.name=chaName;
        this.skill=new chaSkill[skillNumLimit];
        this.skillNum=0;

        let i,j;
        let skillParts;

        for(i=0;((i<skillArray.length)&&(i<skillNumLimit));i++)
        {
            skillParts=skillArray[i].split(",");
            this.skill[i]=new chaSkill(skillParts[0],skillParts[1],skillParts[2],skillParts[3]);
            this.skillNum++;
        }
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

        for(i=0;i<this.skillNum;i++)
        {
            nowType=this.skill[i].type;
            result+=this.skill[i].name+": "+this.skill[i].value;
            if(nowType==formerType)
            {
                result+=",";
            }
            else
            {
                result+="\n";
                formerType=nowType;
            }
        }
        return result;
    }

}

module.exports = chaData;
