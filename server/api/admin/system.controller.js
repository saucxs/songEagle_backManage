exports.getSystem = async(ctx) => {
  let sql = ` SELECT * FROM system `
  try {
    let results = await ctx.execSql(sql);
    console.log(results, '=======================================')
    ctx.body = {
      success: 1,
      message: '',
      content: results.length > 0 ? results : []
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错'
    };
  }
}
