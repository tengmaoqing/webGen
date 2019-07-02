import db from './core'
// import { isString,  }

export const getComponentList = async name => {
  let cs
  if (!name) {
    cs = await db.componentPrototype.limit(10)
  }
  cs = await db.componentPrototype.where({name})
  return cs
}

export const addComponent = async ({
  name,
  type,
  props,
  slots,
  events,
  content
}) => {
  // todo 验证
  const createDate = Date.now()
  db.componentPrototype.add({
    name,
    type,
    slots,
    props,
    events,
    content,
    createDate,
    updateDate: createDate,
    disabled: false,
    delete: false
  })
}
