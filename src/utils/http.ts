import { userStore } from '@/stores';

/**
 * 
 * 
 * @param {string} url 
 * @returns {Promise<any>} 
 */
async function get(url: string):Promise<any> {
  const headers: any =  {};

  if (userStore.isLoggedIn) {
    headers['Authorization'] = `Bearer ${userStore.token}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw await response.json();
  }

  const result = await response.json();

  return result;
}

/**
 * 
 * 
 * @param {string} url 
 * @param {any} data 
 * @returns {Promise<any>}
 */
async function post(url: string, data: any): Promise<any> {
  const headers: any =  {
    'Content-Type': 'application/json',
  };

  if (userStore.isLoggedIn) {
    headers['Authorization'] = `Bearer ${userStore.token}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const result = await response.json();

  return result;
}

/**
 * 
 * 
 * @param {string} url 
 * @param {any} data 
 * @returns {Promise<any>}
 */
async function put(url: string, data: any) {
  const headers: any =  {
    'Content-Type': 'application/json',
  };

  if (userStore.isLoggedIn) {
    headers['Authorization'] = `Bearer ${userStore.token}`;
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const result = await response.json();

  return result;
}

export const http = { get, post, put };
