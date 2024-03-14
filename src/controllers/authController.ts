import { Request, Response } from 'express';
import { Role } from '../models/roles';
import { Permissions } from '../models/permissions';
import { RolesPermissions } from '../models/roles_permissions';

export const getRoles = async (req: Request, res: Response) => {
  const roles = await Role.findAll();
  res.json(roles)
}

export const getPermissions = async (req: Request, res: Response) => {
  const permissions = await Permissions.findAll();
  res.json(permissions)
}

export const getRolesPermissions = async (req: Request, res: Response) => {
  const rolesPermissions = await RolesPermissions.findAll();
  res.json(rolesPermissions)
}
