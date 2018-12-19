<template>
    <header id="navbar">
        <div id="navbar-container" class="boxed">

            <!--Brand logo & name-->
            <!--================================-->
            <div class="navbar-header">
    <router-link to="/" class="navbar-brand">
        <div class="brand-title" style="padding-left: 10px;padding-right: 10px;">
            <img src="http://sayfb.com/fav.png">
            <!-- <img src="/fav.png"> -->

            <span >Ninja LiveStream</span>
        </div>
    </router-link>
</div>
            <!--================================-->
            <!--End brand logo & name-->
            <!--Navbar Dropdown-->
            <!--================================-->
            <div class="navbar-content clearfix">
                <ul class="nav navbar-top-links pull-left">

                    <!--Navigation toogle button-->
                    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                    <li class="tgl-menu-btn">
                        <a class="mainnav-toggle" href="#">
                            <i class="fa fa-navicon fa-lg"></i>
                        </a>
                    </li>
                    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                    <!--End Navigation toogle button-->

                </ul>
                <ul class="nav navbar-top-links pull-right">
                    <!--User dropdown-->
                    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                    <li id="dropdown-user" class="dropdown">
                        <a href="#" data-toggle="dropdown" class="dropdown-toggle text-right">
                            <span class="pull-right">
                                <img class="img-circle img-user media-object" src="../../static/img/user.png" alt="Profile Picture">
                            </span>
                            <div class="username hidden-xs">{{this.$session.get('name')}}</div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-md dropdown-menu-right with-arrow panel-default">

                            <!-- Dropdown heading  -->
                            <div class="pad-all bord-btm">
                                <p class="text-lg text-muted text-thin mar-btm">Tổng Số Point: {{ point }}</p>
                                <!-- <div class="progress progress-sm">
                                    <div class="progress-bar" style="width: 0%;">
                                        <span class="sr-only">0%</span>
                                    </div>
                                </div> -->
                            </div>
                            <!-- User dropdown menu -->
                            <!-- <ul class="head-list">
                                <li>
                                    <a href="#">
                                        <span class="badge badge-danger pull-right">9</span>
                                        <i class="fa fa-envelope fa-fw fa-lg"></i> Hỗ trợ
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-question-circle fa-fw fa-lg"></i> Hướng dẫn
                                    </a>
                                </li>
                            </ul> -->
                                <a href="http://ninjateam.vn/" style="padding-left: 10px">
                                    <i class="fa fa-user fa-fw fa-lg"></i>
                                    Đổi Mật Khẩu
                                </a>
                            <!-- Dropdown footer -->
                            <div class="pad-all text-right">
                                <a v-on:click="logout()" class="btn btn-primary">
                                    <i class="fa fa-sign-out fa-fw"></i> Đăng xuất
                                </a>
                            </div>
                        </div>
                    </li>
                    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                    <!--End user dropdown-->
                </ul>
            </div>
            <!--================================-->
            <!--End Navbar Dropdown-->
        </div>
    </header>
</template>
<script>

export default {
  name: 'Headers',
  data () {
    return {
      point: this.$session.get('point'),
      pointFromConvert: ''
    }
  },
  mounted () {
    this.$root.$on('myEvent', (text) => { // here you need to use the arrow function
      this.point = text
    })
  },
  methods: {
    logout: function () {
      this.$session.destroy()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
img {
        /* float: left; */
        /* height: 32px; */
    }
/* .navbar-header::before {
    height: 70px;
    background-color: white;
} */
</style>
