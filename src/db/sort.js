import db from './core'

export const addSort = async (name, value) => {
  await db.sort.add({
    name,
    value
  })
}

export const updateSort = async (name, id, targetIndex) => {
  return await db.sort.get({
    name
  }).modify((item, ref) => {
    const index = item.value.findIndex(i => i === id)
    if (index === targetIndex) {
      return
    }
    item.value.splice(index, 1)
    item.value.splice(targetIndex, 0, id)
    ref.value = item.value
  })
}
