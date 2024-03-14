import { Request, Response } from 'express';
import { Permissions } from '../models/permissions';

export const getPermissions = async (req: Request, res: Response) => {
  const permissions = await Permissions.findAll();
  res.json(permissions)
}