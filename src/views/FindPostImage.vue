<template>
  <div class="panel">
    <div class="panel-heading">
      <h3 class="panel-title">Quét Post ID có ảnh</h3>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="form-group">
          <div class="col-lg-12">
              <div class="col-lg-12" style="padding-left: 80px; padding-right: 80px">
                <label class=" control-label" for="demo-is-inputsmall"><strong>Nhập Facebook UID tại đây:</strong></label>
                <br>
                <textarea style="width:100%" name="message" rows="5" placeholder="Ví dụ: 1000009128473945" v-model="facebookuid"></textarea>
              </div>
              <div class="col-lg-12" style="padding-left: 80px">
                <input id="btn-submit" class="btn btn-info" type="submit" value="Run application" @click='getPost()' />
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FindPostImage',
  data: function () {
    return {
      token: 'EAAAAUaZA8jlABAMzZA64j8tsHAqjVVbfCbbYVxuTfXiibkVb3XKTOeegOKoXvMoDmPkhDM3QDEHryHmnQJsBXfBpDru9ywIlOgGbI32EE02YRfUKGxlQxwAzRVRoEHHeEHOf75IQpTysYvYJn7Hw5ZAAlE2xR485nqSGyx1bGFgHu6RczVYFjZCAtjwwxKgZD',
      facebookuid: '',
      results: [],
      listID: [],
      listResult: []
    }
  },
  methods: {
    getPost () {
      var ref = this
      this.results = []
      this.listID = []
      if (!this.facebookuid) {
        alert('Vui lòng nhập thông tin vào ô UID Facebook')
        return
      }
      this.results = this.facebookuid.split('\n')
      var resultsLength = this.results.length
      var numResults = 0
      this.results.forEach(function (item, index) {
        axios({
          method: 'GET',
          url: 'https://graph.facebook.com/v3.2/' + item + '/posts?fields=attachments,type&limit=50&access_token=' + ref.token,
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(response => {
          // console.log(response.data)
          var responseLength = response.data.data.length
          var num = 0
          response.data.data.forEach(function (item1, index1) {
            if (item1.type === 'photo') {
              if (item1.attachments.data[0].subattachments) {
                num++
                item1.attachments.data[0].subattachments.data.forEach(function (item2, index2) {
                  var obj = {}
                  obj.postid = item2.target.id
                  obj.userid = item
                  ref.listID.push(obj)
                })
              } else {
                num++
                var obj = {}
                obj.postid = item1.attachments.data[0].target.id
                obj.userid = item
                ref.listID.push(obj)
              }
            } else {
              num++
            }
            if (num === responseLength) {
              numResults++
            }
          })
          if (numResults === resultsLength) {
            console.log('chạy getkeyword')
            ref.getKeyWord()
          }
        })
      })
    },
    getKeyWord () {
      var ref = this
      this.listResult = []
      var numGetKeyWord = 0
      var listIDLength = this.listID.length
      this.listID.forEach(function (item3, index3) {
        axios({
          method: 'GET',
          url: 'https://graph.facebook.com/graphql?q=node(' + item3.postid + ')%7Bautomatic_accessibility_caption,feedback%7Btop_level_comments%7Bcount,nodes.first(1000)%7Bbody%7Btext%7D%7D%7D%7D%7D&method=get&locale=vi_VN&access_token=' + ref.token,
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(response => {
          if (response.data[item3.postid].automatic_accessibility_caption && response.data[item3.postid].automatic_accessibility_caption.indexOf('Không có văn bản thay thế tự động nào.') === -1) {
            var res = response.data[item3.postid].automatic_accessibility_caption.replace('Trong hình ảnh có thể có: ', '')
            // console.log(res)
          }
          if (response.data[item3.postid].feedback.top_level_comments.count !== 0) {
            response.data[item3.postid].feedback.top_level_comments.nodes.forEach(function (item4, index4) {
              if (item4.body !== null) {
                // console.log(item4.body.text)
                var obj = {}
                obj.cmt = item4.body.text
                obj.keyword = res
                obj.userid = item3.userid
                ref.listResult.push(obj)
                // console.log(obj)
              }
            })
          }
          numGetKeyWord++
          if (numGetKeyWord === listIDLength) {
            ref.pushDataToSever()
          }
        })
      })
    },
    pushDataToSever () {
      console.log('push data đây')
      console.log(this.listResult)
    }
  }
}
</script>

<style>

</style>
