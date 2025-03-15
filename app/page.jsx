"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (id) {
            axios
                .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.error(" hata", error);
                });
        }
    }, [id]);

    const handlePostRequest = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
                userId: id,
                title: "Yeni",
                body: "test .",
            });

            setMessage(`POST başarılı ID: ${response.data.id}`);
        } catch (error) {
            setMessage("POST isteği başarısız");
            console.error("POST hatası:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>hello</h1>
            <p>URL'deki ID: {id}</p>

            {data ? (
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.body}</p>
                </div>
            ) : (
                <p> yükleniyor...</p>
            )}

            <button onClick={handlePostRequest} disabled={loading} style={{ marginTop: "20px", padding: "10px" }}>
                {loading ? "Gönderiliyor" : "POST İsteği Gönder"}
            </button>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Page;
