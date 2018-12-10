<template>
  <div id="page-title">
    <h1 class="page-header text-overflow">{{initialTitle}}</h1>

    <!--Searchbox-->
    <div class="searchbox">
      <div class="input-group custom-search-form">
        <input type="text" class="form-control" placeholder="Search..">
        <span class="input-group-btn">
          <button class="text-muted" type="button"><i class="fa fa-search"></i></button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    initialTitle: String
  }
}
</script>
