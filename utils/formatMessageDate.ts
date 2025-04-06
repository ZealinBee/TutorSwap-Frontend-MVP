 const formatMessageDate = (timestamp: string): string => {
  const messageDate = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (messageDate.toDateString() === today.toDateString()) {
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (messageDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  if (messageDate.getFullYear() === today.getFullYear()) {
    return messageDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  }
  return messageDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default formatMessageDate;