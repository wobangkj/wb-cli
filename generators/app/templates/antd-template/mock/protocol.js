const getProtocol = (req, res) => {
  res.send({
    status: 200,
    data: [
      {
        id: '000000001',
        content: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      },
    ],
    pager: {
      client_page: 1,
      every_page: 20,
      total_num: 1,
    },
  });
};

export default {
  'GET /api/admin/protocol/list': getProtocol,
};
