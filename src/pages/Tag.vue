<template>
  <section class="tag">
    <!--<section class="tag right-container">-->
    <header-top></header-top>
    <section class="container-box">
      <back-menu></back-menu>
      <div class="right-box">
        <back-header></back-header>
        <div class="tag-header">
          <ul class="tag-list">
            <li class="tag-item" v-for="(tag, index) in tagList" :key="tag.id">
              <button :class="currentTag.id === tag.id ? 'btn-primary' : 'btn-default'"
                      @click="queryTag(tag)" @dblclick="editTag(tag, index)">
                {{ tag.name}} ({{ tag.count }})
                <svg class="icon" aria-hidden="true" v-if="tag.id !== 0"
                     @click.stop="deleteTagData(tag, index)">
                  <use xlink:href="#icon-delete"></use>
                </svg>
              </button>
            </li>
          </ul>
          <button class="btn-default btn-add" @click="addTag">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-add"></use>
            </svg>添加标签
          </button>
        </div>
        <post-table :post-list="postList"></post-table>
        <pagination :page-size="pageSize"
                    :total="total"
                    :current-page="page"
                    @change-page="changePage">
        </pagination>
      </div>
    </section>
  </section>
</template>

<script>
//import api from '../fetch/api';
import { mapGetters, mapActions } from 'vuex';
import HeaderTop from '../components/HeaderTop';
import Menu from '../components/Menu';
import Header from '../components/Header';
import PostTable from '../components/PostTable';
import Pagination from '../components/Pagination';

export default {
  components: {
    HeaderTop,
    'back-menu': Menu,
    'back-header': Header,
    PostTable,
    Pagination
  },
  data () {
    return {
      tagList: [],
      currentTag: {
        id: 0,
        name: '全部标签',
        count: 0
      },
      postList: [],
      page: 1,
      pageSize: 10,
      total: 0
    };
  },
  created () {
    this.getTagsData();
    this.queryTag(this.currentTag);
  },
  methods: {
    ...mapActions([
      "getTags",
      "getPostsByTagId",
      "addNewTag",
      "updateTag",
      "deleteTag"
    ]),
    getTagsData: async function () {
      let res = await this.getTags();
      if (res.success === 1) {
        let tags = res.tags;
        let total = res.total;
        tags.unshift({
          id: 0,
          name: '全部标签',
          count: total
        });
        this.total = total;
        this.tagList = tags;
      }
    },
    queryTag: async function (tag) {
      this.currentTag = tag;
      this.total = tag.count;
      let params = {
        id: tag.id,
        page: this.page,
        pageSize: this.pageSize
      }
      let res = await this.getPostsByTagId(params);
      if (res.success === 1) {
        this.postList = res.posts;
      }
    },
    changePage: function (newPage) {
      this.page = newPage;
      this.queryTag(this.currentTag);
    },
    addTag: function () {
      this.$msgBox.showMsgBox({
        title: '添加标签',
        content: '请填写标签名称',
        isShowInput: true
      }).then(async (val) => {
        let res = await this.addNewTag(val);
        if (res.success === 1) {
          this.tagList.push({
            id: res.newId,
            name: val,
            count: 0
          });
          this.$message.showMessage({
            type: 'success',
            content: '添加标签成功'
          });
        } else {
          this.$message.showMessage({
            type: 'error',
            content: res.message
          });
        }
      }).catch(() => {
        console.log('cancel');
      });
    },
    editTag: function (tag, index) {
      this.$msgBox.showMsgBox({
        title: '编辑标签',
        content: '请填写标签名称',
        isShowInput: true,
        inputValue: tag.name
      }).then(async (val) => {
        let res = await this.updateTag(tag.id, val);
        if (res.success === 1) {
          this.tagList[index].name = val;
          this.$message.showMessage({
            type: 'success',
            content: '修改标签成功'
          });
        } else {
          this.$message.showMessage({
            type: 'error',
            content: res.message
          });
        }
      }).catch(() => {
        console.log('cancel');
      });
    },
    deleteTagData: function (tag, index) {
      let content = '确认是否删除该标签？';
      if (tag.count > 0) {
        content = '该标签下的文章不会受到删除的影响，确认是否删除该标签？';
      }
      this.$msgBox.showMsgBox({
        title: '确认删除',
        content: content
      }).then(async () => {
        let res = await this.deleteTag(tag.id);
        if (res.success === 1) {
          this.tagList.splice(index, 1);
          this.$message.showMessage({
            type: 'success',
            content: '删除标签成功'
          });
        } else {
          this.$message.showMessage({
            type: 'error',
            content: res.message
          });
        }
      }).catch(() => {
        return false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app';
.tag {
  .tag-header {
    position: relative;
    min-height: 3em;
    .btn-add {
      position: absolute;
      top: 0;
      right: 0;
      color: $base-color;
      border-color: $base-color;

      .icon {
        width: 0.9em;
        height: 0.9em;
        vertical-align: -0.05em;
        margin-right: 0.4em;
      }
    }
  }
  .tag-list {
    overflow: hidden;
    margin-right: 6em;

    .tag-item {
      float: left;

      button {
        position: relative;
        margin: 0 1em 1em 0;
        padding-right: 2em;
        .icon {
          position: absolute;
          top: 1em;
          right: 0.2em;
          width: 0.6em;
          height: 0.6em;
          color: red;
          vertical-align: -0.05em;
          margin-right: 0.4em;
        }
      }
    }
  }
}
</style>

