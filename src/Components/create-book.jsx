import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const CreateBook = () => {
    const [FormData, setFormData] = useState({
        Book_Name: "",
        Author_Name: "",
        Price: ""
    });
    
    
    const [Msg, setMsg] = useState(" ");
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        
        setFormData({
            ...FormData,
            [name] : value
        })
    }

    const APIURL = "https://676abacb863eaa5ac0df6fd1.mockapi.io/Books";

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default behavior
        setLoading(true);
        const res = await axios.post(APIURL, FormData);
    
        if (res.status === 201) {
            setLoading(false)
            setMsg("Added successfully!");
            Navigate('/Books');
        }
    };

    return(
        <>
        <h3>Create Book</h3>
        <form onSubmit={handleSubmit}>
            {Msg && <h3 style={{textAlign:"center"}}>{Msg}</h3>}
            <div>
                <label>Book Name</label>
                <input type="text" name="Book_Name" onChange={handleInputChange} value={FormData.Book_Name} />            </div>
            <div>
                <label>Author Name</label>
                <input type="text" name="Author_Name" onChange={handleInputChange} value={FormData.Author_Name} />            </div>
            <div>
                <label>Price</label>
                <input type="text" name="Price" onChange={handleInputChange} value={FormData.Price} />            </div>
            
            <div>
                <input className="submit_btn" type="submit" value={loading ? "Submitting..." : "Submit"} disabled={loading}/>
            </div>
        </form>
        </>
    )
}