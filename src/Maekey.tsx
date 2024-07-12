import styles from './Maekey.module.scss'
import {useRef, useState} from "react";
import domtoimage from 'dom-to-image';

function Maekey() {
    const defaultValue = "パーの親友やられてんのに、愛美愛主に日和ってる奴いる？"
    const [text, setText] = useState<string>("")
    const ref = useRef<HTMLDivElement>(null)

    const saveEvent = () => {
        domtoimage.toPng(ref.current!)
            .then(dataUrl => {
                const downloadLink = document.createElement('a');
                downloadLink.href = dataUrl
                downloadLink.download = 'maekey_image.png'

                downloadLink.click()
            })
            .catch((error: unknown) => {
                console.error('エラーが発生しました:', error)
            });
    }

    const clipboardSaveEvent = () => {
        domtoimage.toPng(ref.current!)
            .then(dataUrl => {
                const img = new Image();
                img.src = dataUrl;

                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const context = canvas.getContext('2d');
                    context!.drawImage(img, 0, 0);

                    canvas.toBlob(function (blob) {
                        // @ts-ignore
                        const item = new ClipboardItem({'image/png': blob});
                        navigator.clipboard.write([item])
                            .then(function () {
                                window.alert('画像がクリップボードにコピーされました');
                            })
                            .catch(function (err) {
                                console.error('クリップボードへのコピーに失敗しました:', err);
                            });
                    }, 'image/png');
                };
            }).catch((error: unknown) => {
            console.error('エラーが発生しました:', error);
        });
    }

    return (
        <div className={styles.content}>
            <div className={styles.title}>マエキーメーカー</div>
            <div className={styles.imgArea} ref={ref}>
                <img className={styles.maekeyImg} src="./maekey.png" alt="maekey"/>
                <div className={styles.background}></div>
                <div className={styles.textArea1}>{text.length < 1 ? defaultValue : text}</div>
                <div className={styles.textArea2}>いねーよな！？</div>
            </div>
            <div className={styles.inputArea}>
                <label htmlFor='input'></label>
                <input id='input' placeholder={defaultValue}  maxLength={27}
                       onChange={(e) => {
                           setText(e.target.value)
                       }}></input>
                <div className={styles.buttonArea}>
                    <button onClick={() => {
                        clipboardSaveEvent()
                    }}>
                        <link rel="stylesheet"
                              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0"/>
                        <span className="material-symbols-outlined">assignment</span>
                        クリップボードに保存
                    </button>
                    <button onClick={() => {
                        saveEvent()
                    }}>
                        <link rel="stylesheet"
                              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0"/>
                        <span className="material-symbols-outlined">download</span>
                        ファイルとして保存
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Maekey;
