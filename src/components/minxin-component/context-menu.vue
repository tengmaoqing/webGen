<template>
  <aside>
    <ul>
      <li @click="$emit('del')">删除</li>
      <li @click="$emit('addSub')">添加子组件</li>
      <li>添加子组件</li>
    </ul>
  </aside>
</template>

<script>
export default {
  
}
</script>
