import Avatar from "@/components/Avatar";
import { dateDiff } from "@/service/common/time";
import React from "react";

const TopicPostTemplate = (props: any) => {
  const { data } = props;
  return (
      <div className="min-w-full bg-gray-100 hover:bg-gray-200 p-8 rounded-lg flex flex-col">
          <div className="flex justify-between items-center mb-4">
              <div className="w-24">
                  <Avatar userId={data.authorId} avatarUrl={data.avatarUrl}/>
              </div>
              <div className="ml-4 text-2xl font-bold">{data.authorName}</div>
              <div className="text-sm text-gray-500">{dateDiff(data.createdTime, new Date().getTime())}</div>
          </div>
          <div className="text-4xl font-bold mb-8">{data.title}</div>
          <div className="text-xl leading-relaxed mb-8">{data.content}</div>
      </div>
  );
};

export default TopicPostTemplate;
