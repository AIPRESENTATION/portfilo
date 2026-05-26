import mongoose from 'mongoose';

const socialLinksSchema = new mongoose.Schema(
  {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    leetcode: { type: String, default: '' },
    codechef: { type: String, default: '' },
    twitter: { type: String, default: '' },
    email: { type: String, default: '' },
  },
  { timestamps: true }
);

const SocialLinks = mongoose.model('SocialLinks', socialLinksSchema);
export default SocialLinks;
