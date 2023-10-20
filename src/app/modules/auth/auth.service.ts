import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../handlingError/ApiError';
import { User } from '../users/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  const user = await User.findOne({ email: email }).lean();

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  let isPasswordMatched = false;
  if (User) {
    isPasswordMatched = await User.isPasswordMatched(password, user.password);
  }

  if (!isPasswordMatched) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password is incorrect');
  }

  // Generate an access token
  const accessToken = jwtHelpers.createToken(
    { email, user },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { email, user },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    email,
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const isUserExist = await User.isUserExist(user?.email);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Old Password is incorrect');
  }
  // Hash password
  const newHashPass = await bcrypt.hash(
    newPassword,
    Number(config.default_salt_rounds as string)
  );
  const updatedData = {
    password: newHashPass,
  };
  const query = { email: user?.email };
  await User.findOneAndUpdate(query, updatedData);
  throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Invalid user type');
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { email } = verifiedToken;

  // Check if the user is an Admin, Instructor, or Student
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
};
