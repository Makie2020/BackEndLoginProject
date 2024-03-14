import { Request, Response } from 'express';
import Users_Roles from '../models/users_roles';

export const editUserRole = async function (req: Request, res: Response) {
  try {
      await Users_Roles
          .findAll({ where: { user_id: req.body.user_id } })
          .then(async (result) => {
              if (result.length > 0) {
                  await Users_Roles.update(
                     {
                         role_id: req.body.role_id,
                      },
                      { where: { user_id: req.body.user_id } }
                  );
                  res.status(200).json({
                      message: "update successful",
                  });
              } else {
                  res.status(500).json({ message: "update failed" });
              }
          });
  } catch (error) {
      res.status(404).json({ message: error });
  }
};