import { isTodoFilterType } from '@/compositions/TodoMvc/TodoFilterType'
import type { TodoMvcProps } from '@/compositions/TodoMvc/TodoMvcProps'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/:filterType?',
    name: 'todo',
    component: () => import('@/views/TodoMvc.vue'),
    props: (route) => {
      const filterType = route.params.filterType
      const props: TodoMvcProps = {
        filterType: 'all',
      }
      if (filterType && isTodoFilterType(filterType)) {
        props.filterType = filterType
      }
      return props
    },
  },
]
