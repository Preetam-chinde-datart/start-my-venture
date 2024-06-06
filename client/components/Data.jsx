import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Data({ isPaid }) {
  const [response, setResponse] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    type: "Manufacturing",
    purpose: "Self Learning",
  });

  // handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  let userPrompt;
  if (isPaid) {
    userPrompt = `
        I am a new entrepreneur,
        Business name will be ${data.name},
        I have a basic understanding of my business is ${data.description}.
        Report should be of ${data.type} and purpose is ${data.purpose}.
        
        From the above information create SWOT(Strengths, weaknesses, opportunities, and threats) analysis and PESTEL(Political, Economic, Social, Technological, Environmental, and Legal) Analysis. Each segment with 5 points each.
    `;
  } else {
    userPrompt = `
        I am a new entrepreneur,
        Business name will be ${data.name},
        I have a basic understanding of my business is ${data.description}.
        Report should be of ${data.type} and purpose is ${data.purpose}.
        
        From the above information create SWOT(Strengths, weaknesses, opportunities, and threats) analysis and PESTEL(Political, Economic, Social, Technological, Environmental, and Legal) Analysis. Each segment with 3 points each.
    `;
  }

  // handle Submit
  const baseURL = import.meta.env.VITE_API_LINK;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${baseURL}/api/getPromptDataFree`, {
        userPrompt,
      });
      setResponse(res.data);
    } catch (error) {
      console.log("error getting data", error);
    }
  };

  console.log("data", response);

  return (
    <>
      <div className="flex flex-row">
        <div className="basis-auto md:basis-1/2 mx-auto px-3 md:px-0 rounded-3xl overflow-hidden">
          <form onSubmit={handleSubmit} className="bg-slate-300">
            <div className="flex flex-col gap-4 px-5 md:px-10 py-5 text-start">
              <div className="grid gap-2">
                <label htmlFor="description">
                  Enter description <span className="text-red-700">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="description"
                  id="description"
                  value={data.description}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col xl:flex-row gap-4">
                <div className="md:basis-1/3 basis-auto">
                  <label htmlFor="name">Enter Name of business</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-full mt-2"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="md:basis-1/3 basis-auto">
                  <label htmlFor="type">
                    Report Type <span className="text-red-700">*</span>
                  </label>
                  <select
                    name="type"
                    id="type"
                    className="w-full mt-2"
                    value={data.type}
                    onChange={handleChange}
                  >
                    <option value="Manufacturing" selected>
                      Manufacturing
                    </option>
                    <option value="Service">Service</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="md:basis-1/3 basis-auto">
                  <label htmlFor="purpose">
                    Purpose<span className="text-red-700">*</span>
                  </label>
                  <select
                    name="purpose"
                    id="purpose"
                    className="w-full mt-2"
                    value={data.purpose}
                    onChange={handleChange}
                  >
                    <option value="Self Learning" selected>
                      Self Learning
                    </option>
                    <option value="For Investor presentation">
                      For Investor presentation
                    </option>
                  </select>
                </div>
              </div>

              <div className="text-center mt-3">
                <button
                  type="submit"
                  className="bg-slate-700 text-white py-2 px-6 max-w-sm w-full rounded-full"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-row mt-10">
        {response && (
          <div className="basis-1 md:basis-1/2 mx-auto px-3 md:px-0 rounded-2xl overflow-hidden bg-slate-100 py-8">
            <p>{response?.message}</p>
          </div>
        )}
      </div>
    </>
  );
}

// Data.propTypes = {
//   isPaid: PropTypes.bool.isRequired,
// };

export default Data;
