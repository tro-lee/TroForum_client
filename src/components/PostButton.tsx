import {Button, message} from "antd";
import {ModalForm, ProFormText, ProFormTextArea} from "@ant-design/pro-components";
import {PostInsertTopicPost} from "@/service/post/post";
import {useModel} from "@@/exports";

const PostButton = () => {
    const {initialState} = useModel("@@initialState");
    return (
        <ModalForm<{
            title: string,
            theme: string,
            introduction: string
            content: string
        }>
            title="我要发帖~"
            trigger={
                <Button style={{backgroundColor: "white", color: "#FF8888"}} type="text">发帖</Button>
            }
            //表单样式
            modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('run'),
                bodyStyle: {

                },
                maskStyle: {
                    backgroundColor: "rgba(0,0,0,0.32)"
                }
            }}
            //提交样式
            submitter={{
                resetButtonProps: {
                    style: {
                        display: 'none'
                    }
                },
                submitButtonProps: {
                    size: "large",
                    shape: "circle",
                    type: "default",
                    style: {
                        backgroundColor: "#FF8888",
                        color: "white"
                    }
                },
                searchConfig: {
                    submitText: "发"
                }
            }}
            onFinish={
                async values => {
                    await PostInsertTopicPost(initialState.id, values.content, values.title, "暂无", values.introduction)
                }}
        >
            <ProFormText
                name="title" width="md"
                placeholder="标题:"
                fieldProps={{
                    bordered: false,
                    allowClear: false,
                    maxLength: 32,
                    size: "large"
                }}
            />
            <ProFormTextArea
                name="introduction"
                placeholder="引言:" fieldProps={{
                bordered: false,
                allowClear: true,
                maxLength: 64,
                showCount: true,
                autoSize: {
                    minRows: 2,
                    maxRows: 4
                },
            }}
            />
            <ProFormTextArea
                name="content"
                placeholder="内容" fieldProps={{
                bordered: false,
                allowClear: true,
                showCount: true,
                maxLength: 3000,
                autoSize: {
                    minRows: 3,
                    maxRows: 10
                }
            }}
            />
        </ModalForm>
    )
}
export default PostButton
