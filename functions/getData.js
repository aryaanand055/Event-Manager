const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://Arya:Cookies%4012@cluster0.tb4ew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

exports.handler = async (event, context) => {
    try {
        // Get the collection name from the query parameters
        const { table } = event.queryStringParameters; // For example, 'clubs' or 'users'

        if (!table) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing 'table' parameter" }),
            };
        }

        // Connect to MongoDB
        await client.connect();
        const database = client.db("BUILD-a-SITE");

        // Dynamically choose the collection based on the 'table' parameter
        const collection = database.collection(table);

        // Fetch all documents from the selected collection
        const result = await collection.find({}).toArray();

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
