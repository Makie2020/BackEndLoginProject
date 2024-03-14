import { Request, Response } from 'express';
import { RolesPermissions } from '../models/roles_permissions';

export const getRolePermissions = async (req: Request, res: Response) => {
  const userPermissions = await RolesPermissions.findAll();
  res.json(userPermissions)
}