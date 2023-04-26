import React from 'react';
import {useModel} from '@@/exports';
import PersonTopicPost from '@/pages/person/PersonTopicPost';
import Avatar from "@/components/Avatar";
import {SystemMessage} from "@/components/SystemMessage";

export default () => {
    //获取当前id
    const {userId} = useModel('global');

    return (
        <div className="flex flex-row items-center bg-gray-100 border border-gray-300 rounded-lg p-4 w-auto h-screen ml-40 mr-40">
            <div className="w-32 h-32 flex justify-center items-center mr-4">
                <Avatar userId={userId} size={48} />
            </div>
            <div className="flex-grow">
                <PersonTopicPost userId={userId} />
            </div>
            <SystemMessage/>
        </div>
    );
};
