const fetch = require('node-fetch');
const moment = require('moment');

exports.getPostById = async(ctx) => {
  let id = ctx.params.id || 0,
      sql = ` SELECT post.id, post.title, post.content, post.poster, post.createTime, 
            post.categoryId, category.name AS categoryName, viewTotal 
            FROM post LEFT JOIN category ON post.categoryId = category.id 
            WHERE post.id = ${id}`,
      tagSql = ` SELECT tag.id, tag.name from post_tag a LEFT JOIN tag on a.tagId = tag.id 
              WHERE a.postId = ${id}`;
  try {
    let results = await ctx.execSql(sql);
    if (results.length > 0) {
      let tagResults = await ctx.execSql(tagSql);
      ctx.body = {
        success: 1,
        message: '',
        post: results[0],
        tags: tagResults.length > 0 ? tagResults : []
      };
    } else {
      ctx.body = {
        success: 1,
        message: '',
        post: null,
        tags: []
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

/*新增-发布*/
exports.addPost = async(ctx) => {
  let postData = ctx.request.body,
      tags = postData.tags,
      newPost = {
        title: postData.title,
        content: postData.content,
        categoryId: postData.categoryId,
        viewTotal: 0,
        status: postData.status,
        poster: '',
        createTime: moment().format('YYYY-MM-DD HH:mm:ss')
      };
  try {
    let insert = await ctx.execSql('INSERT INTO post SET ?', newPost);
    if (insert.affectedRows > 0) {
      let id = insert.insertId;
      if(tags.length > 0) {
        let updateTag = 'INSERT INTO post_tag (postId, tagId) values ';
        for(let tag of Object.values(tags)) {
          updateTag += `(${id}, ${tag.id}),`;
        }
        let tagSql = updateTag.substring(0, updateTag.length -1);
        let insertTag = await ctx.execSql(tagSql);
      }
      /*百度主动推送*/
      let arr = [];
      let data = {};
      let systemUrl = await ctx.execSql(`select system.systemUrl from system`)
      let postUrl = await ctx.execSql(`select post.id from post where status = 'PUBLISHED'`)
      let categoryUrl = await ctx.execSql(` SELECT category.id, category.name, COUNT(post.id) AS count 
                    FROM category LEFT JOIN post ON post.categoryId = category.id 
                    WHERE post.status = 'PUBLISHED'
                    GROUP BY category.id`)
      let tagUrl = await ctx.execSql(`  SELECT tag.id, tag.name, COUNT(post.id) AS count FROM tag 
                    LEFT JOIN post_tag ON tag.id = post_tag.tagId
                    LEFT JOIN post ON post_tag.postId = post.id AND post.status = 'PUBLISHED'
                    where post.status = 'PUBLISHED'
                    GROUP BY tag.id`)
      let baseUrl = systemUrl[0].systemUrl
      let other = [
        { id: 1, itemname: '实验室',url:'laboratory' },
        { id: 2, itemname: '关于',url:'about' }
      ]
      data = {
        baseUrl: baseUrl,
        post: postUrl,
        categoryUrl: categoryUrl,
        tagUrl: tagUrl,
        other: other
      }
      arr.push(data.baseUrl);
      for(let i=0,length=data.post.length;i<length;i++){
        arr.push(data.baseUrl + '/post/'+ data.post[i].id)
      }
      for(let i=0,length=data.categoryUrl.length;i<length;i++){
        arr.push(data.baseUrl + '/search/category/'+ data.categoryUrl[i].id)
      }
      for(let i=0,length=data.tagUrl.length;i<length;i++){
        arr.push(data.baseUrl + '/search/tag/'+ data.tagUrl[i].id)
      }
      for(let i=0,length=data.other.length;i<length;i++){
        arr.push(data.baseUrl + '/' + data.other[i].url)
      }
      var bodyString = arr.join('\n');
      let path = ' http://data.zz.baidu.com/urls?site=www.chengxinsong.cn&token=CuY4HYkx9GrCwdXc';
      await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain '
        },
        body: bodyString
      }).then(res => {
        return res.json();
      }).then(async(res) => {
        ctx.body = {
          success: 1,
          message: '',
          res: res,
          id: id
        };
      })
    } else {
      ctx.body = {
        success: 0,
        message: '添加文章出错'
      };
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '添加文章出错'
    };
  }
}

/*修改-发布*/
exports.updatePost = async(ctx) => {
  let id = ctx.params.id || 0,
      postData = ctx.request.body,
      tags = postData.tags,
      newPost = {
        title: postData.title,
        content: postData.content,
        categoryId: postData.categoryId,
        status: postData.status,
        poster: postData.poster,
        updateTime: moment().format('YYYY-MM-DD HH:mm:ss')
      };
  try {
    let result = await ctx.execSql('UPDATE post SET ? WHERE id = ?', [newPost, id]);
    let delResult = await ctx.execSql('DELETE FROM post_tag WHERE postId = ?', id);
    if(tags.length > 0) {
      let updateTag = 'INSERT INTO post_tag (postId, tagId) values ';
      for(let tag of Object.values(tags)) {
        updateTag += `(${id}, ${tag.id}),`;
      }
      let tagSql = updateTag.substring(0, updateTag.length -1);
      let insertTag = await ctx.execSql(tagSql);
    }
    /*百度主动推送*/
    let arr = [];
    let data = {};
    let systemUrl = await ctx.execSql(`select system.systemUrl from system`)
    let postUrl = await ctx.execSql(`select post.id from post where status = 'PUBLISHED'`)
    let categoryUrl = await ctx.execSql(` SELECT category.id, category.name, COUNT(post.id) AS count 
                    FROM category LEFT JOIN post ON post.categoryId = category.id 
                    WHERE post.status = 'PUBLISHED'
                    GROUP BY category.id`)
    let tagUrl = await ctx.execSql(`  SELECT tag.id, tag.name, COUNT(post.id) AS count FROM tag 
                    LEFT JOIN post_tag ON tag.id = post_tag.tagId
                    LEFT JOIN post ON post_tag.postId = post.id AND post.status = 'PUBLISHED'
                    where post.status = 'PUBLISHED'
                    GROUP BY tag.id`)
    let baseUrl = systemUrl[0].systemUrl
    let other = [
      { id: 1, itemname: '实验室',url:'laboratory' },
      { id: 2, itemname: '关于',url:'about' }
    ]
    data = {
      baseUrl: baseUrl,
      post: postUrl,
      categoryUrl: categoryUrl,
      tagUrl: tagUrl,
      other: other
    }
    arr.push(data.baseUrl);
    for(let i=0,length=data.post.length;i<length;i++){
      arr.push(data.baseUrl + '/post/'+ data.post[i].id)
    }
    for(let i=0,length=data.categoryUrl.length;i<length;i++){
      arr.push(data.baseUrl + '/search/category/'+ data.categoryUrl[i].id)
    }
    for(let i=0,length=data.tagUrl.length;i<length;i++){
      arr.push(data.baseUrl + '/search/tag/'+ data.tagUrl[i].id)
    }
    for(let i=0,length=data.other.length;i<length;i++){
      arr.push(data.baseUrl + '/' + data.other[i].url)
    }
    var bodyString = arr.join('\n');
    let path = ' http://data.zz.baidu.com/urls?site=www.chengxinsong.cn&token=CuY4HYkx9GrCwdXc';
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain '
      },
      body: bodyString
    }).then(res => {
      return res.json();
    }).then(async(res) => {
      ctx.body = {
        success: 1,
        message: '',
        res: res
      };
    })
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '添加文章出错'
    };
  }
}

