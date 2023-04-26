import {useState} from 'react';
import {ocr} from "@/service/ocr/ocr";

function OCRComponent() {
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = async (event) => {
        if (event.target.files.length > 0) {
            setIsLoading(true);
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {

                // @ts-ignore
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                const ocrResult = await ocr(base64String);
                setResult(JSON.parse(ocrResult));
                setIsLoading(false);
            };
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border-4 border-blue-500">
                <div className="text-center mb-4">
                    <span className="text-gray-400 text-sm text-center">通过识字，让更多作品出现吧！</span>
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-10 text-3xl">
                        选择需要识字的图片:
                    </label>
                    <div className="relative">
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageUpload}
                        />
                        <label
                            htmlFor="image"
                            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
                        >
                            上传图片
                        </label>
                        {isLoading && (
                            <span className="ml-2">
            <svg className="animate-spin h-5 w-5 text-gray-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 0l3 2.647A7.962 7.962 0 0120 12h-4zm-8-6.172V2.808A6 6 0 0118.193 9H8.807zM19 12a7.963 7.963 0 01-2.236 5.464l-3-2.646A3.982 3.982 0 0012 12a3.982 3.982 0 00-1.764 2.818l-3 2.646A7.963 7.963 0 015 12h14z"
              />
            </svg>
          </span>
                        )}
                    </div>
                </div>
                {result && (
                    <div className="text-center">
                        {result.TextDetections.map((textDetection, index) => (
                            <div
                                key={index}
                                className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg my-2 mx-1"
                            >
                                {textDetection.DetectedText}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OCRComponent;
