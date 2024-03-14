import { Request, Response } from 'express';

//Interface
import IUserRoles from '../interfaces/userRolesInterface';
//Model
import { Role } from '../models/roles';
import { RolesPermissions } from '../models/roles_permissions';
import { Permissions } from '../models/permissions';

export const getRoles = async (req: Request, res: Response) => {
  const roles = await Role.findAll();
  res.json(roles)
}

export const editRole = (req: Request, res: Response) => {

  if (!req.body.role_id || !req.body.permission_id) {
    res.status(400).send({
      message: "Please provide role_id, and permission_id"
    });
    return;
  }

  Promise.all([
    Role.findByPk(req.body.role_id),
    Permissions.findByPk(req.body.permission_id)
  ])
    .then(([role, permission]) => {
      if (!role) {
        res.status(400).send({
          message: "Role not found!"
        });
        return;
      }

      if (!permission) {
        res.status(400).send({
          message: "Permission not found!"
        });
        return;
      }
      let linkData = req.body as IUserRoles | any
      RolesPermissions.create(linkData)
        .then(() => {
          res.send({ message: "Permissions assigned successfully!" });
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while linking the entities."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while checking the entities."
      });
    });
};