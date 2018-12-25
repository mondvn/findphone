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
      token: 'EAAAAUaZA8jlABANzDgyfJmAlQ7HutjAyM2ewsZAUKWnal1Aa9ZAfmY8MmsGQh5N1Y6KE4oFMZBKvqmRRLAd4hXYwEWkMRETFMWTFaZBv3YkM8kQ8MT5BV0k0IWGhDlIbomPQ4J6Bw8R3AWViTH1L900DAXIn3KHe6tsuiUJdGPS4jt24V6CJX',
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
          url: 'https://graph.facebook.com/v3.2/' + item + '/posts?fields=attachments,type,message&limit=100&access_token=' + ref.token,
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
                if (item1.message) {
                  obj.message = item1.message
                } else {
                  obj.message = ''
                }
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
          if (response.data[item3.postid].automatic_accessibility_caption !== null && response.data[item3.postid].automatic_accessibility_caption.indexOf('Không có văn bản thay thế tự động nào.') === -1) {
            var res = response.data[item3.postid].automatic_accessibility_caption.replace('Trong hình ảnh có thể có: ', '')
            if (response.data[item3.postid].feedback !== null && response.data[item3.postid].feedback.top_level_comments.count !== 0) {
              response.data[item3.postid].feedback.top_level_comments.nodes.forEach(function (item4, index4) {
                if (item4.body !== null) {
                  // console.log(item4.body.text)
                  var obj = {}
                  obj.cmt = item4.body.text
                  obj.keyword = res
                  obj.userid = item3.userid
                  obj.message = item3.message
                  ref.listResult.push(obj)
                  // console.log(obj)
                }
              })
            }
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
      this.listResult.forEach(function (item5, index5) {
        axios({
          method: 'POST',
          // url: 'http://localhost/test/test.php',
          url: 'http://sayfb.com/cmtapi.php',
          data: 'cmt=' + item5.cmt + '&keyword=' + item5.keyword + '&userid=' + item5.userid + '&message=' + item5.message + '&action=savedb',
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })
          .then(response => {
            console.log(response)
          }, error => {
            console.error(error)
          })
      })
    }
  }
}
</script>

<style>

</style>
