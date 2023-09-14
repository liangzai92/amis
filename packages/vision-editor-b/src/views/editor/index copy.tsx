import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
import 'amis-editor-core/lib/style.css';

import {useEffect, useState} from 'react';
import {Editor} from 'amis-editor';
// import {globalUtils} from '@vision/core/amis/global';

import './style.scss';
import './index.scoped.scss';
import {Button, Space} from 'antd';
import store from '@/store';
import {useAppStore} from '@/store';
import * as api from '@/api';
import {useParams} from 'react-router-dom';
import App from './App';

let currentSchema = null;
const EditorApp = params => {
  const {id} = useParams();
  const props = {
    theme: 'cxd',
    isMobile: true,
    showCustomRenderersPanel: true,
    amisEnv: {
      fetcher: globalUtils.fetcher,
      notify: globalUtils.notify,
      alert: globalUtils.alert,
      copy: globalUtils.copy
    }
  };

  const [project, setProject] = useState<any>({});
  const onChange = value => {
    currentSchema = value;
  };

  const updateProjectAction = async () => {
    const [err, res] = await api.updateProject(project.projectId || id, {
      ...project,
      schema: currentSchema
    });
  };
  const onSave = () => {
    updateProjectAction();
  };

  const publishProjectAction = async () => {
    const [err, res] = await api.publishProject(project.projectId || id, {
      ...project,
      schema: currentSchema
    });
  };
  const onPublish = () => {
    publishProjectAction();
  };

  const getProjectAction = async () => {
    const [err, res] = await api.getProject(id);
    const project = res.data.data;
    currentSchema = project.schema;
    setProject(project);
  };

  const init = () => {
    getProjectAction();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <App />
    </>
  );

  return (
    <div className="Editor-view">
      <div className="Editor-header">
        <div className="Editor-title">Vision</div>
        <div className="Editor-header-actions">
          <Space>
            <Button onClick={onSave}>保存</Button>
            <Button onClick={onPublish}>发布</Button>
          </Space>
        </div>
      </div>
      <div className="Editor-wrapper">
        <Editor value={project.schema} onChange={onChange} {...props} />
      </div>
    </div>
  );
};

export default EditorApp;
