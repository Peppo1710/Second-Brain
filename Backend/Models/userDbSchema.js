const mongoose = require('mongoose');

// const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // email
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  age: Number,
  phone: String,
  isVerified: { type: Boolean, default: false },

  provider: { 
    type: String, 
    enum: ['local', 'google'], 
    default: 'local' 
  },

  // required only for local users; allow null for google users
  password: { 
    type: String, 
    required: function () { return this.provider === 'local'; },
    default: null
  },

  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },
}, { timestamps: true });


const verificationTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
const VerificationToken = mongoose.model('VerificationToken', verificationTokenSchema);

module.exports ={ User , VerificationToken};
