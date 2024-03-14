import { Permissions } from './permissions'
import { Role } from './roles'
import { RolesPermissions } from './roles_permissions'
import { User } from './user'
import Users_Roles from './users_roles'

Users_Roles.belongsTo(User, { foreignKey: 'id' })
Users_Roles.belongsTo(Role, { foreignKey: 'id' })
Users_Roles.hasMany(RolesPermissions, { foreignKey: 'role_id' })

RolesPermissions.hasMany(Permissions, { as: 'permissions', foreignKey: 'id' })
RolesPermissions.hasMany(Role, { foreignKey: 'id' })

User.hasOne(Users_Roles, { foreignKey: 'user_id' })
User.hasMany(RolesPermissions, { foreignKey: 'role_id' })

Role.hasMany(RolesPermissions, { foreignKey: 'role_id' })
Role.hasOne(Users_Roles, { foreignKey: 'user_id' })

Permissions.hasMany(RolesPermissions, { foreignKey: 'permission_id' })