exports.getPostList = async(ctx) => {
  let page = ctx.query.page || 1,
      pageNum = ctx.query.pageNum || 10;
  let pageIndex = (page - 1) * pageNum < 0 ? 0 : (page - 1) * pageNum;
  let sql = ` SELECT post.id, post.title, post.createTime, post.updateTime, post.viewTotal, post.status, post.categoryId, 
                category.name AS categoryName FROM post 
                LEFT JOIN category ON post.categoryId = category.id 
                ORDER BY post.createTime DESC LIMIT ${pageIndex}, ${pageNum}`;
  try {
    let results = await ctx.execSql(sql);
    ctx.body = {
      success: 1,
      message: '',
      posts: results
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错',
      posts: null
    };
  }
}

exports.getPostTotal = async(ctx) => {
  try {
    let results = await ctx.execSql(`SELECT * FROM post`);
    ctx.body = {
      success: 1,
      message: '',
      total: results.length || 0
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错',
      total: 0
    };
  }
}

exports.offlinePost = async(ctx) => {
  let id = ctx.params.id || 0;
  try {
    let results = await ctx.execSql(`UPDATE post SET status = 'OFFLINE' WHERE id = ?`, id);
    ctx.body = {
      success: 1,
      message: ''
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '文章下线出错'
    };
  }
}

