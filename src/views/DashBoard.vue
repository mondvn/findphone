<template>
  <div id="page-content">
    <div class="panel">
      <div class="panel-heading">
        <h3 class="panel-title">DashBoard</h3>
      </div>
      <div class="panel-body">
        <!--Tiles - Bright Version-->
        <!--===================================================-->
        <div class="row">
          <div class="col-sm-6 col-lg-3">
            <div class="panel media pad-all">
              <div class="media-left">
                <span class="icon-wrap icon-wrap-sm icon-circle bg-success">
                <i class="fa fa-user fa-2x"></i>
                </span>
              </div>

              <div class="media-body">
                <p class="text-2x mar-no text-thin">{{this.$session.get('point')}}</p>
                <p class="text-muted mar-no">Tổng Số point</p>
              </div>
            </div>
          </div>
          <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->

          <!--New Order-->
          <div class="col-sm-6 col-lg-3">
            <div class="panel media pad-all">
              <div class="media-left">
                <span class="icon-wrap icon-wrap-sm icon-circle bg-info">
                <i class="fa fa-shopping-cart fa-2x"></i>
                </span>
              </div>

              <div class="media-body">
                <p class="text-2x mar-no text-thin"></p>
                <p class="text-muted mar-no"></p>
              </div>
            </div>
          </div>
          <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->

          <!--Sales-->
          <div class="col-sm-6 col-lg-3">
            <div class="panel media pad-all">
              <div class="media-left">
                <span class="icon-wrap icon-wrap-sm icon-circle bg-danger">
                <i class="fa fa-dollar fa-2x"></i>
                </span>
              </div>

              <div class="media-body">
                <p class="text-2x mar-no text-thin"></p>
                <p class="text-muted mar-no"></p>
              </div>
            </div>
          </div>
          <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->

          <!--Comments-->
          <div class="col-sm-6 col-lg-3">
            <div class="panel media pad-all">
              <div class="media-left">
                <span class="icon-wrap icon-wrap-sm icon-circle bg-warning">
                <i class="fa fa-comment fa-2x"></i>
                </span>
              </div>

              <div class="media-body">
                <p class="text-2x mar-no text-thin"></p>
                <p class="text-muted mar-no"></p>
              </div>
            </div>
          </div>
          <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
        </div>
        <!--===================================================-->
        <!--End Tiles - Bright Version-->
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DashBoard'
}
</script>
