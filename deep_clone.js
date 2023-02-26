// 深拷贝的主要核心思想就在于对引用的数据类型进行递归浅拷贝，不为引用类型的数据则直接赋值
// 注意循环引用
function deepClone(obj, hash = new WeakMap()) {
    // 日期对象直接返回一个新的日期对象
    if (obj instanceof Date) {
        return new Date(obj);
    }
    //正则对象直接返回一个新的正则对象     
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    //如果循环引用,就用 weakMap 来解决，如果weakMap中有一样的值，那么就返回weakMap中的值
    if (hash.has(obj)) {
        return hash.get(obj);
    }
    // 获取对象所有自身属性的描述
    let allDesc = Object.getOwnPropertyDescriptors(obj);
    // 遍历传入参数所有键的特性，继承原型链
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

    hash.set(obj, cloneObj)

    for (let key of Reflect.ownKeys(obj)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            cloneObj[key] = deepClone(obj[key], hash);
        } else {
            cloneObj[key] = obj[key];
        }
    }
    return cloneObj
}
let arr = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
let newArr = deepClone(arr);
newArr = newArr.slice(0, 1)
console.log(newArr);
console.log(arr);

newArr[0].a = 123;
console.log(arr[0])
