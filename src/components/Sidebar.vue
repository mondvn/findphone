<template>
    <!--MAIN NAVIGATION-->
    <!--===================================================-->
    <nav id="mainnav-container">
        <div id="mainnav">
            <!--Shortcut buttons-->
            <!--================================-->
        <!-- <div id="mainnav-shortcut">
            <ul class="list-unstyled">
                <li class="col-xs-4" data-content="Additional Sidebar">
                    <a id="demo-toggle-aside" class="shortcut-grid" href="#">
                        <i class="fa fa-magic"></i>
                    </a>
                </li>
                <li class="col-xs-4" data-content="Notification">
                    <a id="demo-alert" class="shortcut-grid" href="#">
                        <i class="fa fa-bullhorn"></i>
                    </a>
                </li>
                <li class="col-xs-4" data-content="Page Alerts">
                    <a id="demo-page-alert" class="shortcut-grid" href="#">
                        <i class="fa fa-bell"></i>
                    </a>
                </li>
            </ul>
        </div> -->
            <!--================================-->
            <!--End shortcut buttons-->
            <!--Menu-->
            <!--================================-->
            <div id="mainnav-menu-wrap">
                <div class="nano">
                    <div class="nano-content">
                        <ul id="mainnav-menu" class="list-group">

                            <!--Category name-->
                            <!-- <li class="list-header">Navigation</li> -->

                            <!--Menu list item-->
                            <li>
                                <router-link to="/dashboard">
                                    <i class="fa fa-home"></i>
                                    <span class="menu-title">
                                        <strong>Trang chủ</strong>
                                        <!-- <span class="label label-success pull-right">Top</span> -->
                                    </span>
                                </router-link>
                            </li>

                            <!--Menu list item-->
                            <!-- <li>
                                <a href="#">
                                    <i class="fa fa-flask"></i>
                                    <span class="menu-title">
                                        <strong>Lấy SĐT từ UID FB</strong>
                                    </span>
                                    <i class="arrow"></i>
                                </a>

                                <ul class="collapse">
                                    <li>
                                        <router-link v-bind:to="'/convert-uid/convert'">Lấy từ nhiều UID FB</router-link>
                                    </li>
                                    <li>
                                        <router-link v-bind:to="'/convert-uid/convert-one'">Lấy từ 1 UID FB</router-link>
                                    </li>
                                    <li>
                                        <router-link v-bind:to="'/convert-uid/history'">Lịch Sử</router-link>
                                    </li>
                                    <li class="list-divider"></li>
                                </ul>
                            </li> -->
                            <!-- <li>
                                <router-link v-bind:to="'/get-uid'">
                                   <i class="fa fa-edit"></i>
                                    <span class="menu-title">
                                        <strong>Lấy UID FB từ URL</strong>
                                    </span>
                                    <i class="arrow"></i>
                                </router-link>
                            </li> -->
                            <!-- <li>
                                <router-link v-bind:to="'/payment'">
                                   <i class="fa fa-dollar"></i>
                                    <span class="menu-title">
                                        <strong>Bảng giá và gia hạn</strong>
                                    </span>
                                    <i class="arrow"></i>
                                </router-link>
                            </li> -->
                            <li>
                                <router-link v-bind:to="'/live-stream'">
                                   <i class="fa fa-dollar"></i>
                                    <span class="menu-title">
                                        <strong>LiveStream</strong>
                                    </span>
                                    <i class="arrow"></i>
                                </router-link>
                            </li>
                             <li>
                                <router-link v-bind:to="'/find-post-image'">
                                   <i class="fa fa-dollar"></i>
                                    <span class="menu-title">
                                        <strong>Find Post Image</strong>
                                    </span>
                                    <i class="arrow"></i>
                                </router-link>
                            </li>
                            <!-- <li>
                                <router-link v-bind:to="'/member-group'">
                                   <i class="fa fa-dollar"></i>
                                    <span class="menu-title">
                                        <strong>Quét Member Group</strong>
                                    </span>
                                    <i class="arrow"></i>
                                </router-link>
                            </li> -->
                            <!-- <li>
                                <router-link v-bind:to="'/find-livestreamer'">
                                   <i class="fa fa-dollar"></i>
                                    <span class="menu-title">
                                        <strong>Find LiveStreamer</strong>
                                    </span>
                                    <i class="arrow"></i>
                                </router-link>
                            </li> -->
                        </ul>
                        <div class="mainnav-widget">

                            <!-- Show the button on collapsed navigation -->
                            <div class="show-small">
                                <a href="#" data-toggle="menu-widget" data-target="#demo-wg-server">
                                    <i class="fa fa-desktop"></i>
                                </a>
                            </div>

                            <!-- Hide the content on collapsed navigation -->
                                <div id="demo-wg-server" class="hide-small mainnav-widget-content">
                                <ul class="list-group">
                                    <li class="pad-ver"><a v-on:click="logout()" class="btn btn-success btn-bock">Log Out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--================================-->
            <!--End menu-->
        </div>
    </nav>
    <!--===================================================-->
    <!--END MAIN NAVIGATION-->
</template>
<script>
export default {
  name: 'Sidebar',
  methods: {
    logout: function () {
      this.$session.destroy()
      this.$router.push('/login')
    }
  }
}
</script>
