const getters = {

  sidebar: state => state.app.sidebar,

  // user
  userId: state => state.user.id,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  token: state => state.user.token,
  roles: state => state.user.roles,
  isDuty: state => state.user.isDuty,
  isParticipateDistribution: state => state.user.isParticipateDistribution,
  userPermission: state => state.user.userPermission,
  operationPermission: state => state.user.operationPermission,
  sales: state => state.user.sales,
  groups: state => state.user.groups,
  ownGroups: state => state.user.ownGroups,
  saleGroup: state => state.user.saleGroup,

  // permission
  permissionRouters: state => state.permission.permissionRouters,
  addRouters: state => state.permission.addRouters,

  // options
  destinationList: state => state.option.destinationList,
  personnelList: state => state.option.personnelList,
  referralTypeList: state => state.option.referralTypeList,

  // modules
  allModules: state => state.module.allModules

}

export default getters
