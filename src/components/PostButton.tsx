import {Button, message} from 'antd';
import {
    ModalForm,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {PostInsertTopicPost} from '@/service/post/post';
import {useModel} from '@@/exports';

const PostButton = () => {
    const {initialState} = useModel('@@initialState');
    return (
        <ModalForm<{
            title: string;
            theme: string;
            content: string;
        }>
            title="我要发帖~"
            trigger={
                <Button
                    style={{color: '#FF8888'}}
                    type="text"
                >
                    发帖
                </Button>
            }
            //表单样式
            modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('run'),
                bodyStyle: {},
                maskStyle: {
                    backgroundColor: 'rgba(0,0,0,0.32)',
                },
            }}
            //提交样式
            submitter={{
                resetButtonProps: {
                    style: {
                        display: 'none',
                    },
                },
                submitButtonProps: {
                    size: 'large',
                    shape: 'circle',
                    type: 'default',
                    style: {
                        backgroundColor: '#FF8888',
                        color: 'white',
                    },
                },
                searchConfig: {
                    submitText: '发',
                },
            }}
            onFinish={async (values) => {
                try {
                    // @ts-ignore
                    if (!values.content || !values.title ) {
                        message.error('内容残缺');
                        return ;
                    }
                    await PostInsertTopicPost(
                        initialState.id,
                        values.content,
                        values.title,
                        '暂无',
                    );
                } catch (e) {
                }
                message.success('发帖成功~记得刷新一下页面嗷');
                return true;
            }}
        >
            <ProFormText
                name="title"
                width="md"
                placeholder="标题:"
                fieldProps={{
                    bordered: false,
                    allowClear: false,
                    maxLength: 32,
                    size: 'large',
                }}
            />
            <ProFormTextArea
                name="content"
                placeholder="内容"
                fieldProps={{
                    bordered: false,
                    allowClear: true,
                    showCount: true,
                    maxLength: 3000,
                    autoSize: {
                        minRows: 3,
                        maxRows: 10,
                    },
                }}
            />
        </ModalForm>
    );
};
export default PostButton;
