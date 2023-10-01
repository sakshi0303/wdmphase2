export type UserData = {
    id: string;
    name: string;
    role: string;
    email: string;
    uuid?: string; // Add the uuid field
    password?: string;
    // Add any other properties you have in your CSV data
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