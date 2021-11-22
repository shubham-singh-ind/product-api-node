import * as express from 'express';
import * as Jwt from 'jsonwebtoken';
import * as otpGenerator from "otp-generator";
import { getEnvironmentVariables } from '../../environments/env';
import * as bcrypt from 'bcrypt';
import Model from '../../models';
import { Mailer } from '../../utils/Mailer';

export class CustomerController {

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const data = {
        email: email
      };

      const customer:any = await Model.Customer.findOne({ where: { email: email, status: 1 } });

      if(!customer) {
        return res.status(404).json({
          status: 404,
          message: "Invalid username or password."
        });
      }

      const hash = customer.password_hash;
      const match = await bcrypt.compare(password, hash);
      if(match) {
        console.log('Matched...');
        
        const token = await Jwt.sign(data, getEnvironmentVariables().jwt_secret);
        return res.status(200).json({
          status: 200,
          message: "Logged in successfully.",
          token: token
        });
      }

      return res.status(404).json({
        status: 404,
        message: "Invalid username or password."
      });

    }catch(err) {
      next(err);
    }
  }

  static async signup(req, res, next) {
    try {

      const passwordHash = await bcrypt.hash(req.body.password, 10);

      const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        password_hash: passwordHash,
        status: 1,
      };

      const result = await Model.Customer.findOne({ where: { email: data.email } });

      if(result) {
        return res.status(404).json({
          status: 404,
          message: "Please try different email.",
        });        
      }

      let customer:any = await Model.Customer.create(data);
      customer = await Model.Customer.findOne({ attributes: ['email','first_name','last_name'], where: { email: data.email } });

      return res.status(200).json({
        status: 200,
        message: "Customer signed up successfully.",
        data: customer
      });

    }catch(err) {
      next(err);
    }
  }

  static async sendOtp(req, res, next) {
    try {
      const data = {
        email: req.body.email,
      };

      const result = await Model.Customer.findOne({ where: { email: data.email } });

      if(!result) {
        return res.status(404).json({
          status: 404,
          message: "User does not exists in system.",
        });        
      }

      const otp = otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
        alphabets: false,
      });

      const response = await Mailer.sendEmail({
        to: [data.email],
        subject: "Verify OTP",
        template: "email-templates/sendotp.ejs",
        data: {
          otp: otp
        }
      }); 
      console.log("Response after mailer: ", response);

      await Model.Otp.create({ otp: otp, expires_in_minute: 20, status: 0 }); // status=0, active.

      return res.status(200).json({
        status: 200,
        message: "Otp sent. Otp is valid for only 20 minutes. Please check your registered email.",
      });

    }catch(err) {
      next(err);
    }    
  }

  static async verifyOtp(req, res, next) {
    try {
      const data = {
        email: req.body.email,
        otp: req.body.otp,
      };

      const result:any = await Model.Otp.findOne({ where: { otp: data.otp, status: 0 } });

      if(!result) {
        return res.status(404).json({
          status: 404,
          message: "Invalid Otp entered.",
        });
      }

      const expirationTime = result.createdAt + (result.expires_in_minute*60*1000) ;
      const currentTime = Date.now();
      if(currentTime > expirationTime) {
        await Model.Otp.update({ status: 1 }, { where: { id: result.id } }); // expire otp in db
        return res.status(404).json({
          status: 404,
          message: "Otp is expired.",
        });
      }

      await Model.Otp.update({ status: 1 }, { where: { id: result.id } }); // expire otp in db

      return res.status(200).json({
        status: 200,
        message: "Otp verfied sucessfully.",
      });

    }catch(err) {
      next(err);
    }    
  }

  static async resetPassword(req, res, next) {
    try {

      const passwordHash = await bcrypt.hash(req.body.password, 10);      
      const email = req.body.email;
      
      const result = await Model.Customer.findOne({ where: { email: email } });

      if(!result) {
        return res.status(404).json({
          status: 404,
          message: "User does not exists in system.",
        });        
      }

      await Model.Customer.update({ password_hash: passwordHash }, { where: { email: email } });

      return res.status(200).json({
        status: 200,
        message: "Password reset successful.",
      });

    }catch(err) {
      next(err);
    }    
  }

}
