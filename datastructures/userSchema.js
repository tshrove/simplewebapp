// MIT License
//
// Copyright (c) [2016] [Tommy Shrove]
// Twitter: @tshrove
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
var mongoose = require('mongoose');
var settings = require('../settings');
var bcrypt = require('bcrypt');

//----------------------------------------------------
/**
 * Create the user schema
 */
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    role: { type: String, required: true },
    pwHash: { type: String, required: true },
    updated: { type: Date, default: Date.now }
});

/**
 * Checks the user's password hash versus the new password.
 * @param password
 */
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.pwHash);
};

var User = mongoose.model('user', userSchema);

// make this available to our users in our Node applications
module.exports = User;