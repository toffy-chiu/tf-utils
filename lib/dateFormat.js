function fix(t) {
    if (t < 10)
        t = '0' + t;
    return t;
}

function dateFormat(date, pattern){
    var x=date;
    var y = x.getFullYear(),
        M = fix(x.getMonth() + 1),
        d = fix(x.getDate()),
        H = fix(x.getHours()),
        m = fix(x.getMinutes()),
        s = fix(x.getSeconds());
    return pattern.replace('yyyy', y).replace('MM', M).replace('dd', d).replace('HH', H).replace('mm', m).replace('ss', s);
}

module.exports = dateFormat;