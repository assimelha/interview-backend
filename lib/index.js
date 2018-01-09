import jwt from 'jsonwebtoken';
import util from 'util';
import { getUser } from '../models/User';

export const generateToken = user =>
  jwt.sign(Object.assign({}, user), process.env.JWT_SECRET);

export const serializeUser = async token => {
  const verify = util.promisify(jwt.verify);
  try {
    console.log('serializing', token);
    const serializedUser = await verify(token, process.env.JWT_SECRET);
    console.log('serialized: ', serializedUser);
    const user = await getUser(serializedUser.id);
    console.log('from db: ', serializedUser);
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const Self = async prospect => {
  if (prospect === null) {
    return null;
  } else {
    const user = await getUser(prospect.id);
    if (!user) {
      return null;
    } else {
      return user;
    }
  }
};
