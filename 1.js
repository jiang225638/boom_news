const formmate2json = (value)=>{
    let obj = {}
    value.split("&").forEach(el => {
         let ele = el.split("=")
         obj[ele[0]] = ele[1]
    });
    return JSON.stringify(obj)
}
let asx = 'uname=zs&age=20&hobby=basketball'
console.log(formmate2json(asx));