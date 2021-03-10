import { Form, Input, Button } from 'antd';
import { useUpdate } from 'ahooks';
import { useEffect } from 'react';

export default () => {
  const [form] = Form.useForm();
  const update = useUpdate();

  useEffect(() => {
    update();
  }, []);

  const Root = (
    <Form form={form}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入手机号' }]}
      >
        <Input placeholder="请输入手机号" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入验证码' }]}
      >
        <Input placeholder="请输入验证码" />
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            立即登录
          </Button>
        )}
      </Form.Item>
    </Form>
  );

  return Root;
};
