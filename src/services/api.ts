import { API_URL } from "@/config";

//this is for custimizing error message depending where it is
export interface IError {
  message: string;
  key: string;
}
export interface IResponse<T> {
  data: T;
  error: IError[];
  status: number;
  success: boolean;
  errorMessage: string;
}

const GET = async <T>(url: string) => {
  let response = await fetch(`${API_URL}/${url}`);
  return await handleResponse<T>(response);
};

const PUT = async <T>(url: string, body: any) => {
  let response = await fetch(`${API_URL}/${url}`, {
    method: "PUT", // Add method
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await handleResponse<T>(response);
};

const POST = async <T>(url: string, body: any) => {
  let response = await fetch(`${API_URL}/${url}`, {
    method: "POST", // Add method
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await handleResponse<T>(response);
};

const handleResponse = async <T>(response: Response) => {
  let responseObject = {} as IResponse<T>;
  if (response.ok) {
    responseObject.data = await response.json();
  } else {
    try {
      responseObject.error = await response.json();
    } catch (error) {
      responseObject.errorMessage = await response.text();
    }
  }

  responseObject.success = response.ok;
  responseObject.status = response.status;

  return responseObject;
};

export { GET, POST, PUT };
