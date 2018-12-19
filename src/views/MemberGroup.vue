<template>
  <div class="panel">
    <div class="panel-heading">
      <h3 class="panel-title">Quét UID Live Stream</h3>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="form-group">
          <div class="col-lg-12" style="padding-left: 80px; padding-right: 80px">
            <label class=" control-label" for="demo-is-inputsmall"><strong>Nhập Group ID ở đây: </strong></label>
            <br>
            <textarea style="width:100%" name="message" rows="5" placeholder="Ví dụ: 1000009128473945" v-model="groupid"></textarea>
          </div>
          <div class="col-lg-6" style="padding-left: 80px">
            <input id="btn-submit" class="btn btn-info" type="submit" value="Run application" @click='getMember()' />
          </div>
          <div class="col-lg-6">
            <button class="btn btn-primary" @click="exportToExcel">Save Excel</button>
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
  name: 'MemberGroup',
  data: function () {
    return {
      groupid: '',
      results: [],
      token: 'EAAAAUaZA8jlABANzDgyfJmAlQ7HutjAyM2ewsZAUKWnal1Aa9ZAfmY8MmsGQh5N1Y6KE4oFMZBKvqmRRLAd4hXYwEWkMRETFMWTFaZBv3YkM8kQ8MT5BV0k0IWGhDlIbomPQ4J6Bw8R3AWViTH1L900DAXIn3KHe6tsuiUJdGPS4jt24V6CJX',
      listID: []
    }
  },
  methods: {
    getMember () {
      var ref = this
      this.results = []
      this.listID = []
      // var num = 0
      if (!this.groupid) {
        alert('Vui lòng nhập thông tin vào ô UID Facebook')
        return
      }

      this.results = this.groupid.split('\n')
      this.results.forEach(function (item, index) {
        axios({
          method: 'GET',
          url: 'https://graph.facebook.com/' + item + '?fields=members.limit(1000){id}&access_token=' + ref.token,
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(response => {
          if (response.data.members.paging.next) {
            ref.dequy(response.data.members.paging.next)
          }
          // var resultsLength = response.data.members.data.length
          response.data.members.data.forEach(function (item1, index1) {
            // num++
            var obj = {}
            obj.id = item1.id
            ref.listID.push(obj)

            // if (num === resultsLength) {
            //   if (response.data.members.paging.next) {
            //     ref.dequy(response.data.members.paging.next)
            //   }
            // }
          })
        })
      })
    },
    dequy (urlnextpage) {
      var ref = this
      var num = 0
      axios({
        method: 'GET',
        url: urlnextpage,
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        var resultsLength = response.data.data.length
        response.data.data.forEach(function (item1, index1) {
          num++
          var obj = {}
          obj.id = item1.id
          ref.listID.push(obj)
          if (num === resultsLength) {
            if (response.data.paging.next) {
              console.log(ref.listID.length)
              ref.dequy(response.data.paging.next)
              console.log('vẫn phải dệ quy phát nữa ông ạ')
            } else {
              console.log('Đã quét xong member của group này rồi nha!!!!!')
            }
          }
        })
      })
    },
    exportToExcel () {
      let data = this.listID.map(li => ({'FaceBook ID': li.id}))

      let ws = XLSX.utils.json_to_sheet(data)

      let wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'People')

      XLSX.writeFile(wb, 'idmembergroup.xlsx')
    }

  }
}
</script>
