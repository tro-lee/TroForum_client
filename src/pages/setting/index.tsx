import React from 'react';
import {UpdatePassword} from "@/pages/setting/UpdatePassword";
import {useModel} from "@@/exports";
import {UpdateUserName} from "@/pages/setting/UpdateUserName";
import {UpdateAvatar} from "@/pages/setting/UpdateAvatar";
import {SystemMessage} from "@/components/SystemMessage";
import ExitButton from "@/components/ExitButton";

export default function Page() {
    const user = useModel('global');
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="w-1/2 bg-gray-200 p-4 rounded-md">
                <h1 className="text-lg font-bold mb-3 ">用户信息</h1>
                <div className="mb-4">
                    <p>
                        用户名: <span className="font-bold">{user.userName}</span>
                    </p>
                </div>
                <UpdateAvatar/>
                <UpdateUserName/>
                <UpdatePassword/>
                <ExitButton key="ExitButton"/>
            </div>
            <SystemMessage/>
        </div>
    );
}
