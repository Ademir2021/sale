import bcrypt from "bcryptjs-react";

export function crypt(user: any) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user, salt);
  return hash
}

