export const formatLocalTime = (localtime: string) => {
  const dateObj = new Date(localtime);

  // Extract the time in 24-hour format
  const time = dateObj.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Extract and format the date: "Thursday, 31 Aug"
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });

  return { time, formattedDate };
};
