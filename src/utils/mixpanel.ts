import mixpanel from "mixpanel-browser";


export interface LoginUser {
  id: string;
  email: string;
  name?: string;
  userName?: string;
}

export interface SignupUser {
  id: string;
  email: string;
  name?: string;
  userName: string;
}


export const userLoginTrack = (user: LoginUser) => {

  mixpanel.identify(user.id);

  mixpanel.people.set({
    $email: user.email,
    $name: user.name,
    userName: user.userName,
    "Last Login Date": new Date().toISOString(),
  });

  mixpanel.track("User Logged In", {
    user_id: user.id,
    email: user.email,
    login_method: "otp",
    time: new Date().toISOString(),
  });
};


export const userSignupTrack = (user: SignupUser) => {

  mixpanel.identify(user.id);

  mixpanel.people.set({
    $email: user.email,
    $name: user.name,
    userName: user.userName,
    "Signup Date": new Date().toISOString(),
  });

  mixpanel.track("User Signed Up", {
    user_id: user.id,
    email: user.email,
    signup_method: "otp",
    time: new Date().toISOString(),
  });
};


export const userLogoutTrack = () => {
  mixpanel.track("User Logged Out", {
    time: new Date().toISOString(),
  });

  mixpanel.reset();
};