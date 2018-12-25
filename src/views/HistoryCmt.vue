<template>
    <div id="page-content">
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title">Lịch Sử</h3>
            </div>
            <table  id="demo-foo-filtering" class="table table-bordered table-hover toggle-circle" data-page-size="7">
                <thead>
                    <tr>
                    <th data-toggle="true">ID</th>
                    <th data-hide="phone, tablet">Status</th>
                    <th data-hide="phone, tablet">Comment</th>
                    <th data-hide="phone, tablet">Keyword</th>
                    <th data-hide="phone, tablet">FacebokUID</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="arr in visibleTodos"
                    v-bind:visibleTodos="visibleTodos"
                    v-bind:currentPage="currentPage"
                    :key="arr.id">
                    <td>{{arr.id}}</td>
                    <td>{{arr.message}}</td>
                    <td>{{arr.cmt}}</td>
                    <td>{{arr.keyword}}</td>
                    <td>{{arr.userid}}</td>
                    <td>
                      <input id="btn-submit" class="btn btn-info" type="submit" value="Delete" @click='deleteHistory(arr.id)' />
                    </td>
                  </tr>
                </tbody>
            </table>
            <div v-if="totalPages() > 0" class="pagination-wrapper">
              <span v-if="showPreviousLink()" class="pagination-btn btn btn-info" v-on:click="updatePage(currentPage - 1)"> {{previousSys}} </span>
              {{ currentPage + 1 }}    of    {{ totalPages() }}
              <span v-if="showNextLink()" class="pagination-btn btn btn-info" v-on:click="updatePage(currentPage + 1)"> >> </span>
            </div>
                <!-- <pagination>
                </pagination> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HistoryCmt',
  data: function () {
    return {
      arr: [],
      currentPage: 0,
      pageSize: 10,
      visibleTodos: [],
      previousSys: '<<'
    }
  },
  mounted () {
    this.getHistory()
  },
  methods: {
    getHistory () {
      var email = this.$session.get('email')
      axios({
        method: 'POST',
        // url: '/api.php',
        url: 'http://sayfb.com/cmtapi.php',
        data: 'action=history' + '&email=' + email,
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })
        .then(response => {
          if (response.statusText !== 'OK') {
            alert('fail bleu bleu')
            return false
          } else {
            this.arr = response.data
            this.updateVisibleTodos()
          }
        })
    },
    updatePage (pageNumber) {
      this.currentPage = pageNumber
      this.updateVisibleTodos()
    },
    updateVisibleTodos () {
      this.visibleTodos = this.arr.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)

      if (this.visibleTodos.length === 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1)
      }
    },
    totalPages () {
      return Math.ceil(this.arr.length / this.pageSize)
    },
    showPreviousLink () {
      // return this.currentPage === 0 ? false : true
      if (this.currentPage === 0) {
        return false
      } else {
        return true
      }
    },
    showNextLink () {
      // return this.currentPage === (this.totalPage() - 1) ? false : true
      if (this.currentPage === (this.totalPages() - 1)) {
        return false
      } else {
        return true
      }
    },
    deleteHistory ($id) {
      console.log($id)
      axios({
        method: 'POST',
        url: 'http://sayfb.com/cmtapi.php',
        data: 'action=delete' + '&id=' + $id,
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })
        .then(response => {
          if (response.statusText !== 'OK') {
            alert('fail bleu bleu')
            return false
          }
        }, error => {
          console.error(error)
        })
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

  .pagination-btn {
    cursor: pointer
  }
  .pagination-wrapper {
    padding-left: 40%;
    padding-top: 15px;
  }
</style>
