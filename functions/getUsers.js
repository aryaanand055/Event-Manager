const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://Arya:Cookies%4012@cluster0.tb4ew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

exports.handler = async (event, context) => {
    try {
        await client.connect();
        const database = client.db("BUILD-a-SITE");
        const events = database.collection("students");
        const result = await events.find({}).toArray();
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    } finally {
        await client.close();
    }
};
