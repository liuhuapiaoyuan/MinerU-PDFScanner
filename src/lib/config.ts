
export const config = {
  apiUrl: 'http://localhost:8080',
  fileUrl: 'http://localhost:8080',
  apiKey: 'your-api-key-here',
};

export function getApiUrl(path:string) {
    return `${config.apiUrl}${path}`;
}