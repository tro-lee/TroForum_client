import Avatar from "@/components/Avatar";
import React from "react";

const ProfileCard = ({account}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 flex">
                <div className="mr-4">
                    <Avatar userId={account.userId} avatarUrl={""}/>
                </div>
                <div>
                    <div className="text-gray-800 font-medium text-lg">{account.userName}</div>
                    <div className="text-gray-500 text-sm mb-2">{account.userId}</div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
