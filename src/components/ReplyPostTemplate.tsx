const ReplyPostTemplate = (props: any) => {
  const { data } = props;
  const avatarLink = `https://api.multiavatar.com/${
    data.authorId + data.master
  }.png`;
  return (
    <div className="mt-4 min-w-full bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
      <img src={avatarLink} alt="" className="w-10 h-10 inline" />
      <div className="ml-8 text-xl inline break-words text-center whitespace-pre-wrap">
        {data.content}
      </div>
      <div className="text-xl font-bold text-gray-400 relative">
        {data.userName}
      </div>
    </div>
  );
};

export default ReplyPostTemplate;
