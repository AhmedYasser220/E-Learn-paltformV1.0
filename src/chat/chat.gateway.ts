import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({  cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
constructor(private readonly chatService:ChatService){}
  
  private activeUsers = new Map<string, string>(); // Track connected users and their roles

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.activeUsers.delete(client.id);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@MessageBody() data : any , @ConnectedSocket() client :Socket) {
   console.log('Received data:',data);
   try {
    if(typeof data === 'string'){
      data= JSON.parse(data);
    }

    const room =data?.room;
    const user =data?.user;

    console.log(`Room: ${room}`);
    console.log(`User : ${user}`);

    if(!room || !user){
      console.log('invalid room request:', data);
      return;
    }
    client.join(room);
    const getChatHistory = await this.chatService.getChatHistory(
      data.room
    );
    console.log(`${user} joined room : ${room}`);
    this.server.to(room).emit('userJoined', {user});

   }
   catch(error){
    console.log('Error parsing thr data', error);
    console.log('invalid data recieved', data);
   }
  }

  // @SubscribeMessage('sendMessage')
  // async handleSendMessage(
  //   client: Socket,
  //  @MessageBody() payload: { roomId: string; senderId: string; message: string },
  // ) {
  //   // Persist the message
  //   await this.chatService.saveMessage(payload.roomId, payload.senderId, payload.message);

  //   // Emit the message to other clients in the room
  //   this.server.to(payload.roomId).emit('receiveMessage', payload);
  // }



  @SubscribeMessage('sendMessage') // Listen for 'sendMessage' event
  async handleSendMessage(
    @MessageBody() data: any,
    client: Socket,
  ) {

    try {
      if(typeof data === 'string'){
        data= JSON.parse(data);
      }
  
      const roomId =data?.roomId;
      const senderId =data?.senderId;
      const message =data?.message;
  
      console.log(`RoomId: ${roomId}`);
      console.log(`sendeId : ${senderId}`);
      console.log(`sendeId : ${message}`);
  
    try {
      console.log('Received message:', data); // For debugging
console.log("room", data.roomId);
      // Validate the incoming data (ensure required fields are present)
      if (!data.roomId || !data.senderId || !data.message) {
        throw new Error('Missing required fields: roomId, senderId, or message');
      }

      // Create and save the chat message using the service
      const savedMessage = await this.chatService.saveMessage(
        data.roomId,
        data.senderId,
        data.message,
      );

      // Emit the new message to the room
      this.server.to(data.roomId).emit('newMessage', savedMessage);

      // Optionally, return a response to the client
      return { success: true, message: 'Message sent successfully' };
    } catch (error) {
      console.error('Error handling sendMessage:', error);
      return { success: false, message: error.message };
    }
  }
  catch(error){
    console.log('Error parsing thr data', error);
    console.log('invalid data recieved', data);
   }
  }
  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    try {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      const room = data?.room;
      const user = data?.user;

      console.log(`User ${user} attempting to leave room: ${room}`);

      if (!room || !user) {
        console.log('Invalid leave room request:', data);
        return;
      }

      // Remove user from room
      client.leave(room);
      console.log(`${user} left room: ${room}`);

      // Notify other users in the room
      this.server.to(room).emit('userLeft', { user });

    } catch (error) {
      console.log('Error parsing leave room data:', error);
      console.log('Invalid data received:', data);
    }
  }
}
