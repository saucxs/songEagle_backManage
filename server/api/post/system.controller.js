exports.getSystem = async(ctx) => {
  let systemConfigSql = ` SELECT * FROM system `;
  try {
    let systemConfig = await ctx.execSql(systemConfigSql);
    if(systemConfig.length>0){
      ctx.body = {
        success: 1,
        message: '',
        content: systemConfig[0]
      };
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错'
    };
  }
}

exports.getBottomLink = async(ctx) => {
  let bottomLinkSql = ` SELECT * FROM bottom_link`;
  let systemConfigSql = ` SELECT * FROM system `;
  try {
    let bottomLink = await ctx.execSql(bottomLinkSql);
    let systemConfig = await ctx.execSql(systemConfigSql);
    ctx.body = {
      success: 1,
      message: '',
      bottomLink: bottomLink,
      systemConfig: systemConfig[0]
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错'
    };
  }
}
