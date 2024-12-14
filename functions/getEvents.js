const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://arya:Cookies@12@cluster0.tb4ew.mongodb.net/";

const client = new MongoClient(uri);

exports.handler = async (event, context) => {
    try {
        await client.connect();
        const database = client.db("event_manager");
        const events = database.collection("events");
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
