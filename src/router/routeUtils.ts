import router from '.'
import type { TodoFilterType } from '@/compositions/TodoMvc/TodoFilterType'

export const routeTodoMvc = (filterType: TodoFilterType) => {
  router.push({
    path: `/${filterType}`,
    replace: true,
  })
}
