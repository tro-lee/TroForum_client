import {IP} from "@/constants";
import {message} from "antd";
import React from "react";
import SockJsClient from 'react-stomp'
import {useModel} from "@@/exports";

export const SystemMessage = () => {
    const {userId} = useModel('global');
    return (
        <SockJsClient
            url={IP + '/ws'}
            topics={[`/topic/system`]}
            onMessage={res => {
                if (userId === res.targetId) {
                    message.success(res.content)
                }
            }}
        />
    )
}
