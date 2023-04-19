import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";

export default function MainComponent() {
  //States used
  const [cardShow, setCardShow] = useState(false);
  const [headerValue, setHeaderValue] = useState(false);
  const [addHeader , setAddHeader] = useState("")
  const [options, setOptions] = useState("GET");
  const [mykeyval, setMyKeyVal] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [bodyShow, setBodyShow] = useState("");
  const [url, setURL] = useState("");
  const [data, setData] = useState("Your Response Here");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [statusText, setStatusText] = useState("");
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    if (url !== "") {
      const newUrl = new URL(url);
      const searchParams = newUrl.searchParams;
      console.log(searchParams);
      searchParams.forEach((_, Key) => {
        if (Key !== key) {
          searchParams.delete(Key);
        }
      });
      if (value || key) {
        newUrl.searchParams.set(key,value);
      } else {
        newUrl.searchParams.delete(key,value);
      }
      setURL(newUrl)
    }
  }, [key, value]);
  
  // Function to check all the methods
  function ValidateMethod() { 
    switch (options) {
      case 'POST':
        axios
          .post(url , JSON.parse(mykeyval))
          .then((res) => {
            setData(res.data);
            setError("");
            setMyKeyVal("");
            setBodyShow(false);
            setMyKeyVal("")
            setAddHeader("")
          })
        break;
      case 'PUT':
        axios.put(url, JSON.parse(mykeyval)).then((res) => {
          console.log(res.data);
          setData(res.data);
          setStatus(res.status)
          setStatusText(res.statusText)
          setMyKeyVal("")
          setAddHeader("")
        })
        break;
      case 'DELETE':
        axios.delete(`${url}`).then((res) => {
          setData(res.data);
          setError("");
          setBodyShow(false);
          setAddHeader("")
          setStatus(res.status)
          setStatusText(res.statusText)
        });
        break;
      default:
        axios.get(url)
          .then((res) => {
          setData(res.data);
          setError("");
          setStatus(res.status)
          setStatusText(res.statusText)
            setQueryParams(false)
            setAddHeader("")
        });
        break;
    }
  }

  //On submit the url and to get the response
  const handleSubmit = () => {
    //Using Try catch block so that if any error comes then it goes to the catch block
    try {
      
      // Using interceptors request and response for loader
      axios.interceptors.request.use((request) => {
        document.getElementById('overlay').style.display = "block";
        return request;
      })
      axios.interceptors.response.use((response)=>{
        document.getElementById('overlay').style.display = "none";
        return response;
      })
      ValidateMethod()

      //Handling the Errors if they occured
    } catch (error) {
      setError(error.message);
      setData("");
      setStatus("")
      setStatusText("")
    }
  };
  return (
    <div>
            <div className="container mt-4">
              <div className="row">
                <div className="col">
                  <div className="container text-center">
                    <div className="row">
                      <div className="col">
                        <h1>API Man</h1>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={(e) => setCardShow(true)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                        {cardShow && (
                          <div className="card mt-4">
                            <div className="card-body">
                              <div className="row">
                                <div className="col">
                                  <select
                                    className="btn btn-primary"
                                    value={options}
                                    onChange={(e) => setOptions(e.target.value)}
                                  >
                                    <option
                                      value="GET"
                                      className="btn btn-secondary"
                                    >
                                      GET
                                    </option>
                                    <option
                                      value="POST"
                                      className="btn btn-secondary"
                                    >
                                      POST
                                    </option>
                                    <option
                                      value="PUT"
                                      className="btn btn-secondary"
                                    >
                                      PUT
                                    </option>
                                    <option
                                      value="DELETE"
                                      className="btn btn-secondary"
                                    >
                                      DELETE
                                    </option>
                                  </select>
                                </div>
                                <div className="col">
                                  <input
                                    type="text"
                              style={{ width: 900 }}
                              className='form-control'
                              placeholder="Add your URL"
                              value={url}
                                    onChange={(e) => {
                                      setURL(e.target.value);

                                    }}
                                  />
                                </div>
                                <div className="col">
                                  <button
                                    className="btn btn-primary m-3"
                                    onClick={(e) => {
                                      setHeaderValue(true);
                                      setBodyShow(false);
                                    }}
                                  >
                                    Headers
                                  </button>
                                  {headerValue && (
                                    <div>
                                      <div className="mb-3">
                                        <label className="form-label">
                                          Add Your header URL
                                        </label> <br />
                                  <textarea
                                    className="form-control w-50 m-auto"
                                    rows="2" cols="50" onChange={(e) => setAddHeader(e.target.value)}>
                                    
                                    </textarea>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <button className="btn btn-primary" onClick={(e) => {
                                    setQueryParams(true)
                                    setBodyShow(false)
                                  }
                                  
                                  }>Query Params</button>
                                  {queryParams && 
                                    <div className="row pt-4 ">
                                      <div className="col d-flex flex-row">
                                        <input type="text" className="m-2 form-control w-40" placeholder="key" onChange={(e)=>setKey(e.target.value)}/>
                                        <input type="text" className=" m-2 form-control w-40" placeholder="value" onChange={(e)=> setValue(e.target.value)}/>
                                      </div>
                                    </div>
                                  }
                                </div>
                                <div className="col">
                                  {options === "POST" ||
                                  options === "PUT" ||
                                  options === "DELETE" ? (
                                    <button
                                      className="btn btn-primary"
                                      onClick={(e) => {
                                        setHeaderValue(false);
                                        setBodyShow(true);
                                      }}
                                    >
                                      Body
                                    </button>
                                  ) : (
                                    <button disabled className="m-1">Body</button>
                                  )}
                                  {bodyShow && (
                                    <div>
                                      <div className="mb-3">
                                        <label className="form-label">
                                          Add Your Values
                                        </label>
                                        <div className="row">
                                          <div className="col">
                                            <textarea
                                              cols="35"
                                              rows="15"
                                              value={mykeyval}
                                              style={{
                                                backgroundColor: "black",
                                                color: "white",
                                              }}
                                              onChange={(e) =>
                                                setMyKeyVal(e.target.value)
                                              }
                                            ></textarea>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="col">
                                  <button
                                    className="btn btn-success"
                                    onClick={handleSubmit}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="col">
                        <h5 className="mt-3">Your API Response</h5>
                        <div>
                        <span className="p-4">Status { status}</span>
                          <span>Status Text {statusText}</span>
                          </div>
                        {error ? (
                          <div>
                            <h3 style={{color : 'red'}} className='mt-3'>{error}</h3>
                          </div>
                        ) : (
                          <textarea className="mt-3"
                            style={{
                              color: "black",
                                backgroundColor: "whitesmoke",
                                borderColor:'red'
                              }}
                              value={JSON.stringify(data, null, 2)}
                              rows={20}
                              cols={120}
                          >
                          </textarea>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}