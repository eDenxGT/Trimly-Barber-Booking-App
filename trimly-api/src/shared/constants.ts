export const ROLES = {
	ADMIN: "admin",
	CLIENT: "client",
	BARBER: "barber",
} as const;

export type TRole = "client" | "admin" | "barber";

export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	INTERNAL_SERVER_ERROR: 500,
} as const;

export const SUCCESS_MESSAGES = {
	BOOKING_SUCCESS: "Booking completed",
	CREATED: "Created successfully",
	LOGIN_SUCCESS: "Login successful",
	REGISTRATION_SUCCESS: "Registration completed successfully",
	OTP_SEND_SUCCESS: "OTP sent successfully",
	LOGOUT_SUCCESS: "Logged out successfully",
	UPDATE_SUCCESS: "Updated successfully",
	DELETE_SUCCESS: "Deleted successfully",
	OPERATION_SUCCESS: "Operation completed successfully",
	PASSWORD_RESET_SUCCESS: "Password reset successfully",
	VERIFICATION_SUCCESS: "Verification completed successfully",
	DATA_RETRIEVED: "Data retrieved successfully",
	ACTION_SUCCESS: "Action performed successfully",
	EMAIL_SENT_SUCCESSFULLY: "Email Sent Successfully",
	WAITING_FOR_ADMIN_APPROVAL: "Registration request submitted. Awaiting admin approval.",
} as const;

export const ERROR_MESSAGES = {
	WRONG_ID: "Wrong ID",
	TOKEN_EXPIRED: "Token Expired",
	TOKEN_BLACKLISTED: "Token is Blacklisted",
	EMAIL_NOT_FOUND: "Email Not Found",
	FORBIDDEN:
		"Access denied. You do not have permission to access this resource.",
	BLOCKED: "Your account has been blocked.",
	NOT_ALLOWED: "You are not allowed",
	EMAIL_EXISTS: "Email Already Exists",
	REQUEST_NOT_FOUND: "Category Request Not Found",
	CATEGORY_EXISTS: "Category Already Exists",
	CATEGORY_NOT_FOUND: "Category Not Found",
	INVALID_TOKEN: "Invalid token",
	INVALID_ROLE: "Invalid user role",
	INVALID_CREDENTIALS: "Invalid credentials provided.",
	USER_NOT_FOUND: "User not found.",
	ROUTE_NOT_FOUND: "Route not found",
	UNAUTHORIZED_ACCESS: "Unauthorized access.",
	SERVER_ERROR: "An error occurred, please try again later.",
	VALIDATION_ERROR: "Validation error occurred.",
	MISSING_PARAMETERS: "Missing required parameters.",
	WRONG_CURRENT_PASSWORD: "Current password is wrong",
	SAME_CURR_NEW_PASSWORD: "Please enter a different password from current password",
} as const;

export const VERIFICATION_MAIL_CONTENT = (
	otp: string
) => `<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
   <!-- Logo Text Section -->
   <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="font-size: 48px; font-weight: bold; margin: 0;">
         ✂️ <span style="color: #FEBA43;">Trimly</span>
      </h1>
   </div>

   <h2 style="color: #FEBA43; text-align: center; margin-bottom: 30px;">
      Welcome to Trimly – Where Style Begins! 💈
   </h2>
   
   <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
      Your grooming experience just got better! Book appointments, discover nearest & top barbers, and keep your style sharp. ✨
   </p>
   
   <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
      <p style="margin-bottom: 10px; font-size: 16px;">Your verification code is:</p>
      <h1 style="background-color: #f2f2f2; color: #FEBA43; font-size: 36px; margin: 10px 0; padding: 20px; border-radius: 8px; letter-spacing: 5px;">
         \${otp}
      </h1>
      <p style="color: #666; font-size: 14px;">
         ⏰ Code expires in 2 minutes
      </p>
   </div>
   
   <p style="font-size: 14px; color: #666; margin-top: 20px;">
      🔒 For your security, please don't share this code with anyone.
   </p>
   
   <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
      <p style="font-size: 14px; color: #888;">
         Need help? We're here for you! 💡<br>
         Contact us at <a href="mailto:support@trimly.in" style="color: #FEBA43; text-decoration: none;">support@trimly.in</a>
      </p>
   </div>

   <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
      © ${new Date().getFullYear()} Trimly. All rights reserved.
   </div>
</div>
`;

