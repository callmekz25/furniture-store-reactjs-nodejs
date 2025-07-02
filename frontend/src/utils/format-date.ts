const formatDate = (createdAt: string) => {
  const date = new Date(createdAt);

  const options = { day: "numeric", month: "long", year: "numeric" };

  return new Intl.DateTimeFormat("vi-VN", options).format(date);
};

export default formatDate;
