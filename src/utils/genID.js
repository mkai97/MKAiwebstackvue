/**
 * 生成唯一(?)ID
 * @param {string} type 类型 1: 时间戳+随机数 2:UUID(唯一)
 * @returns {string}
 */
export default function genID(type) {

    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15); // 取随机数的一部分
    const randomNum = (Math.random() * 100).toFixed(0);
    console.log(timestamp, randomNum, random, "生成ID");
    return timestamp + "-" + randomNum + "-" + random;

};