import * as SocketIO from 'socket.io';

function sendMessage(socket: SocketIO.Socket, target: string, ack: string, packet: Object | any) : void
{
    sendAPIEvent(socket, target, ack, APIMessageType.message, packet)
}

function sendQuestion(socket: SocketIO.Socket, target: string, ack: string, packet: Object | any) : void
{
    sendAPIEvent(socket, target, ack, APIMessageType.question, packet)
}

/**
 * Send message to the API another microservice
 * @param {SocketIO.Socket} socket
 * @param {string} target
 * @param {string} ack
 * @param {APIMessageType} type
 * @param {Object | any} packet
 */
function sendAPIEvent(socket: SocketIO.Socket, target:string, ack: string, type: APIMessageType, packet: Object | any) : void
{
    if(socket)
        socket.emit('api-message', {
            target: target,
            ack: ack,
            type: type,
            package: packet
        });
}

/**
 * @type {Object} APIMessage
 * @property {string} target - The target of the API message
 * @property {string} ack - The sender of the message, should be the target of a reply of a question
 * @property {string} type - Can be either 'question' or 'message' and it is used to check if a message expects a reply
 * @property {Object} package - Contains relevant data to the request
 * @property {string} package.prompt - The prompt to filter this message, the target uses this to know what how to handle the
 *                           data in the package
 * @property {Object} package.data - Contains the data used to process this request
 * @property {string} package.message - Message for the API logger
 */
class APIMessage {
    target: string;
    ack: string;
    type: APIMessageType;
    package: {
        prompt: string;
        data: Object | any;
        message: string;
    }

    constructor() {
        this.target = '';
        this.ack = '';
        this.type = APIMessageType.message;
        this.package = {
            prompt: '',
            data: '',
            message: ''
        }
    }
}

/**
 * Message types. A question expects a reply, a message is just a message
 */
enum APIMessageType {
    'message',
    'question'
}

export {
    sendMessage,
    sendQuestion,
    APIMessage,
    APIMessageType
}