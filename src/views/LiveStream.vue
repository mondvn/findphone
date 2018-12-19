<template>
  <div class="panel">
    <div class="panel-heading">
      <h3 class="panel-title">Quét UID Live Stream</h3>
    </div>
    <div class="panel-body">
        <div class="row">
          <div class="form-group">
            <div class="col-lg-12">
              <div class="col-lg-12" style="padding-left: 80px; padding-right: 80px">
                <label class=" control-label" for="demo-is-inputsmall"><strong>Nhập Facebook UID tại đây:</strong></label>
                <br>
                <textarea style="width:100%" name="message" rows="5" placeholder="Ví dụ: 1000009128473945" v-model="facebokuid"></textarea>
              </div>
              <div class="col-lg-12" style="padding-left: 80px">
                <input id="btn-submit" class="btn btn-info" type="submit" value="Run application" @click='getPost()' />
              </div>
            </div>
            <!-- <div class="col-lg-6">
              <div class="col-lg-12" style="padding-left: 80px; padding-right: 80px">
                <label class=" control-label" for="demo-is-inputsmall"><strong>Thêm Facebook UID mới tại đây:</strong></label>
                <br>
                <textarea style="width:100%" name="message" rows="5" placeholder="Ví dụ: 1000009128473945" v-model="facebookuid1"></textarea>
              </div>
              <div class="col-lg-12" style="padding-left: 80px">
                <input id="btn-submit" class="btn btn-info" type="submit" value="Add more UID" @click='addPost()' />
              </div>
            </div> -->
            <!-- <div class="col-lg-12" style="padding-right: 80px; padding-left: 80px">
              <textarea style="width:100%" name="message" rows="5" v-model="listIdPost"></textarea>
            </div>
            <div class="col-lg-12" style="padding-left: 80px">
              <input id="btn-submit" class="btn btn-info" type="submit" value="Find Phone" @click='findPhone()' />
            </div> -->
            <div class="col-lg-3">
              <br>
              <br>
              <button class="btn btn-primary btn-block" @click="exportToExcel">Save Excel</button>
            </div>
            <div class="col-lg-12">
              <br>
              <div class="col-lg-6">
                <span>Tổng Số Post Live Stream: {{totalPostLiveSteam}}</span>
              </div>
              <div class="col-lg-6">
                <span>Tổng Số Điện Thoại Quét Được: {{totalPhoneNumber}}</span>
              </div>
              <br>
              <textarea style="width:100%" name="message" rows="12" v-model="logs"></textarea>
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
      newestTimeStampComment: 0,
      facebookuid1: '',
      result1: [],
      arrIdPostLiveStream1: [],
      firstGetPost: null,
      auto: null,
      autoCheckLiveStream: null,
      logs: [],
      totalPhoneNumber: 0,
      totalPostLiveSteam: 0,
      rPhoneList: []
    }
  },
  methods: {
    addPost () {
      var ref = this
      clearInterval(ref.auto)
      clearInterval(ref.checkLiveStream)
      this.results1 = []
      this.arrIdPostLiveStream1 = []
      if (!this.facebookuid1) {
        alert('Vui lòng nhập thông tin vào ô UID Facebook')
        return
      }
      this.results1 = this.facebookuid1.split('\n')
      var num = 0
      var resultsLength1 = this.results1.length
      var totalPostAdded = 0
      this.results1.forEach(function (item6, index6) {
        axios({
          method: 'GET',
          url: 'https://graph.facebook.com/' + item6 + '/posts?limit=5&access_token=' + ref.token,
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(response => {
          ref.data = response.data.data
          num++
          response.data.data.forEach(function (item5, index5) {
            if (item5.story && item5.story.indexOf('is live now') !== -1) {
              var obj = {}
              obj.id = item5.id
              obj.newestTimeStampComment = 0
              obj.checkFirstTime = true
              ref.arrIdPostLiveStream.push(obj)
              totalPostAdded++
            }
          })
          if (num === resultsLength1) {
            console.log('Có tổng cộng: ' + totalPostAdded + ' Post Live Stream được thêm vào')
            ref.logs.push('Có tổng cộng: ' + totalPostAdded + ' Post Live Stream được thêm vào \n')
            ref.totalPostLiveSteam = ref.arrIdPostLiveStream.length
            ref.auto = setInterval(() => {
              ref.findPhone()
            }, 30000)
            ref.autoCheckLiveStream = setInterval(() => {
              ref.checkLiveStream()
            }, 300000)
          }
        })
      })
    },
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
          response.data.data.forEach(function (item4, index4) {
            if (item4.story && item4.story.indexOf('is live now') !== -1) {
              var obj = {}
              obj.id = item4.id
              obj.newestTimeStampComment = 0
              obj.checkFirstTime = true
              ref.arrIdPostLiveStream.push(obj)
            }
          })
          if (num === resultsLength) {
            console.log('Có tổng cộng: ' + ref.arrIdPostLiveStream.length + ' Post Live Stream')
            ref.logs.push('Có tổng cộng: ' + ref.arrIdPostLiveStream.length + ' Post Live Stream \n')
            ref.totalPostLiveSteam = ref.arrIdPostLiveStream.length
            ref.firstGetPost = setTimeout(() => {
              ref.findPhone()
            }, 5000)
          }
        })
      })
    },
    findPhone () {
      var ref = this
      var bigNum = 0
      var arrIdPostLiveStreamLength = this.arrIdPostLiveStream.length
      this.arrIdPostLiveStream.forEach(function (item, index) {
        if (item.checkFirstTime === true) {
          item.checkFirstTime = false
          axios({
            methods: 'GET',
            url: 'https://graph.facebook.com/' + item.id + '/comments?limit=5000&order=reverse_chronological&access_token=' + ref.token,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
          }).then(response => {
            if (response.data.data.length === 0) {
              bigNum++
              console.log('Xóa uid khóa cmt không xem đươc: ' + item.id)
              ref.logs.push('Xóa uid khóa cmt không xem đươc: ' + item.id + '\n')
              ref.arrIdPostLiveStream.splice(index, 1)
              ref.totalPostLiveSteam = ref.arrIdPostLiveStream.length
            } else if (response.data.data.length !== 0) {
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
                  if (numGet !== 0) {
                    console.log(item.id + ' lần 1 lấy được số điện thoại: ' + numGet)
                    ref.logs.push(item.id + ' lần 1 lấy được số điện thoại: ' + numGet + '\n')
                  }
                  ref.totalPhoneNumber = ref.totalPhoneNumber + numGet
                  bigNum++
                  if (bigNum === arrIdPostLiveStreamLength) {
                    ref.autoCheckLiveStream = setInterval(() => {
                      ref.checkLiveStream()
                    }, 300000)
                    ref.pushDatatoServer()
                  }
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
                  if (numGet !== 0) {
                    console.log(item.id + ' lấy được thêm số điện thoại: ' + numGet)
                    ref.logs.push(item.id + ' lấy được thêm số điện thoại: ' + numGet + '\n')
                  }
                  ref.totalPhoneNumber = ref.totalPhoneNumber + numGet
                }
              })
            }
          })
            .catch((error) => {
              // Error
              ref.logs.push('Có lỗi xảy ra, có vẻ là do Page xóa post live stream hoặc mất mạng!!!! \n')
              ref.arrIdPostLiveStream.splice(index, 1)
              ref.totalPostLiveSteam = ref.arrIdPostLiveStream.length
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request)
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message)
              }
              console.log(error.config)
            })
        }
      })
    },
    checkLiveStream () {
      var ref = this
      console.log('Check livesteam còn sống không phát!!!')
      ref.logs.push('Check livesteam còn sống không phát!!! \n')
      clearInterval(this.auto)
      var num = 0
      var rlen = this.arrIdPostLiveStream.length
      this.arrIdPostLiveStream.forEach(function (item7, index7) {
        num++
        axios({
          methods: 'GET',
          url: 'https://graph.facebook.com/' + item7.id + '?fields=story&access_token=' + ref.token,
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(response => {
          if (response.data.story.indexOf('is live now') === -1) {
            ref.arrIdPostLiveStream.splice(index7, 1)
            console.log('Xóa thành công thằng không livestream nữa' + item7.id)
            ref.logs.push('Xóa thành công thằng không livestream nữa' + item7.id + ' \n')
            ref.totalPostLiveSteam = ref.arrIdPostLiveStream.length
          }
        })
        if (num === rlen) {
          ref.pushDatatoServer()
        }
      })
    },
    pushDatatoServer () {
      var ref = this
      this.rPhoneList = []
      this.rPhoneList = this.chunkArray(this.dataPhone, 20)
      var num = 0
      var totalPhone = 0
      var rPhoneListLength = this.rPhoneList.length
      this.rPhoneList.forEach(function (item, index) {
        axios({
          method: 'POST',
          url: 'http://sayfb.com/api.php',
          data: 'listData=' + JSON.stringify(item) + '&action=pushdata',
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })
          .then(response => {
            num++
            totalPhone += response.data.length
            if (num === rPhoneListLength) {
              ref.logs.push('Vừa thêm đươc: ' + totalPhone + ' số điện thoại vào data server\n')
              ref.auto = setInterval(() => {
                ref.findPhone()
              }, 30000)
              ref.dataPhone = []
            }
          })
      })
    },
    exportToExcel () {
      let data = this.dataPhone.map(dp => ({'facebookid': dp.uid, 'Phone': dp.phone}))

      let ws = XLSX.utils.json_to_sheet(data)

      let wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'People')

      XLSX.writeFile(wb, 'listphone.xlsx')
    },
    chunkArray (myArray, chunkSize) {
      var results11 = []
      while (myArray.length) {
        results11.push(myArray.splice(0, chunkSize))
      }
      return results11
    }
  }
}
</script>
