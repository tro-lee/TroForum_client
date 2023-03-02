import {useEffect, useState} from "react";
import {PostSelectAccount} from "@/service/account/account";

export default () => {
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        PostSelectAccount().then(res => {
            setUserName(res.userName);
            setUserId(res.userId);
        });
    }, []);

    return {
        userId,
        userName
    }
}
