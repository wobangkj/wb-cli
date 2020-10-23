// import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { history } from 'umi';
import React from 'react';
// import { ContentUtils } from 'braft-utils';

export const BackRouter = (pathname, pager, isEmpty) => {
  let pathList = [];
  try {
    pathList = JSON.parse(sessionStorage.getItem('pathList'));
  } catch (error) {
    // console.log(err);
  }

  if (isEmpty) {
    pathList = [];
  }
  pathList.push({
    pathname,
    pager,
  });

  sessionStorage.setItem('pathList', JSON.stringify(pathList));
  console.log(pathList);
};

const BackPage = () => {
  /**
   * 返回上一页
   */
  const handlePrev = () => {
    let pathList = [];
    let prevClientPath = {};
    try {
      pathList = JSON.parse(sessionStorage.getItem('pathList'));
    } catch (err) {
      // console.log(err);
    }

    if (pathList.length !== 0) {
      prevClientPath = pathList.pop();
    }
    if (prevClientPath.pathname) {
      sessionStorage.setItem('pathList', JSON.stringify(pathList));
      sessionStorage.setItem('clientPath', JSON.stringify(prevClientPath));
      history.push(prevClientPath.pathname);
    } else {
      history.push('/task/duty');
    }
  };

  // useEffect(() => {
  //   let pathList = [];
  //   let prevClientPath = {};
  //   try {
  //     pathList = JSON.parse(sessionStorage.getItem('pathList'));
  //   } catch (err) {
  //     // console.log(err);
  //   }
  //   try {
  //     prevClientPath = JSON.parse(sessionStorage.getItem('clientPath'));
  //   } catch (err) {
  //     // console.log(err);
  //   }

  //   try {
  //     const path = pathList.pop();
  //     // 防止刷新
  //     if (prevClientPath.pathname && !prevClientPath.isUsed) return;
  //     sessionStorage.setItem('pathList', JSON.stringify(pathList));
  //     console.log(sessionStorage.setItem('clientPath', JSON.stringify(path)));
  //     console.log(path);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  return (
    <Button type="link" onClick={handlePrev}>
      返回上一页
    </Button>
  );
};

export default BackPage;
