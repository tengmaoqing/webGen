const pretty = require('pretty')
// export const structure = (arr, pid = '') => {
//   const n = arr.filter(item => item.parentId === pid)
//   n.forEach(e => {
//     e.children = structure(arr, e.id)
//   })
//   return n
// }

const propsRender = (props) => {
  if (!props) {
    return ''
  }
  return Object.keys(props).map(key => {
    // todo key type
    return `${key}="${props[key]}" \n`
  })
}

const eventsRender = (events) => {
  if (!events) {
    return ''
  }
  return Object.keys(events).map(key => {
    return `@${key}="${events[key]}" \n`
  })
}

exports.treeRender = (arr, pid = '') => {
  const n = arr.filter(item => item.parentId === pid)
  const tmp = n.map(e => {
    const subtree = exports.treeRender(arr, e.id)
    const propsStr = propsRender(e.props)
    const eventsStr = eventsRender(e.props)
    if (subtree) {
      return `<${e.cname} slot="${e.slot || 'default'}" ${propsStr} ${eventsStr}>
      ${subtree}
    </${e.cname}>`
    }
    return `<${e.cname} slot="${e.slot || 'default'}" ${propsStr} ${eventsStr}></${e.cname}>`
  }).join('\n')
  return pretty(tmp)
}