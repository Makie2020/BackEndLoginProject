import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import RolesUsers from '../models/users_roles';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUserInfo } from '../interfaces/userInterface';
import { RolesPermissions } from '../models/roles_permissions';
import sequelize from '../db/connection';

dotenv.config();

export const newUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    const user = await User.findOne({ where: { username: username } });

    if (user) {
        return res.status(400).json({
            msg: `A user with the name ${username} already exists.`
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    try {
        await User.create({
            username: username,
            password: hashedPassword,
        })
        // adding role as USER for user
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(400).json({
                msg: `No user exists.`
            })
        }
        try {
            await RolesUsers.create({
                user_id: user.id,
                role_id: 2
            })
        } catch (error) {
            res.status(400).json({
                msg: 'Error',
                error
            })
        }
        res.json({
            msg: `User ${username} created!`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findAll<IUserInfo>({
        raw: true,
        where: { username: username },
        include: [
            {
                model: RolesPermissions,
                attributes: ['permission_id'],
                required: false,
            },
            {
                model: RolesUsers,
                attributes: ['role_id'],
                required: false,
            }
        ]
    })

    const passwordValid = await bcrypt.compare(password, user ? user[0].password : '')
    if (!user || !passwordValid) {
        return res.status(400).json({ error: 'User or password incorrect' });
    }

    const permission: { [key: string]: any } = user.map((user: any) => user['roles_permissions.permission_id']);

    const token = jwt.sign({
        username: username,
        role: user[0]['users_role.role_id'],
        permission: permission
    }, process.env.SECRET_KEY);

    res.json(token);
}

export const allUsers = async (req: Request, res: Response) => {
    const results: any = await sequelize.query("SELECT  Users.*,  Users_roles.role_id, Roles_permissions.permission_id FROM Users LEFT JOIN Users_roles ON Users.id = Users_roles.user_id LEFT JOIN Roles_permissions ON Users_roles.role_id = Roles_permissions.role_id;");

    function joinUsersWithPermissions(results: any) {
        const userMap = new Map();
        results.forEach((userArray: any[]) => {
            userArray.forEach((user: { id: number; permission_id: number; username: number; role_id: number; }) => {
                if (userMap.has(user.id)) {
                    if (!userMap.get(user.id).permissions.includes(user.permission_id)) {
                        userMap.get(user.id).permissions.push(user.permission_id);
                    }
                } else {
                    userMap.set(user.id, {
                        id: user.id,
                        username: user.username,
                        role_id: user.role_id,
                        permissions: [user.permission_id]
                    });
                }
            });
        });
        return Array.from(userMap.values());
    }
    
    const joinedUsers = joinUsersWithPermissions(results);
    res.json(joinedUsers)
}

// exports.deleteUser = (req: Request, res: Response) => {
//     const id = req.params.id;
  
//     const index = User.findIndex((user: { id: string; }) => user.id == id);
  
//     if (index != -1) {
//       /* Remove the user from the users array */
//       User.splice(index, 1);
  
//       /* Send a JSON response with a success message */
//       res.json({ message: 'User deleted successfully' });
//     } else {
//       /* If no user with the specified ID was found, send a 404 response */
//       res.status(404).json({ message: `User with ID ${id} not found` });
//     }
//   };
