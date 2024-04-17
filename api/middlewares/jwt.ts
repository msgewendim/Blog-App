import jwt from "jsonwebtoken";

const privateKey = "Some Secret Key lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, tempora. lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, tempora, lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, tempora";
const publicKey = "Some Public Key lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, tempora.";

// create jwt token
export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

// check if jwt is valid
export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}

// generate jwt token using username
export const generateJwtToken = (username: string) => {
  const payload = {
    username,
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: "1h" });
  return token
}
