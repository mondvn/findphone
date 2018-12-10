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
      totalComments: 0,
      newestTimeStampComment: 0
    }
  },
  methods: {
    getPost () {
      this.results = []

      if (!this.facebokuid) {
        alert('Vui lòng nhập thông tin vào ô UID Facebook')
        return
      }

      var ref = this
      this.results = this.facebokuid.split('\n')

      this.results.forEach(function (item, index) {
        axios({
          method: 'GET',
          url: 'https://graph.facebook.com/' + item + '/posts?access_token=EAAAAUaZA8jlABAH1BwoxVZAXY6NvjvSQAgr53PmLDjl8SQ0q3Gj4HPDfa1BTh34QWKGALcVGafsUv8bnYSsreEalOX5A5kSvS4yQhqmY7Uxfzv9FjrZARTDZCbDoInyslmcdTZCNmCyfAtzLneO8Tc6XRJJAarNfyL800K48lJQZDZD',
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(response => {
          ref.data = response.data.data
          ref.data.forEach(function (item, index) {
            if (item.story && item.story.indexOf('is live now') !== -1) {
              ref.arrIdPostLiveStream.push(item.id)
              ref.listIdPost = ref.arrIdPostLiveStream.join('\n')
            }
          })
        })
      })
    },
    findPhone () {
      if (!this.listIdPost) {
        alert('Không có post LiveStream nào để quét cả. Vui lòng kiểm tra lại!!!')
        return
      }

      var ref = this

      this.totalComments = 0
      this.dataPhone = []

      if (this.checkFirstTime === true) {
        this.checkFirstTime = false
        this.arrIdPostLiveStream.forEach(function (item, index) {
          axios({
            methods: 'GET',
            url: 'https://graph.facebook.com/' + item + '/comments?limit=1000&order=reverse_chronological&access_token=EAAAAUaZA8jlABAH1BwoxVZAXY6NvjvSQAgr53PmLDjl8SQ0q3Gj4HPDfa1BTh34QWKGALcVGafsUv8bnYSsreEalOX5A5kSvS4yQhqmY7Uxfzv9FjrZARTDZCbDoInyslmcdTZCNmCyfAtzLneO8Tc6XRJJAarNfyL800K48lJQZDZD',
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
          }).then(response => {
            // console.log(response.data.data.length)
            if (response.data.data.length !== 0) {
              // console.log(response.data.data)
              ref.totalComments += response.data.data.length
              console.log(item + 'index nó ở bên này: ' + index)
              response.data.data.forEach(function (item, index) {
                var obj = {}
                // console.log(item)
                var string = item.message.replace(/ |-/gi, '')
                var splitString1 = string.split('.')
                var string1 = splitString1.join('')

                var splitString2 = string1.replace(/o/gi, '')

                const regex = /0[0-9\s.-]{9,9}\b/gi
                var matches = regex.exec(splitString2)
                if (matches) {
                  var replaceNumber = matches[0].replace('0', '84')
                  obj.phone = replaceNumber
                  obj.uid = item.from.id
                  ref.dataPhone.push(obj)
                  // console.log(obj)
                  // console.log(replaceNumber)
                  // console.log(item.from.id)
                  // console.log(ref.totalComments)
                  // console.log(Date.parse(item.created_time) / 1000)
                  var tc = Date.parse(item.created_time) / 1000
                  if (tc > ref.newestTimeStampComment) {
                    ref.newestTimeStampComment = tc
                  }
                }
              })
            }
            // if (typeof response.data.paging.next !== 'undefined') {
            //   console.log('cái này có trang tiếp theo')
            //   console.log(response.data.paging.next)
            // }
          })
        })
      } else {
        this.arrIdPostLiveStream.forEach(function (item, index) {
          axios({
            methods: 'GET',
            url: 'https://graph.facebook.com/' + item + '/comments?limit=50&order=reverse_chronological&access_token=EAAAAUaZA8jlABAH1BwoxVZAXY6NvjvSQAgr53PmLDjl8SQ0q3Gj4HPDfa1BTh34QWKGALcVGafsUv8bnYSsreEalOX5A5kSvS4yQhqmY7Uxfzv9FjrZARTDZCbDoInyslmcdTZCNmCyfAtzLneO8Tc6XRJJAarNfyL800K48lJQZDZD',
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
          }).then(response => {
            if (response.data.data.length !== 0) {
              ref.totalComments += response.data.data.length
              response.data.data.forEach(function (item, index) {
                var checkTC = Date.parse(item.created_time) / 1000
                if (checkTC > ref.newestTimeStampComment) {
                  ref.newestTimeStampComment = checkTC
                  console.log(ref.newestTimeStampComment)
                  var obj = {}
                  var string = item.message.replace(/ |-/gi, '')
                  var splitString1 = string.split('.')
                  var string1 = splitString1.join('')

                  var splitString2 = string1.replace(/o/gi, '')

                  const regex = /0[0-9\s.-]{9,9}\b/gi
                  var matches = regex.exec(splitString2)
                  if (matches) {
                    var replaceNumber = matches[0].replace('0', '84')
                    obj.phone = replaceNumber
                    obj.uid = item.from.id
                    ref.dataPhone.push(obj)
                    console.log(ref.totalComments)
                  }
                }
              })
            }
          })
        })
      }
    },
    exportToExcel () {
      let data = this.dataPhone.map(dp => ({'FaceBook ID': dp.uid, 'Phone': dp.phone}))

      let ws = XLSX.utils.json_to_sheet(data)

      let wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'People')

      XLSX.writeFile(wb, 'listphone.xlsx')
    }
  }
}
</script>
