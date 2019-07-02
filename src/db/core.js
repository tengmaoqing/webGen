import Dexie from 'dexie'

const db = new Dexie('webg')

db.version(1).stores({
  project: '++id, name, disabled, delete, createDate, updateDate',
  page: '++id, name, path, project, disabled, delete, createDate, updateDate',
  componentPrototype: '++id, name, type, disabled, delete, createDate, updateDate',
  componentInstance: '++id, componentP, page, parentId, disabled, delete, createDate, updateDate'
})

export default db