/*列表-发布*/
exports.publishPost = async(ctx) => {
  let id = ctx.params.id || 0;
  try {
    let results = await ctx.execSql(`UPDATE post SET status = 'PUBLISHED' WHERE id = ?`, id);
    /*百度主动推送*/
    let arr = [];
    let data = {};
    let systemUrl = await ctx.execSql(`select system.systemUrl from system`)
    let postUrl = await ctx.execSql(`select post.id from post where status = 'PUBLISHED'`)
    let categoryUrl = await ctx.execSql(` SELECT category.id, category.name, COUNT(post.id) AS count 
                    FROM category LEFT JOIN post ON post.categoryId = category.id 
                    WHERE post.status = 'PUBLISHED'
                    GROUP BY category.id`)
    let tagUrl = await ctx.execSql(`  SELECT tag.id, tag.name, COUNT(post.id) AS count FROM tag 
                    LEFT JOIN post_tag ON tag.id = post_tag.tagId
                    LEFT JOIN post ON post_tag.postId = post.id AND post.status = 'PUBLISHED'
                    where post.status = 'PUBLISHED'
                    GROUP BY tag.id`)
    let baseUrl = systemUrl[0].systemUrl
    let other = [
      { id: 1, itemname: '实验室',url:'laboratory' },
      { id: 2, itemname: '关于',url:'about' }
    ]
    data = {
      baseUrl: baseUrl,
      post: postUrl,
      categoryUrl: categoryUrl,
      tagUrl: tagUrl,
      other: other
    }
    arr.push(data.baseUrl);
    for(let i=0,length=data.post.length;i<length;i++){
      arr.push(data.baseUrl + '/post/'+ data.post[i].id)
    }
    for(let i=0,length=data.categoryUrl.length;i<length;i++){
      arr.push(data.baseUrl + '/search/category/'+ data.categoryUrl[i].id)
    }
    for(let i=0,length=data.tagUrl.length;i<length;i++){
      arr.push(data.baseUrl + '/search/tag/'+ data.tagUrl[i].id)
    }
    for(let i=0,length=data.other.length;i<length;i++){
      arr.push(data.baseUrl + '/' + data.other[i].url)
    }
    var bodyString = arr.join('\n');
    let path = ' http://data.zz.baidu.com/urls?site=www.chengxinsong.cn&token=CuY4HYkx9GrCwdXc';
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain '
      },
      body: bodyString
    }).then(res => {
      return res.json();
    }).then(async(res) => {
      ctx.body = {
        success: 1,
        message: '',
        res: res
      };
    })
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '文章发布出错'
    };
  }
}

exports.deletePost = async(ctx) => {
  let id = ctx.params.id || 0;
  try {
    let results = await ctx.execSql(`DELETE FROM post WHERE id = ?`, id);
    ctx.body = {
      success: 1,
      message: ''
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '文章删除出错'
    };
  }
}
