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
                        <th data-hide="phone, tablet">Ngày giờ</th>
                        <th data-hide="phone, tablet">Số lượng UID nhập vào</th>
                        <th data-hide="phone, tablet">Số lượng UID chuyển thành công</th>
                        <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="arr in visibleTodos"
                        v-bind:visibleTodos="visibleTodos"
                        v-bind:currentPage="currentPage"
                        :key="arr.id">
                        <!-- <td id="count"></td> -->
                        <td>{{arr.id}}</td>
                        <td>{{arr.datetime}}</td>
                        <td>{{arr.total}}</td>
                        <td>{{arr.convert_completed}}</td>
                        <td>
                            <!-- <a :href="'http://sayfb.com/api.php?action1=download&filename=' + arr.file_name"> -->
                            <a :href="'/api.php?action1=download&filename=' + arr.file_name">
                              <button class="btn btn-info">Download
                              </button>
                            </a>
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
  name: 'History',
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
        url: '/api.php',
        // url: 'http://sayfb.com/api.php',
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
