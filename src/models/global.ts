import {useEffect, useState} from "react";
import {postSelectAccount} from "@/service/account/account";

export default () => {
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    const update = () => {
        postSelectAccount().then(res => {
            setUserName(res.userName);
            setUserId(res.userId);
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        postSelectAccount().then(res => {
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
