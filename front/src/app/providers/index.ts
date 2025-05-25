import compose from 'compose-function'
import {withRouter} from "./with-router"
import {withStore} from "./with-store.tsx"
import {withQuery} from "./with-query.tsx"

export const withProviders = compose(
  withStore,
  withRouter,
  withQuery
)