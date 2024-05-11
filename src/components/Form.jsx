import { useEffect, useState } from "react";
import OpenAI from "openai";

const Form = () => {
    const [post, setPost] = useState({hole: 0, par: 0, yardage: 0, wind: "", extras: ""});
    const [apiResponse, setApiResponse] = useState("");

    // const configuration = new Configuration({
    //     apiKey: import.meta.env.VITE_OPENAI_API_KEY
    // });
    // const openai = new OpenAIApi(configuration);
    
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    useEffect(() => {
        console.log(apiResponse);
        console.log(apiResponse.hole);
    }, [apiResponse]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInput = `Geneate a golf plan for the designated hole. I am playing hole ${post.hole} with a par of ${post.par}, a yardage distance of ${post.yardage} and ${post.wind} wind speed and direction. ${post.extras ? "Here is some specific details regarding the hole that may be important " + post.extras + "." : ""} I want to take at least par on the hole so provide advice by taking the maximum number of strokes to receive a par. Display the title of the response with the hole number and par with the distnace. For each shot up to par, have a brief plan of action and specific clubs to use. Output the response with the following valid JSON format with these default values: {hole: 0, par: 0, yardage: 0, wind: '', strokes: {1: '', 2: '', 3: ''}}. For the strokes JSON, it is based on how many strokes is needed for the recommended hole and the following advice for that corresponding stroke will be placed as a string. Please do not provide any parenthesis strings around the key name in the JSON.`;
        // const userInput = `Generate a golf plan for the designated hole. I am playing hole ${post.hole} with a par of ${post.par}, a yardage distance of ${post.yardage} and ${post.wind} wind speed and direction. I want to take at least par on the hole so provide advice by taking the maximum number of strokes to receive a par. Display the title of the response with the hole number and par with the distnace. For each shot up to par, have a brief plan of action and specific clubs to use. Output the information will a title containing "Hole {hole_number} Par {par} - {yardage} yards". Remove the word "Title" in the response. Underneath label each stroke with club choice and the detailed plan of action. Don't output anything after that.`;
        try {<s></s>
            const response = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are a golf caddie that will provide advice on what clubs and tips for each stroke at the designated hole. Provide a valid JSON output. Here is an example: {hole: 0, par: 0, yardage: 0, wind: '', strokes: {1: '', 2: '', 3: ''}}."
                    },
                    {
                        role: "user",
                        content: userInput,
                    }
                ],
                temperature: 1,
                max_tokens: 2048,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            setApiResponse(response.choices[0].message.content);
            console.log(apiResponse);
        } catch (e) {
            console.log("Something is going wrong, Please try again.", e);
            setApiResponse({"hole": 18, "par": 0, "yardage": 0, "wind": "", "strokes": {"1": ""}});
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
        console.log(post);
    };

    return (
        <div className="container">
            <div style = {{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}>
                <form onSubmit={handleSubmit}>
                    <label>I want to see a detailed plan of strokes for a hole of golf given the specific details</label> <br />
                    <label>Hole Number:</label> <br />
                    <input type="text" id="hole" name="hole" placeholder="Hole Number" onChange={handleChange} /> <br />
                    <br />

                    <label>Par:</label> <br />
                    <input type="text" id="par" name="par" placeholder="Par" onChange={handleChange} /> <br />
                    <br />

                    <label>Yardage Distance:</label> <br />
                    <input type="text" id="yardage" name="yardage" placeholder="Yardage Distance" onChange={handleChange} /> <br />
                    <br />

                    <label>Wind Speed and Direction:</label> <br />
                    <input type="text" id="wind" name="wind" placeholder="Wind Speed and Direction" onChange={handleChange} /> <br />
                    <br />

                    <label>Unique characteristics of the hole:</label> <br />
                    <textarea type="text" id="extras" name="extras" placeholder="Any other hole specifications to add" onChange={(handleChange)}></textarea>
                    <br />

                    <button
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Generate
                    </button>
                </form>
            </div>

            {/* {apiResponse && Object.keys(apiResponse).length > 0 && (
                <p>{apiResponse}</p>
            )} */}
            <p className="response">{apiResponse}</p>
        </div>
    );
};

export default Form;