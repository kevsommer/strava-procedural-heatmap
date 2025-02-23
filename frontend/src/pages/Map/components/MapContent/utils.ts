export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0-based, add 1 and pad with a leading 0 if needed
  const day = ("0" + date.getDate()).slice(-2); // Pad with a leading 0 if needed

  const hours = ("0" + date.getHours()).slice(-2); // Pad with a leading 0 if needed
  const minutes = ("0" + date.getMinutes()).slice(-2); // Pad with a leading 0 if needed

  // Format the date string as desired
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  return formattedDate;
};

