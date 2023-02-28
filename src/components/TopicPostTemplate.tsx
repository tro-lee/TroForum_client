const TopicPostTemplate = (props: any) => {
    const {data} = props;
    const avatarLink = `https://api.multiavatar.com/${data.authorId + data.postId}.png`
    return (
        <div className="min-w-full bg-gray-100 p-8 rounded-lg">
            <img src={avatarLink} alt="" className="w-24 h-24 inline"/>
            <div className="ml-8 text-3xl inline break-words text-center">{data.title}</div>
            <div className="whitespace-pre-wrap text-xl m-4">{data.content}</div>
        </div>
    )
}

export default TopicPostTemplate
