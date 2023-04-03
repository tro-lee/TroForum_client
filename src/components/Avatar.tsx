import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {SelectAccountById} from "@/service/account/account";
import {ImageIP} from "@/constants";
import {history} from "@@/core/history";

function Avatar({userId, size = 12, avatarUrl = ""}) {
    const [account, setAccount] = useState({userName: "", userId: "", avatarUrl: "", description: ""});
    useEffect(() => {
        SelectAccountById(userId).then(res => {
            console.log(res);
            setAccount(res);
        });
    }, []);
    useEffect(() => {
        if (avatarUrl !== "") {
            setAccount({
                userName: "",
                userId: userId,
                avatarUrl: ImageIP + avatarUrl,
                description: ""
            });
            return;
        } else {
            SelectAccountById(userId).then(res => {
                //检测头像是否为空
                if (res.avatarUrl === "") {
                    res.avatarUrl = "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg";
                } else {
                    res.avatarUrl = ImageIP + res.avatarUrl;
                }
                setAccount(res);
            });
        }
    }, []);

    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

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
        <div className={avatarClasses} onMouseEnter={toggleDetails} onMouseLeave={toggleDetails}>
            <img className="rounded-full cursor-pointer inline" src={account.avatarUrl} alt="avatar"
                 onClick={() => history.push('/person/' + account.userId)}/>
        </div>
    );
}

export default Avatar;
