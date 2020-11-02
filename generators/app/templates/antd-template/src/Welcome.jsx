/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert, Tag } from 'antd';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => (
  <PageHeaderWrapper>
    <Card>
      <Alert
        message="欢迎使用后台通用管理系统，以下为一些常用代码片段"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Typography.Text strong>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://blog.wobangkj.com/post/antd-template-shi-yong-jiao-cheng-hou-tai-guan-li/"
        >
          首次使用需要掉通登录接口，完事开头难，详情过程点击这里即可
        </a>
      </Typography.Text>
      <CodePreview>
        https://blog.wobangkj.com/post/antd-template-shi-yong-jiao-cheng-hou-tai-guan-li/
      </CodePreview>
      <Typography.Text strong>
        <a target="_blank" rel="noopener noreferrer" href="">
          简单的增删查改页面需求，可复制src/pages/Curd整改文件夹，重命名即可，推荐首字母大写命名
        </a>
      </Typography.Text>
      <Typography.Text strong>
        <a target="_blank" rel="noopener noreferrer" href="">
          常见的业务组件，基本都封装在src/components/Form文件下，使用的时候导入即可，业务较复杂情况可直接复制出来
          放到对应的页面里面进行调整修改即可
        </a>
      </Typography.Text>
      <CodePreview>{`import {UploadFile, SelectItem} from '@/components/form/';`}</CodePreview>
      <Typography.Paragraph>
        目前已有业务组件如下：
        <Tag color="green">常用下拉框 SelectItem</Tag>
        <Tag color="green">文件上传 UploadFile</Tag>
        <Tag color="green">搜索下拉框 CompleteInput</Tag>
        <Tag color="green">阿里云文件上传 UploadAliossFile</Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        阿里云文件上传需要前往src/utils/request设置oss相关配置
      </Typography.Paragraph>
      <CodePreview>{`export const accessId = ''; // 阿里云access_key_id `}</CodePreview>
      <CodePreview>{`export const accessKey = ''; // 阿里云access_key_secret`} </CodePreview>
      <CodePreview>
        {`export const aliossHost = 'https://demo.oss-cn-hangzhou.aliyuncs.com'; // 阿里云上传地址`}
      </CodePreview>

      <Typography.Text strong>
        <a target="_blank" rel="noopener noreferrer" href="https://braft.margox.cn/">
          富文本编辑器采用的是braft-editor，具体封装在src/components/Editor,使用需要配置上传文件地址，具体在src/utils/request
        </a>
      </Typography.Text>
      <CodePreview>export const prefix = /api/ // 接口请求前缀</CodePreview>
      <CodePreview>
        export const host = http://test.wobangkj.com/ // 域名绝对路径 小程序富文本显示用
      </CodePreview>
    </Card>
  </PageHeaderWrapper>
);
