class chaSkill{
    constructor(skillName,skillValue){
        this.name=skillName;
        this.value=skillValue;
    }
    show() {
        return this.name +":"+ this.value;
    }
}
module.exports = chaSkill;
