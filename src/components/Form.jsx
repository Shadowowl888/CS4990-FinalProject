import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const Form = ({ apiKey }) => {
    const [post, setPost] = useState({hole: 0, par: 0, yardage: 0, wind: ""});
    const [prompt, setPrompt] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const configuration = new Configuration({
        apiKey: apiKey,
        // apiKey: import.meta.env.REACT_APP_OPENAI_API_KEY,
    });
    
    const openai = new OpenAIApi(configuration);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const prompt = `Geneate a golf plan for the designated hole. I am playing hole ${post.hole} with a par of ${post.par}, a yardage distance of ${post.yardage} and ${post.wind} wind speed and direction. I want to take at least par on the hole. Display the title of the response with the hole number and par with the distnace. For each shot up to par, have a brief plan of action and specific clubs to use.`;
            const result = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 0.5,
                max_tokens: 4000,
            });
            setApiResponse(result.data.choices[0].text);
        } catch (e) {
            setApiResponse("Something is going wrong, Please try again.");
        }
        setLoading(false);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <div>
            <form>
                <label>I want to see a planned hole of golf for each shot at hole</label> <br />
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

                <button disabled={loading} type="submit" onClick={handleSubmit}>{loading ? "Generating..." : "Generate"}</button>
            </form>
            {apiResponse && (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <pre>
                        <strong>API Response:</strong>
                        {apiResponse}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default Form;