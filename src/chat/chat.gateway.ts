import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { ChatService } from './chat.service';
  import { CreateMessageDto } from './dto/create-message.dto';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // Allow requests from any origin; adjust as per your setup
    },
  })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    constructor(private readonly chatService: ChatService) {}
  
    // Handle a client connection
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
      client.emit('connection', 'Welcome to the chat server!');
    }
  
    // Handle a client disconnection
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    // Handle incoming chat messages
    @SubscribeMessage('sendMessage')
    async handleMessage(client: Socket, payload: CreateMessageDto) {
      try {
        // Save the message to the database using ChatService
        const message = await this.chatService.saveMessage(payload);
  
        // Broadcast the new message to all connected clients
        this.server.emit('newMessage', message);
  
        // Optionally, confirm message delivery to the sender
        client.emit('messageSent', { status: 'success', message });
      } catch (error) {
        console.error('Error saving message:', error);
  
        // Notify the sender about the error
        client.emit('messageError', {
          status: 'error',
          message: 'Failed to save the message.',
          details: error.message,
        });
      }
    }
  }
  