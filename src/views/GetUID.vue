<template>
  <div id="page-content">
    <div class="panel">
      <div class="panel-heading">
          <h3 class="panel-title">Chuyển đổi URL qua UID</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="form-group">
            <div class="col-lg-12" style="padding-left: 80px; padding-right: 80px">
              <label class=" control-label" for="demo-is-inputsmall"><strong>Nhập Facebook URL tại đây:</strong></label>
              <br>
              <textarea style="width:100%" name="message" rows="5" placeholder="Ví dụ: https://www.facebook.com/ninjateam.page" v-model="link"></textarea>
            </div>
            <div class="col-lg-12" style="padding-left: 80px">
              <input id="btn-submit" class="btn btn-info" type="submit" value="Lấy FaceBook UID" @click='getUID()' />
            </div>
            <table  id="demo-foo-filtering" class="table table-bordered table-hover toggle-circle dislay">
              <thead>
                <tr>
                  <th data-toggle="true">URL</th>
                  <th data-hide="phone, tablet">UID</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="facebokuid in facebokuid" :key="facebokuid.url">
                  <td>{{facebokuid.url}}</td>
                  <td>{{facebokuid.phone}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GetUID',
  data: function () {
    return {
      link: '',
      facebokuid: [],
      results: []
    }
  },
  methods: {
    getUID () {
      this.results = []
      this.facebokuid = []

      if (!this.link) {
        alert('Vui lòng nhập thông tin vào ô UID Facebook')
        return
      }
      var ref = this

      this.results = this.link.split('\n')
      if (this.results.length >= 20) {
        alert('Vui lòng không nhập quá 20 Facebook URL')
        return
      }
      this.results.forEach(function (item, index) {
        var obj = {}
        axios({
          method: 'POST',
          // url: '/api.php',
          url: 'http://sayfb.com/api.php',
          data: 'link=' + item + '&action=getUID',
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(response => {
          if (response.statusText !== 'OK') {
            alert('There is no user with that id')
            return false
          } else {
            obj.url = item
            obj.phone = response.data.share_params[0]
            ref.facebokuid.push(obj)
          }
        })
      })
    }
  }
}
</script>
<style scoped>
  #btn-submit {
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
