module.exports = app => {
    app.beforeStart(async () => {
      // 保证应用启动监听端口前数据已经准备好了
      // 后续数据的更新由定时任务自动触发
      // 手动执行定时任务
      //   await app.runSchedule('remove_img');
    });
};