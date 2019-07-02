import VueRouter from 'vue-router'

const routes = [
  <% pages.forEach((page) => { %>
    <%- `{
      path: '${page.path}',
      component: import('${page.fileDistPath}'),
      meta: ${JSON.stringify(page.data)}
    },  \n` %>
  <% }) %>
]

export default new VueRouter({
  routes // short for `routes: routes`
})
