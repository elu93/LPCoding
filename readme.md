### LivePerson Coding Exercise ###

## Author: Eric Lu ##

**Instructions**

Install the **ws** package from npm. (npm i ws). This package is designed to use WebSockets on the server side since this project does not use a client.
Run the command ```node livePersonWebSocket.js``` in your terminal to execute the script.

**Features**
* This script is able to connect to LivePerson's messaging service, request a new messaging conversation and publish a text message to an agent.

**Gotchas**
* You must run this script twice. The first attempt will establish the WebSocket connection with LivePerson's server. Thereafter, you must accept the conversation on the admin console and then manually click on the Conversation accordion to identify the conversationId. You will need to replace the dialogId value in the message object in the ```livePersonWebSocket.js``` script to correctly publish a message.

**Workaround**
* Using the admin console, I was able to identify the conversationId from the open webSocket connection. I statically typed in the guid associated with the ID into the script. As a result, I was able to publish a message to the agent.

**Limits/Blockers**
* I was unable to retrieve a response from LivePerson's server when I sent this web socket request to the server:

```
    const data = {
    "kind": "req",
    "id": 1,
    "type": "cm.ConsumerRequestConversation"
}

```
**Future Features**
* To improve on this assignment, I would debug why no response is being received to dynamically retrieve the conversationId so this script can send messages when one connects to LivePerson's websocket.