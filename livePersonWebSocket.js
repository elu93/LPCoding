// create WebSocket variable by requiring ws package
const WebSocket = require('ws');
// create token variable from JWT response
const token = "eyJraWQiOiIwMDAwMSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzNTgyZjBhZi1iMmEzLTRkM2YtYTEzMC1mM2I0Y2I5MmI2MTAiLCJhdWQiOiJhY2M6NDA5MTIyMjQiLCJpc3MiOiJodHRwczpcL1wvaWRwLmxpdmVwZXJzb24ubmV0IiwiZXhwIjoxOTY2ODEyMjIwLCJpYXQiOjE1NTY1NzIxODAsImp0aSI6IjZkZGJmMjljLThkODgtNGU5Yi05MDg4LWU5ZGYwOGJlNTY4OCJ9.C85qF2i4614ZYXuoVwe404Pz6fhc34ZyVqxlvVyO4kbon2FeYF3_9gb-AdvbHJKZp5aXABQA4a7uewdsUCF5J--PFXzTEhuXDtI1qVBlHsJ52eB0RtdPOTgcY5BYEcSgSvog15wGzDCkQUEcq6ezG5_CKeg6rOlGYNKFh6pbnl3ZqW_Q3n3sRTo_eMvg7YbJZbe92KRXBcIYaD6UGEOX-u5A6OzXwLKKyAol_noMASR7VRlMMXzeJ0dY5f4dcu-UA5dCHZYJeTnVi2o5xoonE-RnJvp3S-RhUA7hfEJ6ocUbFGext_Y6FOOiaqJyDAYGn-aPYeR-oO7pQGGJh7jF0w";
// not mandatory to create this variable. create this variable to pass Authorization header for web socket.
const options = {
    headers: {
        "Authorization" : "JWT " + token
    }
};
// create instance of the websocket
const ws = new WebSocket('wss://va.msg.liveperson.net/ws_api/account/40912224/messaging/consumer?v=3', options);
// data object to pass into websocket to create new conversation.
const data = {
    "kind": "req",
    "id": 1,
    "type": "cm.ConsumerRequestConversation"
}
// message variable to publish a text to the agent.
const message = {
    "kind" : "req",
    "id" : 2, 
    "type" : "ms.PublishEvent",
    "body" : {
        "dialogId" : "7ab33fed-2739-4c3b-8452-616d7b4d4e59" , // add your static conversationId here
        "event" : {
            "type" : "ContentEvent",
            "contentType" : "text/plain",
            "message" : "hi there"
        }
    }
}

// function that opens a new websocket, conversation, and publishes a text message.
async function openLivePerson() {
    await ws.on('open', async function open() {
        console.log('Connection with LiveEngage established');
        console.log(`state: ${ws.readyState}`);
        if (ws.readyState === ws.OPEN) {
            await ws.send(JSON.stringify(data), () => {
                //unable to receive a reponse object from the server to retrieve conversationId
                console.log(ws.send(JSON.stringify(data)));
            });
            await ws.send(JSON.stringify(message));
        }
    });
}

try {
    openLivePerson();
} catch(error) {
    throw(error)
}