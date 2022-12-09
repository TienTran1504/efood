import Background from 'hero-slider/dist/components/Slide/Background';
import React from 'react'; // nạp thư viện react
import ReactDOM from 'react-dom/client'; // nạp thư viện react-dom
// import './style.css'

export default function DialogConfirm({ onDialog }) {
    return (
        <div
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgba(0,0,0,0.5)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    backgroundColor: 'white',
                    padding: '30px 70px',
                    borderRadius: '10px',
                    lineHeight: '70px',
                }}
            >
                {/* <h2>Are you sure ?</h2> */}
                <h3>Bạn chắc chắn muốn xóa ?</h3>
                {/* <h3>{message}</h3> */}

                <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <button
                        onClick={() => onDialog(true)}
                        style={{
                            backgroundColor: 'red',
                            padding: '10px 50px',
                            marginRight: '10px',
                            borderRadius: '5px',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        yes
                    </button>
                    <button
                        onClick={() => onDialog(false)}
                        style={{
                            backgroundColor: 'Green',
                            padding: '10px 50px',
                            borderRadius: '5px',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
