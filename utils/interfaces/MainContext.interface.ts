export interface MainContextInterface {
  simpleToastData: SimpleToastData;
  setSimpleToastData: (value : SimpleToastData) => void;
}

export interface SimpleToastData {
  show: boolean;
  message : string ,
  status : string 
}