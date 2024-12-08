export class CreateMessageDto {
    readonly forumId: string; // Forum reference
    readonly userId: string; // User reference (sender)
    readonly content: string;
    readonly type: 'question' | 'reply' | 'announcement'; // Message type
  }
  
  // DTO for updating a message (for replies)
  export class UpdateMessageDto {
    readonly content: string;
  }