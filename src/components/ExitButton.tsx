import {Button, message} from "antd";
import {PostLogout} from "@/service/common/login";
import {history} from "@@/core/history";

const ExitButton = () => {
    return (
        <Button
            style={{ backgroundColor: '#FF8888', color: 'white' }}
            type="text"
            onClick={async () => {
                await PostLogout();
                message.success('拜拜了');
                history.push('/login');
            }}
        >
            注销
        </Button>
    );
};

export default ExitButton
