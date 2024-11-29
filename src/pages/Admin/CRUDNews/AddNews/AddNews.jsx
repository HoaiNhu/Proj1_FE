import React, { useState } from 'react'
import './AddNews.css'
import ButtonComponent from '../../../../components/ButtonComponent/ButtonComponent';
const AddNews = () => {
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleImageChange = (e) => {
        setNews({ ...product, image: e.target.files[0] });
    };

    const [product, setNews] = useState({
        newTitle: "",
        newsContent: "",
        newsImage: null,
    });
    return (
        <div className='container-xl'>
            <h1 className='AddNewsTitle'>Thêm tin tức</h1>

            {/* ===================CONTENT============= */}
            <div className='firstClass-AddNews'>
                <div className='firstClass1'>
                    <p className='contentP'>Tiêu đề tin</p>
                </div>
                <div className='firstClass2'>
                    <p className='contentP'>Ảnh</p>
                </div>
            </div>
            <div className='flex-content'>
                {/* =========LEFT======== */}
                <div className='left-area'>
                    <div className='left-area-1'>
                        <input placeholder='Nhập tiêu đề tin...'
                            className='input-1'></input>
                    </div>
                    <div className='left-area-2'>
                        <p className='contentP'>Nội dung tin:</p>
                    </div>
                    <div className='left-area-3'>
                        <textarea
                            className='input-2'
                            id="multiLineInput"
                            rows="5" // Số dòng hiển thị
                            cols="30" // Số cột hiển thị
                            value={text}
                            onChange={handleChange}
                            placeholder="Nhập nội dung tin..."
                        ></textarea>
                    </div>
                </div>
                {/* =========RIGHT========= */}
                <div className="addImageNews">
                    <input
                        className="news__image"
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    ></input>
                    <div className="icon__add-image-news">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                        >
                            <path
                                d="M17.4998 33.3332C17.4998 33.9962 17.7632 34.6321 18.2321 35.1009C18.7009 35.5698 19.3368 35.8332 19.9998 35.8332C20.6629 35.8332 21.2988 35.5698 21.7676 35.1009C22.2364 34.6321 22.4998 33.9962 22.4998 33.3332V22.4998H33.3332C33.9962 22.4998 34.6321 22.2364 35.1009 21.7676C35.5698 21.2988 35.8332 20.6629 35.8332 19.9998C35.8332 19.3368 35.5698 18.7009 35.1009 18.2321C34.6321 17.7632 33.9962 17.4998 33.3332 17.4998H22.4998V6.6665C22.4998 6.00346 22.2364 5.36758 21.7676 4.89874C21.2988 4.4299 20.6629 4.1665 19.9998 4.1665C19.3368 4.1665 18.7009 4.4299 18.2321 4.89874C17.7632 5.36758 17.4998 6.00346 17.4998 6.6665V17.4998H6.6665C6.00346 17.4998 5.36758 17.7632 4.89874 18.2321C4.4299 18.7009 4.1665 19.3368 4.1665 19.9998C4.1665 20.6629 4.4299 21.2988 4.89874 21.7676C5.36758 22.2364 6.00346 22.4998 6.6665 22.4998H17.4998V33.3332Z"
                                fill="#3A060E"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className='Button-area-addNews'>
                <div className='AddNewsBtn'>
                    <ButtonComponent>Thêm tin tức</ButtonComponent>
                </div>
                <div className='Exit-AddNews'>
                    <ButtonComponent className='CustomBtn-Exit'>Thoát</ButtonComponent>
                </div>
            </div>
        </div>
    )
}

export default AddNews