import {get, patch, getUrl} from '@/utils/http';

export const getProject = (id, ...args) => {
  return get(getUrl(`/project/${id}`), ...args);
};

export const updateProject = (id, ...args) => {
  return patch(getUrl(`/project/${id}`), ...args);
};

export const publishProject = (id, ...args) => {
  return patch(getUrl(`/project/${id}?action=publish`), ...args);
};
