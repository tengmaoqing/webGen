import db from './core'
/**
 * {
 *  projectId,
 *  pageId,
 *  id,
 *  sortId,
 *  createDate,
 *  updateDate,
 *  componentId,
 *  props: {},
 *  events: []
 * }
 */
export const newComponent = async ({componentId, pageId, parentInfo = {}}) => {
  const createDate = Date.getTime()
  const parentId = parentInfo.id || ''

  let sortId = 0
  const fristBrother  = await db.componentInstance.get({
    parentId
  }).reverse().sortBy('sortId').limit(1)
  sortId = fristBrother.sortId + 1

  const componentInfo = await db.componentPrototype.get(componentId)
  db.componentInstance.add({
    componentId,
    pageId,
    sortId,
    parentId,
    props: componentInfo.props,
    events: componentInfo.events,
    slots: componentInfo.slots,
    createDate,
    updateDate: createDate,
  })

}

export const updateCI = async ({componentId, targetSortId, props, events, nParent}) => {
  db.transaction('rw', db.componentInstance, db.sort, async () => {

    const cp = await db.componentInstance.get(componentId)
    const originSortId = cp.sortId
    let positionChanged = true
    do {

      if (cp.parentId !== nParent.parentId) {
        // 新序列排序
        await db.componentInstance.get({
          parentId: nParent.parentId
        }).filter(({ sortId }) => sortId >= targetSortId).modify((item, ref) => {
          ref.sortId = item.sortId + 1
        })
  
        // 老序列排序
        await db.componentInstance.get({
          parentId: cp.parentId
        }).filter(({ sortId }) => sortId > originSortId).modify((item, ref) => {
          ref.sortId = item.sortId - 1
        })
        break
      }

      if (originSortId > targetSortId) {
        // 向前移动
        await db.componentInstance.get({
          parentId: nParent.parentId
        }).filter(({ sortId }) => sortId < originSortId && sortId >= targetSortId).modify((item, ref) => {
          ref.sortId = item.sortId + 1
        })
        break
      }
      
      if (originSortId < targetSortId) {
        // 向后移动
        await db.componentInstance.get({
          parentId: nParent.parentId
        }).filter(({ sortId }) => sortId > originSortId && sortId <= targetSortId).modify((item, ref) => {
          ref.sortId = item.sortId - 1
        })
        break
      }
      positionChanged = false
    // eslint-disable-next-line no-constant-condition
    } while (0)

    await cp.modify((item, ref) => {
      if (item.parentId !== nParent.parentId) {
        ref.parentId = nParent.parentId
      }

      if (positionChanged) {
        ref.sortId = targetSortId
      }

      if (props) {
        ref.props = props
      }

      if (events) {
        ref.events = events
      }
    })
  })
}

export const deleteCI = () => {

}

export const getCIById = async id => {
  return await db.componentInstance.get(id)
}

export const getCIs = async pageId => {
    return await db.componentInstance.where('pageId').equals(pageId)
}
