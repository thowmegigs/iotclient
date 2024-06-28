export interface ICategory {
  id: number;
  title: string;
}

export type UStatus = "pending" | "active" | "blocked";

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  alternate_phone:string;
  address:string;
  company_name:string;
  company_address:string;
  role: string;
  status:UStatus;
  password:string;
  plan?:IPlan;
}

export interface IPlan {
  id: number;
  name: string;
 limit:number;
}
export interface IRole {
  id: any;

  name: string;
 permissions:IPermission;
}

 export type permRecordType={create:boolean,edit:boolean,delete:boolean,owned:boolean,list:boolean,show:boolean}
 export type actionType="create"|"edit"|"delete"|"owned"|"list"|"show";
export interface IPermission {
  [key: string]: permRecordType
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
