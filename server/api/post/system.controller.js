exports.getSystem = async(ctx) => {
  let systemConfigSql = ` SELECT * FROM system `;
  try {
    let systemConfig = await ctx.execSql(systemConfigSql);
    let bottomLinkSql = ` SELECT * FROM bottom_link where system_id = ${systemConfig[0].id}`
    let bottomLink = await ctx.execSql(bottomLinkSql);
    if(systemConfig.length>0){
      ctx.body = {
        success: 1,
        message: '',
        content: {
          systemConfig: systemConfig[0],
          bottomLink: bottomLink
        }
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
