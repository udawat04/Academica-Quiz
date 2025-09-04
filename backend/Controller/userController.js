const { uploadImage } = require("../helper/cloudinary");
const User = require("../Model/userModel");


exports.userRegister = async (req, res) => {
  try {
      // console.log(req.body);
      // console.log(req.files);

    const { firstName, lastName, email, password, phone, age, dob, courses, street, city, state, country, pincode, bio } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    let image;
    if(req.files)
    {
    image = await uploadImage(req.files);
    }
   
  
    const newUser = new User({ firstName, lastName, email, password, phone, age, dob, profilePic: image[0].url, street, city, state, country, pincode, bio, courses });
    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



exports.userGet = async (req, res) => {
  try {
    const result = await User.find().populate("courses");
    console.log(result);
    return res.status(200).json({ msg: "user get", data: result });
  } catch (error) {
    res.status(500).json({ msg: "error occurred", error: error.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const alreadyEmail = await User.findOne({ email });
    if (!alreadyEmail) {
      return res.status(400).send("email not found");
    }

    const dbpassword = alreadyEmail.password;

    if (password !== dbpassword) {
      return res.status(400).json({ message: "password is not match" });
    }

    return res
      .status(200)
      .json({ message: "User logged in ", user: alreadyEmail });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.userProfileUpdate = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      age,
      dob,
      courses,
      street,
      city,
      state,
      country,
      pincode,
      bio,
    } = req.body;

    const { id } = req.params;

    // Base update data
    let data = {
      firstName,
      lastName,
      email,
      password, 
      phone,
      age,
      dob,
      courses,
      street,
      city,
      state,
      country,
      pincode,
      bio,
    };

    // If file uploaded, update profilePic
    if (req.files) {
      const image = await uploadImage(req.files);
      if (image && image[0]) {
        data.profilePic = image[0].url;
      }
    }

    // Update in DB
    const updateResult = await User.findByIdAndUpdate(id, data, { new: true });

    if (!updateResult) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).send(updateResult)
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