export const PASSWORD_RESET_MAIL_CONTENT = (
	resetLink: string
) => `<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background: #fff;">
   <!-- Logo Text Section -->
   <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="font-size: 48px; font-weight: bold; margin: 0;">
         ✂️ <span style="color: #FEBA43;">Trimly</span>
      </h1>
   </div>

   <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="color: #FEBA43; font-size: 28px; margin: 0;">
         Password Reset Request 🔐
      </h2>
      <p style="color: #666; font-size: 16px; margin: 10px 0 0 0;">
         Don't worry, we'll help you get back in style! ✨
      </p>
   </div>

   <div style="border-radius: 15px; padding: 25px; margin-bottom: 25px; background: linear-gradient(to bottom, #fff, #fcfcfc);">
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; text-align: center;">
         We received a request to reset your password for your Trimly account. 
         Your security is our top priority! 🛡️
      </p>
      
      <!-- Action Button Section -->
      <div style="border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
         <p style="margin-bottom: 20px; font-size: 16px; color: #444;">
            Click the button below to securely reset your password:
         </p>
         
         <a href="${resetLink}" 
            style="background-color: #FEBA43; color: white; padding: 16px 40px; 
                   text-decoration: none; border-radius: 8px; font-weight: 500; 
                   display: inline-block; margin: 10px 0; font-size: 16px; 
                   box-shadow: 0 2px 4px rgba(254, 186, 67, 0.2); transition: all 0.3s ease;
                   max-width: 100%;"
            onmouseover="this.style.backgroundColor='#E6A936'"
            onmouseout="this.style.backgroundColor='#FEBA43'"
            rel="noopener noreferrer"
         >
            Reset Password 🔐
         </a>

         <p style="color: #666; font-size: 14px; margin-top: 20px;">
            ⏰ For security, this link expires in 10 minutes
         </p>
      </div>
   </div>

   <div style="border-radius: 8px; padding: 20px; margin: 25px 0; background-color: #FFF8E1; box-shadow: 0 2px 8px rgba(254, 186, 67, 0.15);">
      <div style="text-align: left; margin-bottom: 15px; display: flex; align-items: center;">
         <span style="font-size: 24px; margin-right: 10px;">⚠️</span>
         <h3 style="color: #B76E00; margin: 0; font-size: 18px;">Security Reminders</h3>
      </div>
      <ul style="list-style: none; padding: 0; margin: 0;">
         <li style="font-size: 14px; color: #8B5800; margin: 8px 0; display: flex; align-items: center;">
            <span style="color: #FEBA43; margin-right: 8px;">•</span> Never share this link with anyone
         </li>
         <li style="font-size: 14px; color: #8B5800; margin: 8px 0; display: flex; align-items: center;">
            <span style="color: #FEBA43; margin-right: 8px;">•</span> Trimly will never ask for your password
         </li>
         <li style="font-size: 14px; color: #8B5800; margin: 8px 0; display: flex; align-items: center;">
            <span style="color: #FEBA43; margin-right: 8px;">•</span> Ensure you're on our official website before logging in
         </li>
      </ul>
   </div>

   <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
      <p style="font-size: 14px; color: #888;">
         Need help? We're here for you! 💡<br>
         Contact us at <a href="mailto:support@trimly.in" style="color: #FEBA43; text-decoration: none;">support@trimly.in</a>
      </p>
   </div>

   <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
      © ${new Date().getFullYear()} Trimly. All rights reserved.<br>
      <span style="color: #FEBA43;">✦</span> Your Style, Our Priority <span style="color: #FEBA43;">✦</span>
   </div>
</div>`;
