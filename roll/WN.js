var rply = {
    default: 'on',
    type: 'text',
    text: ''
};

gameName = function () {
    return '【魔女狩獵之夜】.wn xDn(+-)y'
}

gameType = function () {
    return 'witch-hunting-night:hktrpg'
}
prefixs = function () {
    return [/^.wn$/i, /^\d/i]
}
getHelpMessage = function () {
    return "【魔女狩獵之夜】" + "\
    \n  .wn xD(D)n(+-y)  x骰池 n罪業值 y調整值 \
    \n有第二個D會使用成功數減去失敗數為最後的成功數(可負數)\
\可以沒有D\
    \n.wn x@n(+-)y(D) 魔改版 x骰池 n罪業值 y調整值\
		\n 魔改版 少於等於罪業值為失敗"
}
initialize = function () {
    return rply;
}

rollDiceCommand = async function (inputStr, mainMsg, groupid, userid, userrole, botname, displayname, channelid, displaynameDiscord, membercount) {
    rply.text = '';
    switch (true) {
        case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
            rply.text = this.getHelpMessage();
            return rply;
        case /^\d/i.test(mainMsg[1]):
            rply.text = WN(mainMsg[1])
            return rply;
        default:
            break;
    }
}

async function WN(message) {
    //x@n(+-y)(D)
    //xD(D)n(+-y)

    //5d6
    //5d6d
    //5dd6
    //5dd
    //5d6+5-5

    //5@6
    //5@5d
    //5@5-5
    //5@6-5D

    //[0]5 [1]^@|^D [2]D [3]!+-5 [4]+-5
    let key = [];
    let tempmessage = message;
    let regex = /^(\d+)/ig
    key[0] = tempmessage.match(regex)
    tempmessage = tempmessage.replace(regex, '')
    let regex1 = /^([@]|[d])/ig
    key[1] = tempmessage.match(regex1)
    tempmessage = tempmessage.replace(regex1, '')
    let regex2 = /d/ig
    key[2] = tempmessage.match(regex2)
    tempmessage = tempmessage.replace(regex2, '')
    let regex3 = /^\d+/
    key[3] = tempmessage.match(regex3)
    tempmessage = tempmessage.replace(regex3, '')
    key[4] = tempmessage



    return key
}
async function WN2(key) {
    for (let i = 0; i < key[0]; i++)
        document.write('A')
    return 1
}
WN('5@2D+2').then((result) =>
    WN2(result)
);



module.exports = {
    rollDiceCommand: rollDiceCommand,
    initialize: initialize,
    getHelpMessage: getHelpMessage,
    prefixs: prefixs,
    gameType: gameType,
    gameName: gameName
};