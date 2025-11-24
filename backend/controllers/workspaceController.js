//Get all workspaces for the user

import prisma from "../configs/prisma.js";

export const getUserWorkSpaces = async (req, res) => {
  try {
    const { userId } = req.auth(); // removed await

    console.log("AUTH USER:", userId);

    const workspaces = await prisma.workspace.findMany({
      where: {
        members: {
          some: { userId: userId }
        },
      },
      include: {
        members: { include: { user: true } },
        projects: {
          include: {
            tasks: {
              include: {
                assignee: true,
                comments: { include: { user: true } },
              },
            },
            members: { include: { user: true } },
          },
        },
        owner: true,
      },
    });

    res.status(200).json({
      success: true,
      workspaces,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};


export const addMember = async (req, res) => {
  try {
    const {userId} = req.auth();
    const {email, role, workspaceId, message} = req.body;

    //Check if user exists
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(!user) return res.status(404).json({
        success: false,
        message: "User not found!"
    })
    if(!workspaceId || !role){
        return res.status(400).json({
            success: false,
            message: "Missing required parameters!"
        })
    }
    if(!["ADMIN", "MEMBER"].includes(role)){
        return res.status(400).json({
            success: false,
            message: "Invalid role!"
        })
    }

    // fetch workspace
    const workspace = await prisma.workspace.findUnique({
        where: {
            id: workspaceId
        },
        include: {
            members: true
        }
    })
    if(!workspace){
        return res.status(404).json({
            success: false,
            message: "Workspace not found"
        })
    }

    // Check creator has admin role
    if(!workspace.members.find((member)=> member.userId == userId && member.role == "ADMIN")){
        return res.status(401).json({
            success: false,
            message: "You don't have admin privileges"
        })
    }

    // Check if user is already a member
    const existingMember = workspace.members.find((member)=> member.userId === userId)
    if(existingMember){
        return res.status(400).json({
            success: false,
            message: "User is already a member"
        })
    }

    const member = await prisma.workspaceMember.create({
        data: {
            userId: user.id,
            workspaceId,
            role,
            message
        }
    })

    res.status(201).json({
        success: true,
        member,
        message: "Member added successfully!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
