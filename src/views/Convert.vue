<template>
  <div id="page-content">
    <div class="panel">
      <div class="panel-heading">
        <h3 class="panel-title">Chuyển đổi Facebook UID qua số điện thoại</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="form-group">
              <div class="col-sm-6">
                  <vue-xlsx-table @on-select-file="handleSelectedFile" class="btn btn-block" id="btnExcel">Upload excel file</vue-xlsx-table>
              </div>
              <div class="col-sm-6">
                <text-reader @load="onLoadTextFile($event)"></text-reader>
              </div>
            <div class="col-lg-12">
                  <label class=" control-label" for="demo-is-inputsmall"><strong>Nhập FacebookUID tại đây:</strong></label>
                  <br>
                  <textarea style="width:100%" name="message" rows="5" placeholder="Nhập facebookUID tại đây" v-model="fbID" ></textarea>
            </div>
            <div class="col-lg-6">
              <input id="btnConvert" :disabled="submitted" class="btn btn-primary btn-block" type="submit" value="Start Convert" @click='convertUid()' />
            </div>
            <div class="col-lg-6">
                <button class="btn btn-primary btn-labeled btn-block" @click="refresh()">Remove/ Refresh</button>
            </div>
            <div class="row">
              <div class="col-sm-6 col-lg-3">
                <div class="panel media pad-all">
                  <div class="media-left">
                    <span class="icon-wrap icon-wrap-sm icon-circle bg-success">
                      <i class="fa fa-phone fa-2x"></i>
                    </span>
                  </div>

                  <div class="media-body">
                    <p class="text-2x mar-no text-thin">{{totalUID}}</p>
                    <p class="text-muted mar-no">Tổng UID:</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-lg-3">
                <div class="panel media pad-all">
                  <div class="media-left">
                    <span class="icon-wrap icon-wrap-sm icon-circle bg-info">
                      <i class="fa fa-star fa-2x"></i>
                    </span>
                  </div>

                  <div class="media-body">
                    <p class="text-2x mar-no text-thin">{{convertCompleted}}</p>
                    <p class="text-muted mar-no">Tổng UID Tìm Thấy: </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-lg-3">
                <div class="panel media pad-all">
                  <div class="media-left">
                    <span class="icon-wrap icon-wrap-sm icon-circle bg-danger">
                      <i class="fa fa-exclamation-triangle fa-2x"></i>
                    </span>
                  </div>

                  <div class="media-body">
                    <p class="text-2x mar-no text-thin">{{convertfail}}</p>
                    <p class="text-muted mar-no">Tổng UID Không Tìm Thấy: </p>
                    <!-- {{ point }} -->
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-lg-3">
                <div class="panel media pad-all">
                  <div class="media-left">
                    <span class="icon-wrap icon-wrap-sm icon-circle bg-purple">
                      <i class="fa fa-percent fa-2x"></i>
                    </span>
                  </div>

                  <div class="media-body">
                    <p class="text-2x mar-no text-thin">{{converPercent}}%</p>
                    <p class="text-muted mar-no">Tỉ Lệ Thành Công: </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
                <button class="btn btn-primary btn-block" @click="exportToExcel">Save Excel</button>
            </div>
          </div>
        </div>
        <!-- <table  id="demo-foo-filtering" class="table table-bordered table-hover toggle-circle dislay">
          <thead>
            <tr>
              <th data-toggle="true">STT</th>
              <th data-toggle="true">Facebook UID</th>
              <th data-hide="phone, tablet">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.uid">
              <td id="count"></td>
              <td>{{user.uid}}</td>
              <td>{{user.phone}}</td>
            </tr>
          </tbody>
        </table> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TextReader from './TextReader'
const XLSX = require('xlsx')

export default {
  name: 'Convert',
  data: function () {
    return {
      users: [],
      elmt: '',
      fd: [],
      arrList: [],
      message: '',
      fbID: null,
      results: [],
      totalUID: 0,
      convertCompleted: 0,
      convertfail: 0,
      converPercent: 0,
      point: this.$session.get('point'),
      submitted: false
    }
  },
  components: {
    'text-reader': TextReader
  },
  mounted () {
  },
  methods: {
    handleSelectedFile (convertedData) {
      this.fbID = convertedData.body.map(item => item.facebookid).join('\n')
    },
    convertUid () {
      this.users = []
      this.results = []
      this.convertCompleted = 0
      this.convertfail = 0
      this.converPercent = 0

      if (!this.fbID) {
        alert('Vui Lòng không để trống ô nhập Facebook UID')
        return
      }
      var ref = this
      const fbIDArr = this.fbID.split('\n')
      this.totalUID = fbIDArr.length
      this.results = this.chunkArray(fbIDArr, 1000)
      var num = 0
      var cc = 0
      var time = Date.now()
      var rlen = this.results.length
      var token = this.$session.get('token')
      var email = this.$session.get('email')

      if (this.$session.get('point') < this.totalUID) {
        alert('Số coin bạn hiện có ít hơn số UID bạn nhập vào. Vui lòng nạp thêm')
        return
      }

      this.submitted = true

      this.results.forEach(function (item, index) {
        axios({
          method: 'POST',
          // url: 'http://sayfb.com/api.php',
          url: '/api.php',
          data: 'listNumber=' + item.join() + '&time=' + time + '&action=convert' + '&token=' + token + '&email=' + email,
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })
          .then(response => {
            if (response.statusText !== 'OK') {
              alert('There is no user with that id')
              return false
            } else {
              cc += response.data.list_phone.length
              response.data.list_phone.forEach(emotion => ref.users.push(emotion))
            }
            num++
            if (num === rlen) {
              ref.convertCompleted = cc
              ref.convertfail = ref.totalUID - ref.convertCompleted
              ref.converPercent = ((ref.convertCompleted / ref.totalUID) * 100).toFixed(2)
              ref.submitted = false
              axios({
                method: 'POST',
                // url: 'http://sayfb.com/api.php',
                url: '/api.php',
                data: 'token=' + token + '&action=getpoint',
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
              }).then(result => {
                if (result.data.status === false) {
                } else {
                  ref.$session.set('point', result.data.point)
                  ref.point = ref.$session.get('point')
                  ref.$root.$emit('myEvent', ref.point)
                }
              }, error => {
                console.error(error)
              })
            }
          })
      })
    },
    chunkArray (myArray, chunkSize) {
      while (myArray.length) {
        this.results.push(myArray.splice(0, chunkSize))
      }
      return this.results
    },
    onLoadTextFile ($event) {
      this.fbID = $event.filter((item, index) => index % 2 === 0).join('\n')
    },
    exportToExcel () {
      let data = this.users.map(user => ({'FaceBook ID': user.uid, 'Phone': user.phone}))

      let ws = XLSX.utils.json_to_sheet(data)

      let wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'People')

      XLSX.writeFile(wb, 'sheetjs.xlsx')
    },
    refresh () {
      this.users = []
      this.results = []
      this.convertCompleted = 0
      this.convertfail = 0
      this.fbID = null
      this.converPercent = 0
      this.totalUID = 0
      this.submitted = false
    }
  }
}
</script>

<style scoped>
  tbody {
    counter-reset: section;
  }

  #count::before {
    counter-increment: section;
    content: counter(section);
  }

  #btnExcel {
    background-color: #20a0ff;
    margin-bottom: 15px;
  }

  #btnConvert {
    /* margin-bottom: 15px; */
    /* margin-top: 15px; */
  }

  #demo-foo-filtering {
    margin-top: 30px;
  }
</style>
