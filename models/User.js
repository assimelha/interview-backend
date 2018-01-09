import bcrypt from 'bcryptjs';

import { User } from '../db';
import { generateToken, Self } from '../lib';

export async function login({ email, password }) {
  const user = await User.query().findOne({ email });
  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      return { user, token: generateToken(user.toJSON()) };
    } else {
      throw new Error('Password is incorrect');
    }
  } else {
    throw new Error("User doesn't exist");
  }
}

export function getUser(id) {
  return User.query().findById(id);
}

export async function signUp({ firstname, lastname, email, password }) {
  console.log('signing up');
  const user = await User.query().findOne({ email });
  if (user) {
    throw new Error('User already exists');
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.query().insert({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    return { user, token: generateToken(user.toJSON()) };
  }
}
