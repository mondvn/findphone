<template>
  <div id='container' class='effect mainnav-lg' v-if='this.$session.exists()'>
    <Headers v-bind:point="appName"></Headers>
    <div class='boxed'>
      <div id='content-container'>
        <!-- <PageTitle v-bind:initialTitle="title"></PageTitle> -->
        <router-view />
        </div>
      <Sidebar></Sidebar>
    </div>
    <Footerns></Footerns>
    <button id="scroll-top" class="btn"><i class="fa fa-chevron-up"></i></button>
  </div>
  <div v-else>
    <div id="container" class="cls-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Headers from '@/components/Header'
import Footerns from '@/components/Footerns'
import PageTitle from '@/components/PageTitle'
// import axios from 'axios'

export default {
  name: 'App',
  components: {
    'Sidebar': Sidebar,
    'Headers': Headers,
    'Footerns': Footerns,
    'PageTitle': PageTitle
  },
  data () {
    return {
      name: '',
      title: 'DashBoard'
    }
  },
  mounted () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
    // } else {
    //   axios({
    //     method: 'POST',
    //     // url: '/api.php',
    //     url: 'http://sayfb.com/api.php',
    //     data: 'token=' + this.$session.get('token') + '&action=getpoint',
    //     headers: { 'content-type': 'application/x-www-form-urlencoded' }
    //   }).then(result => {
    //     if (result.data.status === false) {
    //       alert('Đăng nhập hết hạn')
    //       this.$session.destroy()
    //       this.$router.push('/login')
    //     } else {
    //     }
    //   }, error => {
    //     console.error(error)
    //   })
    // }
    // this.$router.push('/live-stream')
    // location.reload()

    const plugin = document.createElement('script')
    plugin.setAttribute(
      'src',
      '../../static/js/nifty.min.js'
    )
    plugin.async = true
    document.head.appendChild(plugin)
  }
}
</script>
