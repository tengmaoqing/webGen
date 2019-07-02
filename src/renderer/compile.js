const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const globby = require('globby')
const { treeRender } = require('./generator')
const outputFileSync = require('output-file-sync');

class CompileError extends Error {
  constructor (message) {
    super(`[webg-compile]: ${message}`)
  }
}

const TestProjectInfo = {
  name: 'test',
  pages: [{
    name: '23',
    path: '/ax',
    components: [
      {
        parentId: '',
        id: '1',
        name: 'tc',
        cname: 'tcc',
        contentPath: './mouldle/a.vue',
      },
      {
        parentId: '1',
        id: '2',
        name: 'bc',
        cname: 'bc',
        contentPath: './mouldle/b.vue',
      },
      {
        parentId: '1',
        id: '3',
        name: 'bc',
        cname: 'cc',
        contentPath: './mouldle/b.vue',
      },
      {
        parentId: '2',
        id: '3',
        name: 'bc',
        cname: 'dc',
        contentPath: './mouldle/b.vue',
      }
    ]
  }, {
    name: '234',
    path: '/axx',
    components: [
      {
        parentId: '',
        id: '1',
        name: 'tc',
        cname: 'tccx',
        contentPath: './mouldle/a.vue',
      }
    ]
  }]
}

/**
 * data -> files
 */
class Compile {
  constructor (project) {

    this.fileRoot = process.cwd()
    this.distDir = path.resolve(this.fileRoot, '_dist')
    this.template = 'vue'

    this.projectInfo = project
    this.pages = project.pages
    // this.cps = cps
    this.init()
    this.render()
  }

  init () {
    const templateRoot = path.join(this.fileRoot, `/template/${this.template}`)
    if (!fs.existsSync(templateRoot)) {
      throw new CompileError(`没有找到模板 '${this.template}'`)
    }
    const pageTemplate = fs.readFileSync(path.join(templateRoot, 'view/template.vue'), 'utf8')
    this.templateDirs = globby.sync(['**', '!view'], {
      onlyFiles: true,
      cwd: templateRoot
    }).map(dir => {
      return {
        p: dir,
        c: fs.readFileSync(path.join(templateRoot, dir), 'utf8'),
        d: {
          pages: this.pages
        }
      }
    })

    Array.prototype.push.apply(this.templateDirs, this.pages.map(page => {
      const components = page.components
      page.fileDistPath = `view/${page.name}.vue`
      return {
        p: page.fileDistPath,
        c: pageTemplate,
        d: {
          templateTree: treeRender(components),
          components
        }
      }
    }))
  }

  render () {
    this.templateDirs.forEach(t => {
      t.o = ejs.render(t.c, t.d)
    })
  }

  distPage () {
    this.templateDirs.forEach(t => {
      outputFileSync(path.join(this.distDir, this.projectInfo.name, t.p), t.o)
    })
  }
}

new Compile(TestProjectInfo).distPage()

module.exports = Compile
