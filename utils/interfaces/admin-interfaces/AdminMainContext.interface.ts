export interface AdminMainContextInterface {
  // pageTitle: string;
  // setPageTitle: (value: string) => void;
  adminData: string;
  setAdminData: (value: string) => void;
  theme: string;
  setTheme: (value: string) => void;
  openSideBar: boolean;
  setOpenSideBar: (value: boolean) => void;
  simpleToastData: SimpleToastData;
  setSimpleToastData: (value : SimpleToastData) => void;
}

export interface SimpleToastData {
  show: boolean;
  message : string;
  status : string;
}