import express from "express";
import { Collection, MongoClient } from "mongodb";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

console.log(PORT);
const users = [
    {
        "createdAt": "2021-10-01T00:49:47.780Z",
        "name": "Bennie Aufderhar",
        "avatar": "https://cdn.fakercloud.com/avatars/d_kobelyatsky_128.jpg",
        "age": 59,
        "color": "silver",
        "id": "5"
    },
    {
        "createdAt": "2021-09-30T14:22:51.638Z",
        "name": "Lana Witting",
        "avatar": "https://cdn.fakercloud.com/avatars/afusinatto_128.jpg",
        "age": 77,
        "color": "olive",
        "id": "6"
    },
    {
        "createdAt": "2021-09-30T18:01:06.642Z",
        "name": "Vickie Brekke",
        "avatar": "https://cdn.fakercloud.com/avatars/carlyson_128.jpg",
        "age": 80,
        "color": "tan",
        "id": "7"
    },
    {
        "createdAt": "2021-09-30T09:39:22.586Z",
        "name": "Al Runolfsdottir",
        "avatar": "https://cdn.fakercloud.com/avatars/areus_128.jpg",
        "age": 28,
        "color": "orange",
        "id": "8"
    },
    {
        "createdAt": "2021-09-30T18:22:41.955Z",
        "name": "Sam Orn",
        "avatar": "https://cdn.fakercloud.com/avatars/itolmach_128.jpg",
        "age": 49,
        "color": "indigo",
        "id": "9"
    },
    {
        "createdAt": "2021-09-30T18:30:05.224Z",
        "name": "Grace Grimes",
        "avatar": "https://cdn.fakercloud.com/avatars/smalonso_128.jpg",
        "age": 72,
        "color": "yellow",
        "id": "10"
    },
    {
        "createdAt": "2021-09-30T11:26:57.667Z",
        "name": "Cindy Reinger",
        "avatar": "https://cdn.fakercloud.com/avatars/vimarethomas_128.jpg",
        "age": 30,
        "color": "yellow",
        "id": "11"
    },
    {
        "createdAt": "2021-10-01T06:26:55.203Z",
        "name": "Beth Koelpin",
        "avatar": "https://cdn.fakercloud.com/avatars/anatolinicolae_128.jpg",
        "age": 0,
        "color": "purple",
        "id": "12"
    },
    {
        "createdAt": "2021-09-30T12:28:17.426Z",
        "name": "Doug Mayer",
        "avatar": "https://cdn.fakercloud.com/avatars/nerrsoft_128.jpg",
        "age": 25,
        "color": "cyan",
        "id": "13"
    },
    {
        "createdAt": "2021-10-01T01:09:41.654Z",
        "name": "Mrs. Garrett Becker",
        "avatar": "https://cdn.fakercloud.com/avatars/increase_128.jpg",
        "age": 20,
        "color": "yellow",
        "id": "14"
    }
]

async function createconnection() {
    // const MONGO_URL = "mongodb://localhost/users"
    const MONGO_URL = process.env.MONGO_URL;

    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Sucessfully connected")
    // const insertdata = await client.db("users").collection("people").insertMany(users)
    return client

    const user = await client
    //     .db("users").collection("people").findOne({ id: "5" })
    // console.log(user)
}
createconnection()

app.use(express.json())





app.get('/users', async function (req, res) {
    var client = await createconnection();

    var { color, agegt } = req.query;
    if (color && agegt) {
        const user = await client.db("users").collection("people").find({ age: { $gt: parseInt(agegt) } }, { color: color }).toArray()

        res.send(user)
        // res.send(users.filter(data => data.color == (color) && data.age >= (age)))
    }
    else if (color) {
        const user = await client.db("users").collection("people").find({ color: color }).toArray()
        res.send(user)
        // res.send(users.filter(data => data.color === (color)))
    }
    else if (agegt) {
        const user = await client.db("users").collection("people").find({ age: { $gt: parseInt(agegt) } }).toArray()
        res.send(user)
    }
    else {
        const user = await client.db("users").collection("people").find({}).toArray()
        res.send(user)

    }
})


app.patch("/users/:id", async (req, res) => {
    console.log(req.body)
    const { id } = req.params
    const client = await createconnection()
    const newdata = req.body;
    console.log(id, newdata)
    const user = await client.db("users").collection("people").updateOne({ id: id }, { $set: newdata });
    console.log(user)
    res.send(user)
})

app.delete("/users/:id", async (req, res) => {
    console.log(req.params)
    const { id } = req.params;

    var client = await createconnection();
    const user = await client.db("users").collection("people").deleteOne({ id: id })
    console.log(user)

    res.send(user)
})

app.post("/users", async (req, res) => {
    const client = await createconnection();
    console.log(req.body)
    var data = req.body
    const user = await client.db("users").collection("people").insertMany(data);
    res.send(user)

});

app.get("/users/:id", async (req, res) => {
    var { q } = req.query;
    const { id } = req.params;
    var client = await createconnection();
    const user = await client.db("users").collection("people").findOne({ id: id })
    console.log(user)

    res.send(user)
})


app.get('/', function (req, res) {
    res.send("home")
})


app.listen(3000, () => console.log("dtarted server"))


