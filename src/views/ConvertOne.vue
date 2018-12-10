<template>
  <div id="page-content">
    <div class="panel">
      <div class="panel-heading">
          <h3 class="panel-title">Chuyển đổi Facebook UID qua số điện thoại</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="form-group">
            <div class="col-lg-12" style="padding-left: 50px; padding-right: 50px">
              <label class=" control-label" for="demo-is-inputsmall"><strong>Nhập UID Facebook tại đây:</strong></label>
              <br>
              <input type="text" style="width:100%" name="message" rows="9" placeholder="Ví dụ: 100006731940695" v-model="fbUID"  >
            </div>
            <div class="col-lg-12" style="padding-left: 50px">
              <input id="btn-submit" class="btn btn-info" type="submit" value="Lấy Số Điện Thoại" @click='getPhoneNumber()' />
            </div>
            <div class="col-lg-12" style="padding-right: 50px; padding-left: 50px">
              <label class=" control-label" for="demo-is-inputsmall"><strong>Số điện thoại bạn cần tìm:</strong></label>
              <br>
              <textarea style="width:100%" name="message" rows="4" v-model="phoneNumber"></textarea>
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
  name: 'ConvertOne',
  data () {
    return {
      fbUID: '',
      phoneNumber: '',
      previousArrow: '<------------------'
    }
  },
  methods: {
    getPhoneNumber () {
      if (!this.fbUID) {
        alert('Vui lòng không bỏ trống ô nhập facebook UID')
        return
      }
      if (this.$session.get('point') < 1) {
        alert('Bạn không đủ point để thực hiện')
        return
      }
      if (this.fbUID.length > 15) {
        alert('Vui lòng nhập đúng định dạng facebook UID')
        return
      }

      var token = this.$session.get('token')
      axios({
        method: 'POST',
        // url: 'http://sayfb.com/api.php',
        url: '/api.php',
        data: 'listNumber=' + this.fbUID + '&action=convert1' + '&token=' + token,
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })
        .then(response => {
          if (response.statusText !== 'OK') {
            alert('There is no user with that id')
            return false
          } else {
            this.phoneNumber = response.data.list_phone[0].phone
          }
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
