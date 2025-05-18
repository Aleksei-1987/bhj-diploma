/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const request = new XMLHttpRequest();

  let requestData = options.data;

  request.responseType = "json";

  if (options.method === "GET") {
    const params = new URLSearchParams();
    for (const key in requestData) {
      params.append(key, requestData[key]);
    }
    options.url += "?" + params.toString();
  } else {
    requestData = new FormData();
    for (const key in options.data) {
      requestData.append(key, options.data[key]);
    }
  }

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      options.callback(null, request.response);
    }
  };

  request.open(options.method, options.url, true);
  try {
    request.send(requestData);
  } catch (err) {
    options.callback(err, null);
  }

  return request;
};
