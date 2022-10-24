export interface Basic{
 
  name: string;
  email: string;
  password: string;
  
}

export interface Contact{
  phone: string;
  birthday: Date;
  gender: string;
  address: string;
  type: string;
}

export interface Education{
  skill:string;
  experience:string;
}


export interface UserCreate{
  profile:string;
  basic: Basic
  contact: Contact;
  education: Education;
created_user_id:any
}