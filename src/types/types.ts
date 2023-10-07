export type UserMap = { [key: string]: UserData };

export type UserData = {
  id: string;
  name: string;
  role: string;
  email: string;
  uuid?: string; // Add the uuid field
  password?: string;
  // Add any other properties you have in your CSV data
};

export type StudentData = {
  Student_Name: string;
  Email: string;
  Course: string;
  Course_Name: string;
  Current_Grade: number;
};

export type Message = {
  id: number;
  type: string;
  text: string
}

export type TelemetryData = {
  Action: string;
  'Component name': string;
  How: string;
}
export type LogEntry = {
  Timestamp: string;
  Message: string;
};
export type ChartDataType = {
  labels: string[],
  datasets: Array<{
    data: number[],
    backgroundColor: string[],
    borderColor: string[],
    borderWidth: number
  }>
};
