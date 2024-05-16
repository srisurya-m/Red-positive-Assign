import { Request, Response } from "express";
import { createDetail } from "../types/types.js";
import { Details } from "../modals/Details.js";
import { sendmail } from "../utils/features.js";

export const createInterface = async (
  req: Request<{}, {}, createDetail>,
  res: Response
) => {
  try {
    const { name, phoneNumber, email, hobbies } = req.body;
    let detail = await Details.find({ email });
    if (detail.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Your interface already exists",
      });
    }

    const newDetail = await Details.create({
      name,
      phoneNumber,
      email,
      hobbies,
    });
    return res.status(201).json({
      success: true,
      message: "New User interface is created",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateInterface = async (
  req: Request<{ id: string }, {}, createDetail>,
  res: Response
) => {
  try {
    const { name, phoneNumber, email, hobbies } = req.body;
    const requiredinterface = await Details.findById(req.params.id);
    if (!requiredinterface) {
      return res.status(404).json({
        success: false,
        message: "required interface doesn't exist",
      });
    }
    const updatedInterface = await Details.findByIdAndUpdate(req.params.id,{name, phoneNumber, email, hobbies},{ new: true } )
    return res.status(200).json({
        success:true,
        message:"Updated Successfully",
        updatedInterface
    })
  } catch (error) {
    console.log(error)
  }
};

export const deleteInterface = async (req:Request<{id:string},{}>,res:Response) => {
  try {
    const requiredinterface = await Details.findById(req.params.id);
    if (!requiredinterface) {
      return res.status(404).json({
        success: false,
        message: "required interface doesn't exist",
      });
    }
    await Details.findByIdAndDelete(req.params.id)
    return res.status(200).json({
        success:true,
        message:"deleted Successfully"
    })
  } catch (error) {
    console.log(error)
  }
};

export const allInterface = async (req:Request<{},{}>,res:Response) => {
  try {
    const requiredinterfaces = await Details.find();
    if (!requiredinterfaces) {
      return res.status(404).json({
        success: false,
        message: "NO interfaces found",
      });
    }
    return res.status(200).json({
        success:true,
        requiredinterfaces
    })
  } catch (error) {
    console.log(error)
  }
};


export const mail = async (req:Request<{id:string},{}>,res:Response) => {
  try {
    const requiredinterface = await Details.findById(req.params.id);
    if (!requiredinterface) {
      return res.status(404).json({
        success: false,
        message: "NO interfaces found",
      });
    }
    await sendmail(`name=> ${requiredinterface?.name}
                    hobbies=> ${requiredinterface?.hobbies}
                    email=>  ${requiredinterface?.email}
                    phone number=> ${requiredinterface?.phoneNumber}`)
    return res.status(200).json({
      success:true,
    })
  } catch (error) {
    console.log(error)
  }
};
