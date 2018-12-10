<template>
  <div id="page-content">
    <div class="panel">
      <div class="panel-heading">
        <h3 class="panel-title">Đổi mật khẩu</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="form-group col-lg-12" style="padding-left: 15%">
            <label class="col-lg-3 control-label" for="demo-is-inputsmall">Mật khẩu cũ</label>
            <div class="col-lg-6">
              <input type="text" class="form-control input-sm" name="oldPass" placeholder="Mật khẩu cũ" v-model="oldPass">
            </div>
          </div>
          <div class="form-group col-lg-12" style="padding-left: 15%">
            <label for="demo-is-inputnormal" class="col-lg-3 control-label">Mật khẩu mới</label>
            <div class="col-lg-6">
              <input type="text" class="form-control" name="newPass" placeholder="Mật khẩu mới" v-model="newPass">
            </div>
          </div>
          <div class="form-group col-lg-12" style="padding-left: 15%">
            <label for="demo-is-inputlarge" class="col-lg-3 control-label">Xác nhận lại mật khẩu</label>
            <div class="col-lg-6">
              <input type="text" class="form-control" name="confirmPass" placeholder="Nhập lại mật khẩu mới" v-model="confirmPass">
            </div>
          </div>
        </div>
      </div>
      <div class="panel-footer">
        <div class="row" style="padding-left: 15%">
          <div class="col-sm-9 col-sm-offset-3">
            <button class="btn btn-info btn-labeled fa fa-user fa-lg" type="submit" @click='changePass()'>
              Lưu
            </button>
            <button class="btn btn-warning btn-labeled fa fa-repeat fa-lg" type="reset" @click='resetAll()'>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data () {
    return {
      oldPass: '',
      newPass: '',
      confirmPass: ''
    }
  },
  methods: {
    changePass () {
      if (!this.oldPass) {
        alert('Vui lòng điền mật khẩu cũ')
      } else
      if (!this.newPass) {
        alert('Vui lòng điền mật khẩu mới')
      } else
      if (!this.confirmPass) {
        alert('Vui lòng điền vào ô xác nhận mật khẩu mới')
      } else
      if (this.newPass !== this.confirmPass) {
        alert('Mật khẩu mới và xác nhận mật khẩu phải trùng nhau')
      }
    },
    resetAll () {
      this.oldPass = ''
      this.newPass = ''
      this.confirmPass = ''
    }
  }
}
</script>

<style scoped>
  label {
    padding-top:5px;
    font-weight: bold;
    color: #3b5998;
  }
</style>
