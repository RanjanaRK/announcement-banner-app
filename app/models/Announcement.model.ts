import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Announcement =
  mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema);

export default Announcement;
