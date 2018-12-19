<template>
    <div class="panel">
      <div class="panel-heading">
        <h3 class="panel-title">Tìm Streamer</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="form-group">
            <div class="col-sm-6">
                  <vue-xlsx-table @on-select-file="handleSelectedFile" class="btn">Upload excel file</vue-xlsx-table>
              </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// const XLSX = require('xlsx')
import axios from 'axios'

export default {
  name: 'FindLiveStream',
  data: function () {
    return {
      fbID: null,
      fbIDArr: [],
      token: 'EAAAAUaZA8jlABANzDgyfJmAlQ7HutjAyM2ewsZAUKWnal1Aa9ZAfmY8MmsGQh5N1Y6KE4oFMZBKvqmRRLAd4hXYwEWkMRETFMWTFaZBv3YkM8kQ8MT5BV0k0IWGhDlIbomPQ4J6Bw8R3AWViTH1L900DAXIn3KHe6tsuiUJdGPS4jt24V6CJX',
      result: []
    }
  },
  methods: {
    handleSelectedFile (convertedData) {
      this.fbID = convertedData.body.map(item => item.facebookid).join('\n')
    },
    findStreamer () {
      var ref = this
      this.fbIDArr = this.fbID.split('\n')
      this.results = this.chunkArray(this.fbIDArr, 1000)

      this.results.forEach(function (item, index) {
        axios({
          method: 'GET',
          url: 'https://graph.facebook.com/' + item + '/posts?limit=50&access_token=' + ref.token,
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(response => {
          console.log(response.data)
        })
      })
    }
  }
}
</script>

<style>

</style>
