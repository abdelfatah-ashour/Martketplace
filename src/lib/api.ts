import { config } from "./config";
const { apiUrl } = config;

export default class Api {
  /**
   * Performs a GET request to the specified URL.
   * @param {string} url - The URL to fetch data from.
   * @returns {Promise<T>} A promise that resolves to the fetched data of type T.
   * @template T - The type of data expected to be fetched.
   */
  async get<T>(url: string) {
    return await fetch(`${apiUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => res as T)
      .catch(() => null);
  }

  /**
   * Performs a POST request to the specified URL with the given body.
   * @param {string} url - The URL to send the POST request to.
   * @param {Record<string, unknown>} body - The body of the POST request.
   * @returns {Promise<T>} A promise that resolves to the response data of type T.
   * @template T - The type of data expected in the response.
   */
  async post<T>(url: string, body: Record<string, unknown>) {
    return await fetch(`${apiUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => res as T)
      .catch(() => null);
  }
}
