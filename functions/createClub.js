const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://Arya:Cookies%4012@cluster0.tb4ew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

exports.handler = async (event, context) => {
    try {
        // Parse incoming JSON body
        const { name, description, adminIds } = JSON.parse(event.body);  // assuming the body contains the club data

        // Connect to MongoDB
        await client.connect();
        const database = client.db("BUILD-a-SITE");
        const clubsCollection = database.collection("clubs");

        // Create a new club document
        const newClub = {
            name: name,
            description: description,
            admins: adminIds,  // Array of admin IDs
            createdAt: new Date()
        };

        // Insert the new club into the database
        const result = await clubsCollection.insertOne(newClub);

        // Check if the insertion was successful and return the response
        if (result.acknowledged) {
            return {
                statusCode: 201,
                body: JSON.stringify({
                    message: "Club created successfully",
                    club: {
                        _id: result.insertedId,
                        name: newClub.name,
                        description: newClub.description,
                        admins: newClub.admins,
                        createdAt: newClub.createdAt
                    },
                }),
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Failed to create the club." }),
            };
        }
    } catch (err) {
        // Handle errors and return an error response
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    } finally {
        // Ensure the client is closed after the operation
        await client.close();
    }
};
