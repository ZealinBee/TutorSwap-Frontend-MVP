import Message from "@/types/Message";

export default function shouldDateAppear(currentIndex: number, messages: Message[]): boolean {
    console.log("currentIndex", currentIndex);
    if(currentIndex === 0) {
        return true;
    }

    const currentMessageDate = new Date(messages[currentIndex].timestamp);
    console.log("currentMessageDate", currentMessageDate);
    const previousMessageDate = new Date(messages[currentIndex - 1].timestamp);
    console.log("previousMessageDate", previousMessageDate);

    return currentMessageDate.getFullYear() !== previousMessageDate.getFullYear() ||
    currentMessageDate.getMonth() !== previousMessageDate.getMonth() ||
    currentMessageDate.getDate() !== previousMessageDate.getDate();
}