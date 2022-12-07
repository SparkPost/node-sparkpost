'use strict'

module.exports = (subAccountOptions) => {
  const headers = {}
  if (typeof subAccountOptions !== 'object') return headers
  if (subAccountOptions.subAccountId) headers['X-MSYS-SUBACCOUNT'] = subAccountOptions.subAccountId
  if (subAccountOptions.subAccountApiKey) headers.Authorization = subAccountOptions.subAccountApiKey
  return headers
}
