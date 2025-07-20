import { NotFoundError } from "../core/error.response.js";
import User from "../models/user.model.js";

class AccountService {
  static getUser = async (userId) => {
    let userInfo = null;
    if (userId) {
      const user = await User.findById(userId).lean();
      if (!user) {
        return;
      }
      userInfo = {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        addresses: user.addresses,
      };
    }
    return userInfo;
  };
  static addAddress = async (address, userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("Not found user");
    }
    delete address._id;
    user.addresses.push(address);
    await user.save();
  };

  static updateAddress = async (address, userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("Not found user");
    }
    const index = user.addresses.findIndex(
      (addr) => addr._id.toString() === address._id
    );
    if (address.isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }
    if (index === -1) {
      user.addresses.push(address);
    } else {
      user.addresses[index] = {
        ...user.addresses[index]._doc,
        ...address,
      };
    }

    await user.save();
  };
}
export default AccountService;
