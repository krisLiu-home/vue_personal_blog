<template>
  <div class="editorblog-content">
    <h1>写博客</h1>
    <div class="home">
      <input type="text" class="inp title" v-model="title" id="blog-title" placeholder="请输入标题">
      <input type="text" class="inp tags" v-model="tags" id="blog-tags" placeholder="请输入标签，以逗号分割">
      <div id="demo1"></div>
      <button class="submit" @click="sendBlog">提交</button>
      <button type="button" class="btn" @click="getEditorData">获取当前内容</button>
      <h3>内容预览</h3>
      <textarea name="" id="" cols="140" rows="20" readonly v-model="editorData"></textarea>
    </div>
  </div>
</template>

<script>
  // 引入 wangEditor
  import wangEditor from 'wangeditor'
  export default {
    data() {
      return {
        editor: null,
        editorData: '',
        title: '',
        tags: '',
      }
    },
    methods: {
      getEditorData() {
        // 通过代码获取编辑器内容
        let data = this.editor.txt.html()
        return data;
      },

      // 提交内容
      sendBlog() {
        if (this.title) {
          if (this.getEditorData()) {
            const title = this.title;
            const tags = this.tags;
            const content = this.getEditorData();
            request.post('/api/blog', {
              data: {
                title,
                tags,
                content
              }
            }).then(res => {
              const data = res.data.data;
              if (data) {
                alert('添加成功');
                this.title = '';
                this.tags = '';
                this.editor.txt.clear()
              }
            }).catch(err => {
              alert('添加失败');
            })
          } else {
            alert('您没有输入任何内容');
          }
        } else {
          alert('请输入标题');
        }
      }
    },

    mounted() {
      const editor = new wangEditor(`#demo1`)
      editor.config.uploadImgServer = '/api/upload'
      editor.config.uploadImgMaxLength = 5; // 一次最多上传 5 个图片
      editor.config.uploadFileName = 'img';
      editor.config.uploadImgParamsWithUrl = true

      editor.config.uploadImgHooks = {
        // 图片上传并返回了结果，想要自己把图片插入到编辑器中
        // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
        customInsert: function (insertImgFn, result) {
          // result 即服务端返回的接口
          console.log('customInsert', result)
          const url = result.url;
          // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
          insertImgFn(url)
        }
      }

      // 配置 onchange 回调函数，将数据同步到 vue 中
      editor.config.onchange = (newHtml) => {
        this.editorData = newHtml
      }

      // 创建编辑器
      editor.create()

      this.editor = editor
    },

    beforeDestroy() {
      // 调用销毁 API 对当前编辑器实例进行销毁
      this.editor.destroy()
      this.editor = null
    }
  }
</script>

<style lang="scss" scoped>
  .editorblog-content {
    padding: 30px;
    height: 100%;
    box-sizing: border-box;

    h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .home {
      position: relative;
      overflow: scroll;
      height: calc(100% - 43px);
      padding-right: 20px;

      &::-webkit-scrollbar {
        background-color: #ffffff;
        width: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #80c8f8;
      }

      .inp {
        width: 180px;
        height: 40px;
        margin-bottom: 10px;
        margin-right: 30px;
        border: none;
        border-bottom: 1px dashed #ccc;
        outline: none;
        font-size: 16px;
        padding: 0 10px;
        color: #5a5a5a;
      }

      .submit {
        border: 1px solid #eea2a4;
        background-color: #eea2a4;
        color: #ffffff;
        padding: 8px 30px;
        border-radius: 5px;
        transition: .3s all;
        margin: 20px auto 0px;
        display: block;

        &:hover {
          background-color: #ee7f82;
        }
      }

      .btn {
        position: absolute;
        right: 20px;
        top: 0;
        padding: 5px 10px;
      }

      h3 {
        margin: 30px 0 15px;
      }
    }




  }
</style>