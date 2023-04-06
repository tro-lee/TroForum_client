import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {selectAccountById} from "@/service/account/account";
import {history} from "@@/core/history";
import {ImageIP} from "@/constants";

function Avatar({userId, size = 12, avatarUrl = ""}) {
    const [account, setAccount] = useState({userName: "", userId: "", avatarUrl: "", description: ""});
    useEffect(() => {
        //判断头像位置有没有字符
        if (avatarUrl !== "") {
            setAccount({
                userName: "",
                userId: userId,
                avatarUrl: avatarUrl,
                description: ""
            });
            return;
        } else {
            selectAccountById(userId).then(res => {
                setAccount({
                    userId: res.userId,
                    userName: res.userName,
                    avatarUrl: res.avatarUrl,
                    description: res.description
                });
            });
        }
    }, []);

    const avatarClasses = classNames("relative inline", {
        "w-12 h-12": size === 12,
        "w-8 h-8": size === 8,
        "w-16 h-16": size === 16,
        "w-20 h-20": size === 20,
        "w-24 h-24": size === 24,
        "w-32 h-32": size === 32,
        "w-40 h-40": size === 40,
        "w-48 h-48": size === 48,
    });

    return (
        <div className={avatarClasses}>
            <img className="cursor-pointer rounded-full overflow-hidden mr-4" src={ImageIP + account.avatarUrl} alt="avatar"
                 onClick={() => history.push('/person/' + account.userId)}/>
        </div>
    );
}

export default Avatar;
