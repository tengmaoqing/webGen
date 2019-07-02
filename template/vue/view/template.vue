<template>
<main>
<%- templateTree %>
</main>
</template>

<script>

export default {
  components: {
    <% components.forEach((component) => { %>
    <%- `'${component.cname}': require('${component.contentPath}'),` %>
    <% }) %>
  }
}
</script>
