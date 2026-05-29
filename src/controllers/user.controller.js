import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import {ApiError} from "../utils/apiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  // get user data from frontend
  // validation
  // check if user already exists
  // hash password
  // check for images, avatar
  // upload to cloudinary
  // create user in database
  // remove passwrord from response
  // check for user creation success
  // return response

  // Step 1: get user data from frontend
  const { fullName, email, username, password } = req.body;
  console.log("email: ", email);

  // Step 2: validation
  if (fullName === "") {
    throw new ApiError("Full name is required", 400);
  }

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError("All fields are required", 400);
  }

  // Step 3: check if user already exists
  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError("User already exists with this email or username", 409);
  }

  // Step 4: check for images, avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  // Step 5: upload to cloudinary
  const avatar = await uploadToCloudinary(avatarLocalPathq);
  const coverImage = await uploadToCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  // Step 6: create user in database
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // Step 7: remove password from response
  // Step 8: check for user creation success
  const createdUser = await user.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, "something went wrong while registering the user")
  }

  // Step 9: return response
  return res.status(201).json(
    new apiResponse(200, createdUser, "User registred successfully")
  )
  

});

export { registerUser };
