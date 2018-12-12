<template>
  <div class="panel">
    <div class="panel-heading">
      <h3 class="panel-title">Quét UID Live Stream</h3>
    </div>
    <div class="panel-body">
        <div class="row">
          <div class="form-group">
            <div class="col-lg-12" style="padding-left: 80px; padding-right: 80px">
              <label class=" control-label" for="demo-is-inputsmall"><strong>Nhập Facebook UID tại đây:</strong></label>
              <br>
              <textarea style="width:100%" name="message" rows="5" placeholder="Ví dụ: 1000009128473945" v-model="facebokuid"></textarea>
            </div>
            <div class="col-lg-12" style="padding-left: 80px">
              <input id="btn-submit" class="btn btn-info" type="submit" value="Get UID" @click='getPost()' />
            </div>
            <div class="col-lg-12" style="padding-right: 80px; padding-left: 80px">
              <textarea style="width:100%" name="message" rows="5" v-model="listIdPost"></textarea>
            </div>
            <div class="col-lg-12" style="padding-left: 80px">
              <input id="btn-submit" class="btn btn-info" type="submit" value="Find Phone" @click='findPhone()' />
            </div>
            <div class="col-lg-6">
                <button class="btn btn-primary btn-block" @click="exportToExcel">Save Excel</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
const XLSX = require('xlsx')

export default {
  name: 'LiveStream',
  data: function () {
    return {
      facebokuid: '',
      results: [],
      data: [],
      arrIdPostLiveStream: [],
      listIdPost: null,
      checkFirstTime: true,
      dataPhone: [],
      token: 'EAAAAUaZA8jlABANzDgyfJmAlQ7HutjAyM2ewsZAUKWnal1Aa9ZAfmY8MmsGQh5N1Y6KE4oFMZBKvqmRRLAd4hXYwEWkMRETFMWTFaZBv3YkM8kQ8MT5BV0k0IWGhDlIbomPQ4J6Bw8R3AWViTH1L900DAXIn3KHe6tsuiUJdGPS4jt24V6CJX',
      newestTimeStampComment: 0
    }
  },
  methods: {
    getPost () {
      this.results = []
      this.arrIdPostLiveStream = []
      if (!this.facebokuid) {
        alert('Vui lòng nhập thông tin vào ô UID Facebook')
        return
      }

      var ref = this
      this.results = this.facebokuid.split('\n')
      var num = 0
      var resultsLength = this.results.length
      this.results.forEach(function (item, index) {
        axios({
          method: 'GET',
          url: 'https://graph.facebook.com/' + item + '/posts?limit=5&access_token=' + ref.token,
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(response => {
          ref.data = response.data.data
          num++
          if (num === resultsLength) {
            console.log('Có tổng cộng: ' + ref.arrIdPostLiveStream.length + ' Post Live Stream')
            // setInterval(ref.findPhone(), 20000)
            setInterval(() => {
              ref.findPhone()
            }, 20000)
          }
          response.data.data.forEach(function (item4, index4) {
            if (item4.story && item4.story.indexOf('is live now') !== -1) {
              var obj = {}
              obj.id = item4.id
              obj.newestTimeStampComment = 0
              obj.checkFirstTime = true
              ref.arrIdPostLiveStream.push(obj)
            }
          })
        })
      })
    },
    findPhone () {
      var ref = this
      // this.dataPhone = []

      this.arrIdPostLiveStream.forEach(function (item, index) {
        if (item.checkFirstTime === true) {
          item.checkFirstTime = false
          axios({
            methods: 'GET',
            url: 'https://graph.facebook.com/' + item.id + '/comments?limit=5000&order=reverse_chronological&access_token=' + ref.token,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
          }).then(response => {
            if (response.data.data.length !== 0) {
              var num = 0
              var numGet = 0
              var rlen = response.data.data.length
              item.newestTimeStampComment = Date.parse(response.data.data[0].created_time) / 1000
              response.data.data.forEach(function (item3, index3) {
                num++
                var obj = {}
                var string = item3.message.replace(/ |-/gi, '')
                var splitString1 = string.split('.')
                var string1 = splitString1.join('')

                var splitString2 = string1.replace(/o/gi, '')

                const regex = /0[0-9\s.-]{9,9}\b/gi
                var matches = regex.exec(splitString2)
                if (matches) {
                  var replaceNumber = matches[0].replace('0', '84')
                  obj.phone = replaceNumber
                  obj.uid = item3.from.id
                  ref.dataPhone.push(obj)
                  numGet++
                }
                if (num === rlen) {
                  console.log(item.id + ' lần 1 láy được thêm số điện thoại: ' + numGet)
                }
              })
            }
          })
        } else {
          axios({
            methods: 'GET',
            url: 'https://graph.facebook.com/' + item.id + '/comments?limit=50&order=reverse_chronological&access_token=' + ref.token,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
          }).then(response => {
            if (response.data.data.length !== 0) {
              var num = 0
              var numGet = 0
              var rlen = response.data.data.length
              var checkTime = item.newestTimeStampComment
              response.data.data.forEach(function (item2, index2) {
                num++
                var checkTC = Date.parse(item2.created_time) / 1000
                if (checkTC > checkTime) {
                  var obj = {}

                  var string = item2.message.replace(/ |-/gi, '')
                  var splitString1 = string.split('.')
                  var string1 = splitString1.join('')
                  var splitString2 = string1.replace(/o/gi, '0')

                  const regex = /0[0-9\s.-]{9,9}\b/gi
                  var matches = regex.exec(splitString2)
                  if (matches) {
                    var replaceNumber = matches[0].replace('0', '84')
                    obj.phone = replaceNumber
                    obj.uid = item2.from.id
                    ref.dataPhone.push(obj)
                    numGet++
                  }
                }
                if (num === rlen) {
                  item.newestTimeStampComment = Date.parse(response.data.data[0].created_time) / 1000
                  console.log(item.id + ' láy được thêm số điện thoại: ' + numGet)
                }
              })
            }
          })
        }
      })
    },
    exportToExcel () {
      let data = this.dataPhone.map(dp => ({'FaceBook ID': dp.uid, 'Phone': dp.phone}))

      let ws = XLSX.utils.json_to_sheet(data)

      let wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'People')

      XLSX.writeFile(wb, 'listphone.xlsx')
    }
    // startInterval () {
    //   var ref = this
    //   setInterval(ref.findPhone(), 20000)
    // }
  }
}
</script>
