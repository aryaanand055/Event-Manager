const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://Arya:Cookies%4012@cluster0.tb4ew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

exports.handler = async (event, context) => {
    try {
        // Extract clubName from the query string
        const { name: clubName } = event.queryStringParameters;  // 'name' is the query parameter

        // Check if clubName is provided
        if (!clubName) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Club name is required" }),
            };
        }

        // Connect to MongoDB
        await client.connect();
        const database = client.db("BUILD-a-SITE");
        const clubsCollection = database.collection("clubs");
        const usersCollection = database.collection("students");
        const eventsCollection = database.collection("events");

        // Fetch club details
        const club = await clubsCollection.findOne({ name: clubName });
        if (!club) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Club not found" }),
            };
        }

        // Fetch club members
        const members = await usersCollection.find({ clubMemberIn: { $in: [clubName] } }).toArray();


        // Fetch club events
        const events = await eventsCollection.find({ clubName: clubName }).toArray();

        // Return the club details along with members and events
        return {
            statusCode: 200,
            body: JSON.stringify({
                club: {
                    _id: club._id,
                    name: club.name,
                    description: club.description,
                    admins: club.admins,
                    createdAt: club.createdAt,
                },
                members: members.map(member => ({
                    _id: member._id,
                    name: member.name,
                    email: member.email,
                })),
                events: events.map(event => ({
                    _id: event._id,
                    name: event.name,
                    description: event.description,
                    date: event.date,
                })),
            }),
        };
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
