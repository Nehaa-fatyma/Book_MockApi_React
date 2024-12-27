import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { Link } from "react-router-dom";

export const BooksList = () => {
    const [bookData, setBookData] = useState([]);
    const [loading, setLoading] = useState(false); // State for loading status
    const [errorMsg, setErrorMsg] = useState(" ");

    const ApiUrl = "https://676abacb863eaa5ac0df6fd1.mockapi.io/Books";

    const getBookList = async () => {
        setLoading(true);
        try {
            const res = await axios.get(ApiUrl);
            if(res.status === 200){
                setLoading(false); // Set loading to false once data is fetched
                setBookData(res.data);
                setErrorMsg("");
            }
        } catch (error) {
            const {data} = error.response;
            setErrorMsg(data);                
            setLoading(false); // Set loading to false if there's an error
        }
    };
    
    useEffect(() => {
        getBookList();
    }, []);

    if(loading){
        return(
            <>
            <Loader/>
            </>
        )
    }

    return (
        <>
        <h2 style={{textAlign:"center"}}>Book List</h2>
        <Link className="add_btn" to="/CreateBook">Add Book</Link>
            {errorMsg && <h3 style={{textAlign:"center"}}>{errorMsg}</h3>}
            {bookData && bookData.length > 0 &&
                <table align="center" border={1}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookData && bookData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.Book_Name}</td>
                                        <td>{item.Author_Name}</td>
                                        <td>{item.Price}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            }
        </>
    );
};
