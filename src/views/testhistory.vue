<template>
  <div id="page-content">
    <div class="panel">
      <b-table
        :data="data"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :default-sort-direction="defaultSortDirection"
        default-sort="id"
      >
        <template slot-scope="props">
          <b-table-column field="id" label="ID" width="40" sortable numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column field="datetime" label="Date" sortable centered>
            <span class="tag is-success">
              {{ props.row.datetime }}
            </span>
          </b-table-column>

          <b-table-column field="total" label="Số lượng UID nhập vào" sortable>
            {{ props.row.total }}
          </b-table-column>

          <b-table-column field="convert_completed" label="Số lượng UID chuyển thành công" sortable>
            {{ props.row.convert_completed }}
          </b-table-column>

          <b-table-column label="Download">
            <a :href="'/api.php?action1=download&filename=' + props.row.file_name">
              <button class="button is-info">Download</button>
            </a>
          </b-table-column>

        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'History',
  data: function () {
    return {
      data: [],
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10
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
        data: 'action=history' + '&email=' + email,
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })
        .then(response => {
          if (response.statusText !== 'OK') {
            alert('fail bleu bleu')
            return false
          } else {
            this.data = response.data
          }
        })
    }
  }
}

</script>
