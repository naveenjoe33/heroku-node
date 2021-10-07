const os = require("os")
const fs = require("fs")

console.log("hi");
const marks = [80, 30, 40, 30]
console.log(Math.max(...marks))

function double(num) {
    return (num * 2)
}
const num = process.argv[2]
console.log("the number is ", double(num))

console.log("free momory " + os.freemem())
console.log(os.totalmem())

console.log(os.arch())

fs.readFile("./nice.txt", "utf8", async (err, data) => {
    await console.log(data, "1")
})

const data = fs.readFileSync("./nice.txt", "utf8")
console.log(data)

// fs.appendFile("./nice.txt", "good night", (err) => {
//     if (err) throw err
//     console.log("updated")
// })

// fs.copyFile("./nice.txt", "./good.txt", (err) => {
//     if (err) {
//         console.log("Error Found:", err);
//     }
// });

// fs.renameSync("./good.txt", "./awesome.txt")


// fs.rename("./awesome.txt", "./copied_file.txt", (err) => {
//     if (err) {
//         console.log("Error Found:", err);
//     }
//     else {
//         console.log("done");
//     }
// })

// Task
// Add Good night
// copy this content to another file good.txt
// rename the good.txt - awesome.txt