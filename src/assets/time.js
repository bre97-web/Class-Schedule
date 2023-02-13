import moment from 'moment'

/**
 * @returns 返回UNIX时间戳。
 * @see 被方法add调用，作为class.index。
 */
function timeStamp() {
    return moment().format('x')
}
/**
 * @returns 返回一个YYYY-MM-DD格式的日期。
 */
function date() {
    return moment().format('YYYY-MM-DD')
}

/**
 * @returns 返回当前系统时间。
 */
function time() {
    return moment().format('HH-mm-ss')
}

function getHour() {
    return moment().format('HH')
}

function getWeekday() {
    return moment().format('E')
}

function getDay() {
    return moment().format('D')
}

export {
    timeStamp,
    date,
    time,
    getHour,
    getWeekday,
    getDay,
}