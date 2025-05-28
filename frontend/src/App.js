import React, { useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import "./App.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

function App() {
  const [formData, setFormData] = useState({
    oasUrl: "https://petstore.swagger.io/v2/swagger.json",
    baseUrl: "",
    authToken: "",
    timeout: 10000,
    retries: 3,
    methods: ["GET", "POST"],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({
    "success": true,
    "summary": {
      "oasUrl": "https://petstore.swagger.io/v2/swagger.json",
      "totalEndpoints": 20,
      "testedEndpoints": 23,
      "successCount": 20,
      "failureCount": 0,
      "successRate": "100.00",
      "methodBreakdown": {
        "POST": {
          "total": 7,
          "success": 7,
          "failure": 0
        },
        "PUT": {
          "total": 2,
          "success": 2,
          "failure": 0
        },
        "GET": {
          "total": 8,
          "success": 8,
          "failure": 0
        },
        "DELETE": {
          "total": 3,
          "success": 3,
          "failure": 0
        }
      },
      "averageResponseTime": "930.52",
      "timestamp": "2025-05-28T10:30:50.469Z"
    },
    "logs": [
      {
        "endpoint": "/pet/{petId}/uploadImage",
        "method": "POST",
        "request": {
          "url": "https://petstore.swagger.io/v2/pet/100/uploadImage",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json",
            "content-type": "multipart/form-data; boundary=--------------------------225927825511982780435493"
          },
          "data": {
            "_overheadLength": 220,
            "_valueLength": 26,
            "_valuesToMeasure": [],
            "writable": false,
            "readable": true,
            "dataSize": 0,
            "maxDataSize": 2097152,
            "pauseStreams": true,
            "_released": true,
            "_streams": [],
            "_currentStream": null,
            "_insideLoop": false,
            "_pendingNext": false,
            "_boundary": "--------------------------225927825511982780435493",
            "_events": {},
            "_eventsCount": 3
          },
          "pathParams": {
            "petId": 100
          }
        },
        "response": {
          "data": {
            "code": 200,
            "type": "unknown",
            "message": "additionalMetadata: Test metadata\nFile uploaded to ./null, 13 bytes"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:30 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 110
        },
        "statusCode": 200,
        "responseTime": 699,
        "timestamp": "2025-05-28T10:30:29.747Z",
        "attempt": 1
      },
      {
        "endpoint": "/pet",
        "method": "POST",
        "request": {
          "url": "https://petstore.swagger.io/v2/pet",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          "data": {
            "id": 661,
            "category": {
              "id": 238,
              "name": "Frankie McClure DDS"
            },
            "name": "Sally Romaguera",
            "photoUrls": [
              "uZhylM1QFRGXKHeyPDFm7Es0bJpXdOMB3di8W",
              "1sWcC7nyM",
              "WgvxypMx63ITG2vV"
            ],
            "tags": [
              {
                "id": 286
              },
              {
                "id": 602,
                "name": "Bryant Hackett"
              },
              {
                "name": "Edwin Haley"
              }
            ],
            "status": "sold"
          },
          "pathParams": {}
        },
        "response": {
          "data": {
            "id": 661,
            "category": {
              "id": 238,
              "name": "Frankie McClure DDS"
            },
            "name": "Sally Romaguera",
            "photoUrls": [
              "uZhylM1QFRGXKHeyPDFm7Es0bJpXdOMB3di8W",
              "1sWcC7nyM",
              "WgvxypMx63ITG2vV"
            ],
            "tags": [
              {
                "id": 286
              },
              {
                "id": 602,
                "name": "Bryant Hackett"
              },
              {
                "id": 0,
                "name": "Edwin Haley"
              }
            ],
            "status": "sold"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:30 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 272
        },
        "statusCode": 200,
        "responseTime": 710,
        "timestamp": "2025-05-28T10:30:30.458Z",
        "attempt": 1
      },
      {
        "endpoint": "/pet",
        "method": "PUT",
        "request": {
          "url": "https://petstore.swagger.io/v2/pet",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          "data": {
            "id": 247,
            "category": {
              "id": 6,
              "name": "Everett Rutherford"
            },
            "name": "Randolph Friesen",
            "photoUrls": [
              "lKmfwrS6bUpw",
              "r6xNWUaWY8lN1xzGeIEN75KRfdb2OvHLDJ7bP"
            ],
            "tags": [
              {
                "id": 252,
                "name": "Lorraine Waelchi"
              },
              {
                "id": 595,
                "name": "Billie MacGyver"
              }
            ],
            "status": "pending"
          },
          "pathParams": {}
        },
        "response": {
          "data": {
            "id": 247,
            "category": {
              "id": 6,
              "name": "Everett Rutherford"
            },
            "name": "Randolph Friesen",
            "photoUrls": [
              "lKmfwrS6bUpw",
              "r6xNWUaWY8lN1xzGeIEN75KRfdb2OvHLDJ7bP"
            ],
            "tags": [
              {
                "id": 252,
                "name": "Lorraine Waelchi"
              },
              {
                "id": 595,
                "name": "Billie MacGyver"
              }
            ],
            "status": "pending"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:31 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 254
        },
        "statusCode": 200,
        "responseTime": 707,
        "timestamp": "2025-05-28T10:30:31.166Z",
        "attempt": 1
      },
      {
        "endpoint": "/pet/findByStatus",
        "method": "GET",
        "request": {
          "url": "https://petstore.swagger.io/v2/pet/findByStatus",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "params": {
            "status": "sold"
          },
          "pathParams": {}
        },
        "response": {
          "data": [
            {
              "id": 9223372036854739000,
              "category": {
                "id": 3000,
                "name": "puppy"
              },
              "name": "dog002",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 4,
                  "name": "dog002"
                }
              ],
              "status": "sold"
            },
            {
              "id": 9,
              "category": {
                "id": 0,
                "name": "cats"
              },
              "name": "King Kong",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 9223372036854740000,
              "name": "Marinus030",
              "photoUrls": [],
              "tags": [],
              "status": "sold"
            },
            {
              "id": 3433,
              "category": {
                "id": 9500,
                "name": "goose"
              },
              "name": "Jake",
              "photoUrls": [
                "www.theda-wunsch.co"
              ],
              "tags": [
                {
                  "id": 8602,
                  "name": "ant"
                }
              ],
              "status": "sold"
            },
            {
              "id": 12,
              "category": {
                "id": 0,
                "name": "dogs"
              },
              "name": "Fido",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 578,
              "category": {
                "id": 0,
                "name": "ShihTzu"
              },
              "name": "Елена",
              "photoUrls": [
                "https://example.com/Bulldog.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Medium"
                }
              ],
              "status": "sold"
            },
            {
              "id": 833,
              "category": {
                "id": 371,
                "name": "Beagle"
              },
              "name": "Иван",
              "photoUrls": [
                "https://example.com/Bulldog.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Giant"
                }
              ],
              "status": "sold"
            },
            {
              "id": 203,
              "category": {
                "id": 147,
                "name": "Chihuahua"
              },
              "name": "Сергей",
              "photoUrls": [
                "https://example.com/Bulldog.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Medium"
                }
              ],
              "status": "sold"
            },
            {
              "id": 842,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "DusYa OG",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 9223372036854776000,
              "category": {
                "id": 3000,
                "name": "puppy"
              },
              "name": "dog002",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 4,
                  "name": "dog002"
                }
              ],
              "status": "sold"
            },
            {
              "id": 13,
              "category": {
                "id": 0,
                "name": "cats"
              },
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 9223372036854776000,
              "category": {
                "id": -4630181,
                "name": "nulla quis pariatur"
              },
              "name": "doggie",
              "photoUrls": [
                "in deserunt esse",
                "ut do occaecat non"
              ],
              "tags": [
                {
                  "id": 32974752,
                  "name": "eiusmod in exercitation mollit ullamco"
                },
                {
                  "id": -97929987,
                  "name": "labore do dolor"
                }
              ],
              "status": "sold"
            },
            {
              "id": 822922,
              "category": {
                "id": -69794609,
                "name": "irure laborum id proident incididunt"
              },
              "name": "doggie",
              "photoUrls": [
                "dolore ipsum qui",
                "fugiat non eiusmod Duis nisi"
              ],
              "tags": [
                {
                  "id": -24720491,
                  "name": "nisi"
                },
                {
                  "id": 87603503,
                  "name": "ut sint enim cillum nisi"
                }
              ],
              "status": "sold"
            },
            {
              "id": 105,
              "category": {
                "id": 451,
                "name": "LabradorRetriever"
              },
              "name": "Елена",
              "photoUrls": [
                "https://example.com/GermanShepherd.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Large"
                }
              ],
              "status": "sold"
            },
            {
              "id": 953,
              "category": {
                "id": 616,
                "name": "LabradorRetriever"
              },
              "name": "Сергей",
              "photoUrls": [
                "https://example.com/GermanShepherd.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Medium"
                }
              ],
              "status": "sold"
            },
            {
              "id": 674,
              "category": {
                "id": 665,
                "name": "Dachshund"
              },
              "name": "Иван",
              "photoUrls": [
                "https://example.com/Poodle.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Large"
                }
              ],
              "status": "sold"
            },
            {
              "id": 598,
              "category": {
                "id": 111,
                "name": "Dachshund"
              },
              "name": "Иван",
              "photoUrls": [
                "https://example.com/Poodle.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Small"
                }
              ],
              "status": "sold"
            },
            {
              "id": 443,
              "category": {
                "id": 326,
                "name": "GermanShepherd"
              },
              "name": "Иван",
              "photoUrls": [
                "https://example.com/Poodle.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Large"
                }
              ],
              "status": "sold"
            },
            {
              "id": 240,
              "category": {
                "id": 227,
                "name": "Bulldog"
              },
              "name": "Дмитрий",
              "photoUrls": [
                "https://example.com/Bulldog.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Small"
                }
              ],
              "status": "sold"
            },
            {
              "id": 1000000000000000000,
              "category": {
                "id": 0,
                "name": "Birds"
              },
              "name": "Tweety",
              "photoUrls": [
                "http://example.com/tweety1.jpg"
              ],
              "tags": [
                {
                  "id": 3,
                  "name": "Canary"
                }
              ],
              "status": "sold"
            },
            {
              "id": 9223372036854776000,
              "category": {
                "id": 1,
                "name": "Dogs"
              },
              "name": "Prashil",
              "photoUrls": [
                "https://example.com/prashil.jpg"
              ],
              "tags": [],
              "status": "sold"
            },
            {
              "id": 9223372036854776000,
              "category": {
                "id": 1,
                "name": "Dogs"
              },
              "name": "Prashik",
              "photoUrls": [
                "https://example.com/prashik.jpg"
              ],
              "tags": [],
              "status": "sold"
            },
            {
              "id": 9223372036854776000,
              "category": {
                "id": 1,
                "name": "Dogs"
              },
              "name": "Prashil",
              "photoUrls": [
                "https://example.com/prashil.jpg"
              ],
              "tags": [],
              "status": "sold"
            },
            {
              "id": 348,
              "category": {
                "id": 476,
                "name": "GoldenRetriever"
              },
              "name": "Анна",
              "photoUrls": [
                "https://example.com/Bulldog.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Medium"
                }
              ],
              "status": "sold"
            },
            {
              "id": 9223372036854776000,
              "category": {
                "id": 1,
                "name": "Dogs"
              },
              "name": "Prashik",
              "photoUrls": [
                "https://example.com/prashik.jpg"
              ],
              "tags": [],
              "status": "sold"
            },
            {
              "id": 12606,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "Cat2",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 130,
              "category": {
                "id": 0,
                "name": "GoldenRetriever"
              },
              "name": "Сергей",
              "photoUrls": [
                "https://example.com/GermanShepherd.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Small"
                }
              ],
              "status": "sold"
            },
            {
              "id": 36845,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "Cat1",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 95538,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "Cat2",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 44071,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "Cat1",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 96339,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "Cat2",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 33664,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "Cat2",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 79703,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "Cat1",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 99999999,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "Cat2",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 27334,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "Cat1",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 67013,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "Cat22",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 169,
              "category": {
                "id": 574,
                "name": "GermanShepherd"
              },
              "name": "Дмитрий",
              "photoUrls": [
                "https://example.com/Poodle.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Giant"
                }
              ],
              "status": "sold"
            },
            {
              "id": 675,
              "category": {
                "id": 489,
                "name": "Bulldog"
              },
              "name": "Ольга",
              "photoUrls": [
                "https://example.com/LabradorRetriever.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Small"
                }
              ],
              "status": "sold"
            },
            {
              "id": 873,
              "category": {
                "id": 0,
                "name": "Poodle"
              },
              "name": "Иван",
              "photoUrls": [
                "https://example.com/GermanShepherd.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Medium"
                }
              ],
              "status": "sold"
            },
            {
              "id": 71970,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "Cat22",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 937,
              "category": {
                "id": 341,
                "name": "ePembrokeWelshCorgi"
              },
              "name": "Сергей",
              "photoUrls": [
                "https://example.com/GermanShepherd.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Large"
                }
              ],
              "status": "sold"
            },
            {
              "id": 340,
              "category": {
                "id": 0,
                "name": "Doberman"
              },
              "name": "Ольга",
              "photoUrls": [
                "https://example.com/Bulldog.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Small"
                }
              ],
              "status": "sold"
            },
            {
              "id": 950,
              "category": {
                "id": 589,
                "name": "Doberman"
              },
              "name": "Дмитрий",
              "photoUrls": [
                "https://example.com/Poodle.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Small"
                }
              ],
              "status": "sold"
            },
            {
              "id": 354,
              "category": {
                "id": 413,
                "name": "Poodle"
              },
              "name": "Елена",
              "photoUrls": [
                "https://example.com/GermanShepherd.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Giant"
                }
              ],
              "status": "sold"
            },
            {
              "id": 913,
              "category": {
                "id": 466,
                "name": "ePembrokeWelshCorgi"
              },
              "name": "Иван",
              "photoUrls": [
                "https://example.com/Bulldog.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Large"
                }
              ],
              "status": "sold"
            },
            {
              "id": 188,
              "category": {
                "id": 578,
                "name": "GermanShepherd"
              },
              "name": "Иван",
              "photoUrls": [
                "https://example.com/GermanShepherd.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Giant"
                }
              ],
              "status": "sold"
            },
            {
              "id": 810,
              "category": {
                "id": 984,
                "name": "SiberianHusky"
              },
              "name": "Дмитрий",
              "photoUrls": [
                "https://example.com/GermanShepherd.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Large"
                }
              ],
              "status": "sold"
            },
            {
              "id": 302,
              "category": {
                "id": 103,
                "name": "Rabbits"
              },
              "name": "Sushi",
              "photoUrls": [
                "https://example.com/photos/buddy1.jpg"
              ],
              "tags": [
                {
                  "id": 101,
                  "name": "colorful"
                }
              ],
              "status": "sold"
            },
            {
              "id": 717,
              "category": {
                "id": 736,
                "name": "GreatDan"
              },
              "name": "Ольга",
              "photoUrls": [
                "https://example.com/Poodle.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Giant"
                }
              ],
              "status": "sold"
            },
            {
              "id": 871,
              "category": {
                "id": 129,
                "name": "Boxer"
              },
              "name": "Ольга",
              "photoUrls": [
                "https://example.com/GermanShepherd.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Giant"
                }
              ],
              "status": "sold"
            },
            {
              "id": 111,
              "category": {
                "id": 2,
                "name": "dogs"
              },
              "name": "Sharik",
              "photoUrls": [
                "stepik.org"
              ],
              "tags": [
                {
                  "id": 1,
                  "name": "cute"
                }
              ],
              "status": "sold"
            },
            {
              "id": 503,
              "category": {
                "id": 0,
                "name": "GermanShepherd"
              },
              "name": "Елена",
              "photoUrls": [
                "https://example.com/Poodle.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Giant"
                }
              ],
              "status": "sold"
            },
            {
              "id": 307,
              "category": {
                "id": 624,
                "name": "Poodle"
              },
              "name": "Анна",
              "photoUrls": [
                "https://example.com/Poodle.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Small"
                }
              ],
              "status": "sold"
            },
            {
              "id": 123123,
              "category": {
                "id": 0,
                "name": "cats"
              },
              "name": "Барсик",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "sold"
            },
            {
              "id": 28,
              "category": {
                "id": 448,
                "name": "Rottweiler"
              },
              "name": "Дмитрий",
              "photoUrls": [
                "https://example.com/Bulldog.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Large"
                }
              ],
              "status": "sold"
            },
            {
              "id": 278,
              "category": {
                "id": 755,
                "name": "Dachshund"
              },
              "name": "Дмитрий",
              "photoUrls": [
                "https://example.com/GermanShepherd.jpg"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "Large"
                }
              ],
              "status": "sold"
            },
            {
              "id": 455,
              "category": {
                "id": 616,
                "name": "Enrique Jerde"
              },
              "name": "Candice McDermott",
              "photoUrls": [
                "ZJdINWwgrnDDJwDi63xvRy",
                "CfwgaWYtmaJwDbT",
                "QBSfzwDk"
              ],
              "tags": [
                {
                  "id": 616,
                  "name": "Judy Gusikowski"
                },
                {
                  "id": 823
                },
                {
                  "id": 30,
                  "name": "Rene Tillman"
                }
              ],
              "status": "sold"
            },
            {
              "id": 661,
              "category": {
                "id": 238,
                "name": "Frankie McClure DDS"
              },
              "name": "Sally Romaguera",
              "photoUrls": [
                "uZhylM1QFRGXKHeyPDFm7Es0bJpXdOMB3di8W",
                "1sWcC7nyM",
                "WgvxypMx63ITG2vV"
              ],
              "tags": [
                {
                  "id": 286
                },
                {
                  "id": 602,
                  "name": "Bryant Hackett"
                },
                {
                  "id": 0,
                  "name": "Edwin Haley"
                }
              ],
              "status": "sold"
            }
          ],
          "headers": {
            "date": "Wed, 28 May 2025 10:30:32 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 9433
        },
        "statusCode": 200,
        "responseTime": 695,
        "timestamp": "2025-05-28T10:30:31.863Z",
        "attempt": 1
      },
      {
        "endpoint": "/pet/findByTags",
        "method": "GET",
        "request": {
          "url": "https://petstore.swagger.io/v2/pet/findByTags",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "params": {
            "tags": "bird"
          },
          "pathParams": {}
        },
        "response": {
          "data": [],
          "headers": {
            "date": "Wed, 28 May 2025 10:30:32 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 2
        },
        "statusCode": 200,
        "responseTime": 712,
        "timestamp": "2025-05-28T10:30:32.576Z",
        "attempt": 1
      },
      {
        "endpoint": "/pet/{petId}",
        "method": "GET",
        "request": {
          "url": "https://petstore.swagger.io/v2/pet/2",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "pathParams": {
            "petId": 2
          }
        },
        "response": {
          "data": {
            "id": 2,
            "name": "Sea Serpent",
            "photoUrls": [],
            "tags": [],
            "status": "available"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:36 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 75
        },
        "statusCode": 200,
        "responseTime": 3819,
        "timestamp": "2025-05-28T10:30:36.396Z",
        "attempt": 1
      },
      {
        "endpoint": "/pet/{petId}",
        "method": "POST",
        "request": {
          "url": "https://petstore.swagger.io/v2/pet/2",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": "name=Test+Pet&status=available",
          "pathParams": {
            "petId": 2
          }
        },
        "response": {
          "data": {
            "code": 200,
            "type": "unknown",
            "message": "2"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:37 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 43
        },
        "statusCode": 200,
        "responseTime": 711,
        "timestamp": "2025-05-28T10:30:37.108Z",
        "attempt": 1
      },
      {
        "endpoint": "/pet/{petId}",
        "method": "DELETE",
        "request": {
          "url": "https://petstore.swagger.io/v2/pet/10",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "pathParams": {
            "petId": 10
          }
        },
        "response": {
          "data": {
            "code": 200,
            "type": "unknown",
            "message": "10"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:38 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 44
        },
        "statusCode": 200,
        "responseTime": 674,
        "timestamp": "2025-05-28T10:30:37.783Z",
        "attempt": 1
      },
      {
        "endpoint": "/store/inventory",
        "method": "GET",
        "request": {
          "url": "https://petstore.swagger.io/v2/store/inventory",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "pathParams": {}
        },
        "response": {
          "data": {
            "5674": 1,
            "12345": 1,
            "sold": 58,
            "studying": 1,
            "string": 458,
            "unavailable": 1,
            "pending": 21,
            "available": 370,
            "kjnk": 1,
            "peric": 4,
            "Unavailable": 1,
            "Not available": 1
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:38 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 154
        },
        "statusCode": 200,
        "responseTime": 687,
        "timestamp": "2025-05-28T10:30:38.471Z",
        "attempt": 1
      },
      {
        "endpoint": "/store/order",
        "method": "POST",
        "request": {
          "url": "https://petstore.swagger.io/v2/store/order",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          "data": {
            "id": 516,
            "petId": 100,
            "shipDate": "2025-05-27T14:04:05.139Z",
            "status": "delivered",
            "complete": true
          },
          "pathParams": {}
        },
        "response": {
          "data": {
            "id": 516,
            "petId": 100,
            "quantity": 0,
            "shipDate": "2025-05-27T14:04:05.139+0000",
            "status": "delivered",
            "complete": true
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:39 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 114
        },
        "statusCode": 200,
        "responseTime": 691,
        "timestamp": "2025-05-28T10:30:39.163Z",
        "attempt": 1
      },
      {
        "endpoint": "/store/order/{orderId}",
        "method": "GET",
        "request": {
          "url": "https://petstore.swagger.io/v2/store/order/10",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "pathParams": {
            "orderId": 10
          }
        },
        "response": {
          "data": {
            "code": 1,
            "type": "error",
            "message": "Order not found"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:40 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 53
        },
        "statusCode": 404,
        "responseTime": 689,
        "timestamp": "2025-05-28T10:30:39.853Z",
        "attempt": 1
      },
      {
        "endpoint": "/store/order/{orderId}",
        "method": "GET",
        "request": {
          "url": "https://petstore.swagger.io/v2/store/order/1",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "pathParams": {
            "orderId": 1
          }
        },
        "response": {
          "data": {
            "id": 1,
            "petId": 0,
            "quantity": 0,
            "shipDate": "2023-03-27T02:14:59.643+0000",
            "status": "placed",
            "complete": true
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:40 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 107
        },
        "statusCode": 200,
        "responseTime": 733,
        "timestamp": "2025-05-28T10:30:40.587Z",
        "attempt": 2
      },
      {
        "endpoint": "/store/order/{orderId}",
        "method": "DELETE",
        "request": {
          "url": "https://petstore.swagger.io/v2/store/order/3",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "pathParams": {
            "orderId": 3
          }
        },
        "response": {
          "data": {
            "code": 404,
            "type": "unknown",
            "message": "Order Not Found"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:42 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 57
        },
        "statusCode": 404,
        "responseTime": 1800,
        "timestamp": "2025-05-28T10:30:42.389Z",
        "attempt": 1
      },
      {
        "endpoint": "/store/order/{orderId}",
        "method": "DELETE",
        "request": {
          "url": "https://petstore.swagger.io/v2/store/order/3",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "pathParams": {
            "orderId": 3
          }
        },
        "response": {
          "data": {
            "code": 404,
            "type": "unknown",
            "message": "Order Not Found"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:43 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 57
        },
        "statusCode": 404,
        "responseTime": 674,
        "timestamp": "2025-05-28T10:30:43.063Z",
        "attempt": 2
      },
      {
        "endpoint": "/store/order/{orderId}",
        "method": "DELETE",
        "request": {
          "url": "https://petstore.swagger.io/v2/store/order/10",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "pathParams": {
            "orderId": 10
          }
        },
        "response": {
          "data": {
            "code": 200,
            "type": "unknown",
            "message": "10"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:44 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 44
        },
        "statusCode": 200,
        "responseTime": 720,
        "timestamp": "2025-05-28T10:30:43.783Z",
        "attempt": 3
      },
      {
        "endpoint": "/user/createWithList",
        "method": "POST",
        "request": {
          "url": "https://petstore.swagger.io/v2/user/createWithList",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          "data": [
            {
              "id": 702,
              "username": "Darron_OConnell",
              "firstName": "Ellie",
              "email": "Katheryn_Kihn43@gmail.com",
              "password": "ho3I8yoP",
              "phone": "1-865-657-5548 x681",
              "userStatus": 2,
              "lastName": "McLaughlin"
            },
            {
              "id": 307,
              "username": "Erik.Funk",
              "firstName": "Delmer",
              "lastName": "Emmerich",
              "email": "Annie_Heidenreich20@gmail.com",
              "password": "8RwXrtGc5brHjzRVaC0AOrZyPRlH97"
            }
          ],
          "pathParams": {}
        },
        "response": {
          "data": {
            "code": 200,
            "type": "unknown",
            "message": "ok"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:44 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 44
        },
        "statusCode": 200,
        "responseTime": 707,
        "timestamp": "2025-05-28T10:30:44.491Z",
        "attempt": 1
      },
      {
        "endpoint": "/user/{username}",
        "method": "GET",
        "request": {
          "url": "https://petstore.swagger.io/v2/user/testuser",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "pathParams": {
            "username": "testuser"
          }
        },
        "response": {
          "data": {
            "id": 9223372036854755000,
            "username": "testuser",
            "firstName": "string",
            "lastName": "string",
            "email": "string",
            "password": "string",
            "phone": "string",
            "userStatus": 0
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:45 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 158
        },
        "statusCode": 200,
        "responseTime": 700,
        "timestamp": "2025-05-28T10:30:45.192Z",
        "attempt": 1
      },
      {
        "endpoint": "/user/{username}",
        "method": "PUT",
        "request": {
          "url": "https://petstore.swagger.io/v2/user/testuser",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          "data": {
            "id": 104,
            "username": "Chase.Price27",
            "firstName": "Adan",
            "lastName": "Kunze",
            "email": "Darron14@yahoo.com",
            "password": "bQqDLlujru3MeYFobRTgNuaPsf",
            "phone": "(823) 629-4411 x239",
            "userStatus": 0
          },
          "pathParams": {
            "username": "testuser"
          }
        },
        "response": {
          "data": {
            "code": 200,
            "type": "unknown",
            "message": "104"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:46 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 45
        },
        "statusCode": 200,
        "responseTime": 699,
        "timestamp": "2025-05-28T10:30:45.892Z",
        "attempt": 1
      },
      {
        "endpoint": "/user/{username}",
        "method": "DELETE",
        "request": {
          "url": "https://petstore.swagger.io/v2/user/testuser",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "pathParams": {
            "username": "testuser"
          }
        },
        "response": {
          "data": {
            "code": 200,
            "type": "unknown",
            "message": "testuser"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:46 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 50
        },
        "statusCode": 200,
        "responseTime": 675,
        "timestamp": "2025-05-28T10:30:46.567Z",
        "attempt": 1
      },
      {
        "endpoint": "/user/login",
        "method": "GET",
        "request": {
          "url": "https://petstore.swagger.io/v2/user/login",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "params": {
            "username": "testuser",
            "password": "testpass123"
          },
          "pathParams": {}
        },
        "response": {
          "data": {
            "code": 200,
            "type": "unknown",
            "message": "logged in user session:1748428248689"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:48 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "x-expires-after": "Wed May 28 11:30:48 UTC 2025",
            "x-rate-limit": "5000",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 78
        },
        "statusCode": 200,
        "responseTime": 1751,
        "timestamp": "2025-05-28T10:30:48.318Z",
        "attempt": 1
      },
      {
        "endpoint": "/user/logout",
        "method": "GET",
        "request": {
          "url": "https://petstore.swagger.io/v2/user/logout",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json"
          },
          "pathParams": {}
        },
        "response": {
          "data": {
            "code": 200,
            "type": "unknown",
            "message": "ok"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:49 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 44
        },
        "statusCode": 200,
        "responseTime": 711,
        "timestamp": "2025-05-28T10:30:49.029Z",
        "attempt": 1
      },
      {
        "endpoint": "/user/createWithArray",
        "method": "POST",
        "request": {
          "url": "https://petstore.swagger.io/v2/user/createWithArray",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          "data": [
            {
              "id": 915,
              "username": "Colt93",
              "firstName": "Elijah",
              "lastName": "West",
              "email": "Demario.Trantow97@hotmail.com",
              "password": "BKyJFlpD84P6YtsNOWdQvQq66mnvk",
              "phone": "(411) 288-2999 x8628",
              "userStatus": 1
            },
            {
              "id": 64,
              "username": "Tavares_Block33",
              "lastName": "O'Kon",
              "email": "Dasia70@yahoo.com",
              "password": "9GBtW06d9",
              "phone": "(914) 852-5107 x1903",
              "userStatus": 0,
              "firstName": "Georgiana"
            }
          ],
          "pathParams": {}
        },
        "response": {
          "data": {
            "code": 200,
            "type": "unknown",
            "message": "ok"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:50 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 44
        },
        "statusCode": 200,
        "responseTime": 722,
        "timestamp": "2025-05-28T10:30:49.752Z",
        "attempt": 1
      },
      {
        "endpoint": "/user",
        "method": "POST",
        "request": {
          "url": "https://petstore.swagger.io/v2/user",
          "headers": {
            "User-Agent": "REST-API-Evaluator/1.0",
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          "data": {
            "id": 550,
            "username": "Ward.Wintheiser34",
            "firstName": "Kadin",
            "lastName": "Pollich",
            "email": "Terrence.Ryan56@hotmail.com",
            "password": "am1u4Q6brJ3jvdAlIcIYCpV",
            "phone": "1-326-826-2142",
            "userStatus": 2
          },
          "pathParams": {}
        },
        "response": {
          "data": {
            "code": 200,
            "type": "unknown",
            "message": "550"
          },
          "headers": {
            "date": "Wed, 28 May 2025 10:30:50 GMT",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
            "connection": "close",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, DELETE, PUT",
            "access-control-allow-headers": "Content-Type, api_key, Authorization",
            "server": "Jetty(9.2.9.v20150224)"
          },
          "size": 45
        },
        "statusCode": 200,
        "responseTime": 716,
        "timestamp": "2025-05-28T10:30:50.469Z",
        "attempt": 1
      }
    ],
    "endpoints": [
      {
        "path": "/pet/{petId}/uploadImage",
        "method": "POST",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/pet",
        "method": "POST",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/pet",
        "method": "PUT",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/pet/findByStatus",
        "method": "GET",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/pet/findByTags",
        "method": "GET",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/pet/{petId}",
        "method": "GET",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/pet/{petId}",
        "method": "POST",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/pet/{petId}",
        "method": "DELETE",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/store/inventory",
        "method": "GET",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/store/order",
        "method": "POST",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/store/order/{orderId}",
        "method": "GET",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/store/order/{orderId}",
        "method": "DELETE",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/user/createWithList",
        "method": "POST",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/user/{username}",
        "method": "GET",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/user/{username}",
        "method": "PUT",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/user/{username}",
        "method": "DELETE",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/user/login",
        "method": "GET",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/user/logout",
        "method": "GET",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/user/createWithArray",
        "method": "POST",
        "baseUrl": "https://petstore.swagger.io/v2"
      },
      {
        "path": "/user",
        "method": "POST",
        "baseUrl": "https://petstore.swagger.io/v2"
      }
    ]
  });
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMethodChange = (method, checked) => {
    setFormData((prev) => ({
      ...prev,
      methods: checked
        ? [...prev.methods, method]
        : prev.methods.filter((m) => m !== method),
    }));
  };

  const handleEvaluate = async () => {
    setResults(null);
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/evaluate`, formData);
      setResults(response.data);
      setActiveTab("summary");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!results) return;

    const csvData = results.logs.map((log) => ({
      endpoint: log.endpoint,
      method: log.method,
      statusCode: log.statusCode,
      responseTime: log.responseTime || 0,
      timestamp: log.timestamp,
      success: log.statusCode >= 200 && log.statusCode < 400 ? "Yes" : "No",
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `api-evaluation-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderConfigForm = () => (
    <div className="config-section">
      <h2>🔧 API Configuration</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="oasUrl">OpenAPI Specification URL *</label>
          <input
            id="oasUrl"
            type="text"
            value={formData.oasUrl}
            onChange={(e) => handleInputChange("oasUrl", e.target.value)}
            placeholder="https://api.example.com/openapi.json"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="baseUrl">Base URL (optional)</label>
          <input
            id="baseUrl"
            type="text"
            value={formData.baseUrl}
            onChange={(e) => handleInputChange("baseUrl", e.target.value)}
            placeholder="https://api.example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="authToken">🔐 Authentication Token (optional)</label>
          <input
            id="authToken"
            type="password"
            value={formData.authToken}
            onChange={(e) => handleInputChange("authToken", e.target.value)}
            placeholder="Bearer token for authenticated endpoints"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="timeout">⏱️ Timeout (ms)</label>
            <input
              id="timeout"
              type="number"
              value={formData.timeout}
              onChange={(e) => handleInputChange("timeout", parseInt(e.target.value))}
              min="1000"
              max="60000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="retries">🔄 Retry Attempts</label>
            <input
              id="retries"
              type="number"
              value={formData.retries}
              onChange={(e) => handleInputChange("retries", parseInt(e.target.value))}
              min="1"
              max="5"
            />
          </div>
        </div>

        <div className="form-group">
          <label>HTTP Methods to Test</label>
          <div className="methods-grid">
            {["GET", "POST", "PUT", "DELETE", "PATCH"].map((method) => (
              <label key={method} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.methods.includes(method)}
                  onChange={(e) => handleMethodChange(method, e.target.checked)}
                />
                <span className={`method-badge method-${method.toLowerCase()}`}>{method}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          className="evaluate-btn"
          onClick={handleEvaluate}
          disabled={isLoading || !formData.oasUrl}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Evaluating API...
            </>
          ) : (
            "🚀 Start Evaluation"
          )}
        </button>
      </div>
    </div>
  );

  const renderSummary = () => {
    if (!results) return null;

    const { summary } = results;

    const successFailureChart = {
      labels: ["Successful", "Failed"],
      datasets: [
        {
          label: "Test Results",
          data: [summary.successCount, summary.failureCount],
          backgroundColor: ["#10B981", "#EF4444"],
          borderColor: ["#059669", "#DC2626"],
          borderWidth: 2,
        },
      ],
    };

    const methodBreakdownChart = {
      labels: Object.keys(summary.methodBreakdown || {}),
      datasets: [
        {
          label: "Success Rate by Method",
          data: Object.values(summary.methodBreakdown || {}).map((stats) =>
            stats.total > 0 ? ((stats.success / stats.total) * 100).toFixed(1) : 0
          ),
          backgroundColor: [
            "#3B82F6", // GET - Blue
            "#10B981", // POST - Green
            "#F59E0B", // PUT - Yellow
            "#EF4444", // DELETE - Red
            "#8B5CF6", // PATCH - Purple
          ],
          borderWidth: 2,
        },
      ],
    };

    const responseTimeChart = {
      labels: results.logs.map((log, index) => `${log.method} ${index + 1}`),
      datasets: [
        {
          label: "Response Time (ms)",
          data: results.logs.map((log) => log.responseTime || 0),
          borderColor: "#6366F1",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          tension: 0.4,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        x: {
          type: "category",
        },
        y: {
          type: "linear",
          beginAtZero: true,
        },
      },
    };

    return (
      <div className="summary-section">
        <div className="summary-header">
          <h2>📊 Evaluation Summary</h2>
          <button className="export-btn" onClick={exportToCSV}>
            📥 Export CSV
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>Total Endpoints</h3>
              <p>{summary.totalEndpoints}</p>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Successful</h3>
              <p>{summary.successCount}</p>
            </div>
          </div>

          <div className="stat-card failure">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <h3>Failed</h3>
              <p>{summary.failureCount}</p>
            </div>
          </div>

          <div className="stat-card rate">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <h3>Success Rate</h3>
              <p>{summary.successRate ? Number(summary.successRate).toFixed(2) : "0"}%</p>
            </div>
          </div>

          {summary.averageResponseTime && (
            <div className="stat-card time">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <h3>Avg Response Time</h3>
                <p>{summary.averageResponseTime}ms</p>
              </div>
            </div>
          )}
        </div>

        <div className="progress-section">
          <div className="progress-header">
            <span>Overall Progress</span>
            <p>{summary.successRate ? Number(summary.successRate).toFixed(2) : "0"}%</p>

          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${summary.successRate}%` }}
            ></div>
          </div>
        </div>

        {/* Method Breakdown */}
        <div className="container my-4">
          <div className="card shadow-sm p-3">
            <h5 className="text-primary mb-3">API Summary</h5>
            <div className="mb-2">
              <strong>Total:</strong> {results?.summary?.total}
            </div>
            <div className="d-flex flex-wrap gap-2">
              {Object.entries(results?.summary?.methodBreakdown).map(([key, value]) => (
                <span key={key} className="badge bg-light text-dark border border-primary px-3 py-2">
                  <strong>{key}</strong>: {value?.total}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h3>Success vs Failure</h3>
            <div className="chart-wrapper">
              <Bar data={successFailureChart} options={chartOptions} />
            </div>
          </div>

          {Object.keys(summary.methodBreakdown || {}).length > 0 && (
            <div className="chart-container">
              <h3>Success Rate by Method</h3>
              <div className="chart-wrapper">
                <Bar data={methodBreakdownChart} options={chartOptions} />
              </div>
            </div>
          )}

          {results.logs.some((log) => log.responseTime) && (
            <div className="chart-container full-width">
              <h3>Response Times</h3>
              <div className="chart-wrapper">
                <Line data={responseTimeChart} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderLogs = () => {
    if (!results) return null;

    return (
      <div className="logs-section">
        <h2>📋 Detailed Logs</h2>
        <div className="logs-container">
          {results.logs.map((log, index) => (
            <div key={index} className="log-card">
              <div className="log-header">
                <span className={`method-badge method-${log.method.toLowerCase()}`}>
                  {log.method}
                </span>
                <span className="endpoint">{log.endpoint}</span>
                <span
                  className={`status-code ${log.statusCode >= 200 && log.statusCode < 400 ? "success" : "failure"
                    }`}
                >
                  {log.statusCode || "Error"}
                </span>
                {log.responseTime && (
                  <span className="response-time">{log.responseTime}ms</span>
                )}
              </div>

              {log.request && (
                <div className="log-detail">
                  <h4>📤 Request:</h4>
                  <pre className="json-display">
                    {JSON.stringify(log.request, null, 2)}
                  </pre>
                </div>
              )}

              <div className="log-detail">
                <h4>📥 Response:</h4>
                <pre className="json-display">
                  {JSON.stringify(log.response || { error: log.error }, null, 2)}
                </pre>
              </div>

              {log.timestamp && (
                <div className="log-timestamp">
                  🕒 {new Date(log.timestamp).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🚀 REST API Evaluator</h1>
          <p>Comprehensive testing and evaluation of REST APIs using OpenAPI specifications</p>
        </div>
      </header>

      <main className="main-content">
        {renderConfigForm()}

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {results && (
          <div className="results-container">
            <div className="tabs">
              <button
                className={`tab ${activeTab === "summary" ? "active" : ""}`}
                onClick={() => setActiveTab("summary")}
              >
                📊 Summary
              </button>
              <button
                className={`tab ${activeTab === "logs" ? "active" : ""}`}
                onClick={() => setActiveTab("logs")}
              >
                📋 Detailed Logs
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "summary" && renderSummary()}
              {activeTab === "logs" && renderLogs()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
