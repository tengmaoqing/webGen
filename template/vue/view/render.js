
<% components.forEach((component) => { %>
<%= `import ${component.cname} from '${component.path}'` %>
<% }) %>

const structure = (arr, pid = '') => {
  const n = arr.filter(item => item.parentId === pid)
  n.forEach(e => {
    e.children = structure(arr, e.id)
  })
  return n
}

const vueRenderHelper = (components) => {
  const structuredData = structure(components)
  const subs = []
  while (structuredData.length) {
    const 
  }
  return 
}

export default {
  render (h) {
    return h('main', {}, <%= vueRenderHelper(components) %>)
  }
}
