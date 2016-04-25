/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

import toolbox from 'sw-toolbox'

const swConfig = APP_CONFIG.sw
console.log(swConfig)
if (swConfig.appCache) {
  const {policy} = swConfig.appCache
  toolbox.router.get('/', toolbox[policy])
  toolbox.router.get(/.*bundle.*/, toolbox[policy])
}

if (swConfig.externalCache) {
  const {policy} = swConfig.externalCache
  toolbox.router.get(/.*googleapis.*/, toolbox[policy])
  toolbox.router.get(/.*gstatic.*/, toolbox[policy])
  toolbox.router.get(/.*bootstrapcdn.*/, toolbox[policy])
}

toolbox.router.default = toolbox.cacheFirst
