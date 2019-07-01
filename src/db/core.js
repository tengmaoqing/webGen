import Dexie from 'dexie'

const db = new Dexie('webg')

db.version(1).stores({
  project: '++id, name, disabled, delete, createDate, updateDate',
  page: '++id, name, projectId, disabled, delete, createDate, updateDate',
  componentPrototype: '++id, name, type, disabled, delete, createDate, updateDate',
  componentInstance: '++id, componentId, pageId, disabled, delete, createDate, updateDate',
  sort: '++id, name, value'
})

export default db
