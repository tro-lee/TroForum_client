import {useEffect, useState} from "react";
import {PostSelectAccount} from "@/service/account/account";

export default () => {
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    const update = () => {
        PostSelectAccount().then(res => {
            setUserName(res.userName);
            setUserId(res.userId);
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        PostSelectAccount().then(res => {
            setUserName(res.userName);
            setUserId(res.userId);
        }).catch(e => {
            console.log(e);
        });
    }, []);

    return {
        userId,
        userName,
        update
    }
}
