import request from '@/utils/request'

// 获取优惠
export function getDiscounts(dealId) {
  return request({
    url: `/deals/${dealId}/discounts`,
    method: 'GET'
  })
}

// 新建优惠
export function addDiscount(dealId, data) {
  return request({
    url: `/deals/${dealId}/discounts`,
    method: 'POST',
    data
  })
}

// 获取优惠分类
export function getDiscountOptions(dealId) {
  return request({
    url: `/deals/${dealId}/discounts/new`,
    method: 'GET'
  })
}

// 删除优惠
export function deleteDiscount(dealId, discountId) {
  return request({
    url: `/deals/${dealId}/discounts/${discountId}`,
    method: 'DELETE'
  })
}
