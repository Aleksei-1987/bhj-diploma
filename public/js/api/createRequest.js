/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const request = new XMLHttpRequest();

  let url = options.url;
  let requestData = options.data;
  const method = options.method;
  request.responseType = "json";

  if (method === "GET") {
    const data = new URLSearchParams();
    for (const key in requestData) {
      data.append(key, requestData[key]);
    }

    url += "?" + data.toString();

    request.open(method, url);
    request.send();
  } else {
    requestData = new FormData();
    for (const key in options.data) {
      requestData.append(key, options.data[key]);
    }
    request.open(method, url);
    request.send(requestData);
  }

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      options.callback(null, request.response);
    } else {
      options.callback(err);
    }
  };
};

