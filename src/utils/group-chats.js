export default function groupChatsByAuthor(chats) {
    return chats.reduce((chatMap, currentChat) => {
        let author = currentChat.author;
        let authorsChats = chatMap[author] || [];
        authorsChats.push(currentChat.message);
        
        chatMap[author] = authorsChats;

        return chatMap;
    }, {});
}