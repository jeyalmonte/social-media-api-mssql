export class Response<T> {
  success: boolean;
  message?: string;
  data?: T;

  constructor(success: boolean, messaje?: string, data?: T) {
    this.success = success;
    this.message = data != null ? messaje : "No se encontraron registros"
    this.data = data;
  }

}