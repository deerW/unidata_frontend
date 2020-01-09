<template>
  <scroll-bar>
    <el-menu 
      mode="vertical" 
      unique-opened 
      :default-active="$route.path" 
      :collapse="isCollapse" 
      background-color="#304156" 
      text-color="#fff" 
      active-text-color="#30bfbf">
      <sidebar-item :routes="permissionRouters"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permissionRouters',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
